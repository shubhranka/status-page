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

        const { title, description, service, from, to } = JSON.parse(body)

        if (!title || !description || !service || !from || !to) {
            return new NextResponse("Name and description are required", { status: 400 });
        }

        const incident = await prisma.maintenance.create({
            data: {
                title,
                description,
                scheduledStartTime: new Date(from),
                scheduledEndTime: new Date(to),
                creatorId: dbUser.id,
                serviceId: service,
                status: "SCHEDULED",
            },
        });

        await prisma.service.update({
            where: {
                id: service,
            },
            data: {
                status: "UNDER_MAINTENANCE",
            },
        })

        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL as string);
        ws.onopen = () => {
            ws.send("Maintenance created");
        }
        return NextResponse.json(incident);
    } catch (error) {
        logger.error("[POST_INCIDENT]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET() {
    try {
        const maintenances = await prisma.maintenance.findMany({
            include: {
                service: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                updates: true
            }
        })
        return NextResponse.json(maintenances);
    } catch (error) {
        logger.error("[GET_MAINTENANCES]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}