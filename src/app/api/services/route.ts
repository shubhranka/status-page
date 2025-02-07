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

        const { name, description } = JSON.parse(body)

        if (!name || !description) {
            return new NextResponse("Name and description are required", { status: 400 });
        }

        const service = await prisma.service.create({
            data: {
                name,
                description,
                organizationId: orgId!,
            },
        });

        await websocketSendMessage(`New service created: ${service.name}`)

        return NextResponse.json(service);

    } catch (error) {
        logger.error("[SERVICES_POST]", error)
        return new NextResponse("Internal error", { status: 500 });
    }
}

const websocketSendMessage = async (message: string) => {
    return new Promise((resolve, ) => {
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL as string);
        ws.onopen = () => {
            ws.send(message);
            resolve(true);
            ws.close();
        };
    })
}

export async function GET() {
    try {
        const services = await prisma.service.findMany({});
        return NextResponse.json(services);
    } catch (error) {
        logger.error("[SERVICES_GET]", error)
        return new NextResponse("Internal error", { status: 500 });
    }
}