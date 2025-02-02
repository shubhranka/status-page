import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
export async function GET() {
    const  { orgId } = await auth();
    if (!orgId) {
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const services = await prisma.service.findMany({
        where: {
            organizationId: orgId!
        }
    });

    return NextResponse.json(services);
}