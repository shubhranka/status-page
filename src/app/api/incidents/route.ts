import { currentUser, auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getLogger } from "@/lib/winston";


const prisma = new PrismaClient();
const logger = getLogger();

export async function POST(req: NextRequest) {

    try {
        const {orgId, orgRole} = await auth()
        if (!orgId || !orgRole) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const user = await currentUser();
        const userRole : "ADMIN" | "MEMBER" = orgRole?.split(":")[1].toUpperCase() as "ADMIN" | "MEMBER";
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        let dbUser = await prisma.user.findFirst({
            where: {
                clerkUserId: user.id,
            },
        });

        if (!dbUser) {
            dbUser = await prisma.user.create({
                data: {
                    clerkUserId: user.id,
                    email: user.emailAddresses[0].emailAddress,
                    organizationId: orgId!,
                    role: userRole
                }
            });
        }

        const body = await req.text();

        const { title, description, service, impact } = JSON.parse(body)

        if (!title || !description || !service || !impact) {
            return new NextResponse("Name and description are required", { status: 400 });
        }

        const incident = await prisma.incident.create({
            data: {
                title,
                description,
                status: "IDENTIFIED",
                impact,
                reporterId: dbUser.id,
                serviceId: service,
                organizationId: orgId 
            },
        });
        switch (impact) {
            case "MINOR":
                await prisma.service.update({
                    where: {
                        id: service,
                        status: "OPERATIONAL"
                    },
                    data: {
                        status: "PARTIAL_OUTAGE"
                    }
                })
                break;
            case "MAJOR":
                await prisma.service.update({
                    where: {
                        id: service,
                        OR: [
                            { status: "OPERATIONAL" },
                            { status: "PARTIAL_OUTAGE" }
                        ]
                    },
                    data: {
                        status: "DEGRADED_PERFORMANCE"
                    }
                })
                break;
            case "CRITICAL":
                await prisma.service.update({
                    where: {
                        id: service,
                        OR: [
                            { status: "OPERATIONAL" },
                            { status: "PARTIAL_OUTAGE" },
                            { status: "DEGRADED_PERFORMANCE" }
                        ]
                    },
                    data: {
                        status: "MAJOR_OUTAGE"
                    }
                })
                break;
            default:
                break;
        }
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL as string);
        ws.onopen = () => {
            ws.send("Incident created");
        }
        return NextResponse.json(incident);
    } catch (error) {
        logger.error("[POST_INCIDENT]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}