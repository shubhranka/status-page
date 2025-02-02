import { currentUser, auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

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

        console.log(body)

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

        return NextResponse.json(service);
    } catch (error) {
        console.error("[SERVICES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}