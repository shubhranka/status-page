import { currentUser, auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const resolveService = async (incidentId?: string) => {
    const pending_critical_incidents = await prisma.incident.findFirst({
        where: {
            impact: "CRITICAL",
            NOT: {
                status: "RESOLVED"
            }
        }
    })
    if (pending_critical_incidents) {
        return;
    }
    const pending_major_incidents = await prisma.incident.findFirst({
        where: {
            impact: "MAJOR",
            NOT: {
                status: "RESOLVED"
            }
        }
    })
    if (pending_major_incidents) {
        await prisma.service.update({
            where: {
                id: pending_major_incidents.serviceId
            },
            data: {
                status: "DEGRADED_PERFORMANCE"
            }
        })
        return;
    }
    const pending_minor_incidents = await prisma.incident.findFirst({
        where: {
            impact: "MINOR",
            NOT: {
                status: "RESOLVED"
            }
        }
    })
    if (pending_minor_incidents) {
        await prisma.service.update({
            where: {
                id: pending_minor_incidents.serviceId
            },
            data: {
                status: "PARTIAL_OUTAGE"
            }
        })
        return;
    }
    const incident = await prisma.incident.findFirst({
        where: {
            id: incidentId
        }
    })
    await prisma.service.update({
        where: {
            id: incident?.serviceId
        },
        data: {
            status: "OPERATIONAL"
        }
    })
}

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

        const { message, selectedIncident, selectedStatus  } = JSON.parse(body)

        if (!message || !selectedIncident || !selectedStatus) {
            return new NextResponse("Message, Incident, and Status are required", { status: 400 });
        }

        const incidentUpdate = await prisma.incidentUpdate.create({
            data: {
                message,
                incidentId: selectedIncident,
                status: selectedStatus,
                updaterId: dbUser.id,
            }
        })
        await prisma.incident.update({
            where: {
                id: selectedIncident
            },
            data: {
                status: selectedStatus
            }
        })
        if (selectedStatus === "RESOLVED") {
            await resolveService()   
        }
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL as string);
        ws.onopen = () => {
            ws.send(`Incident update: ${message}`);
        }
        return NextResponse.json(incidentUpdate);
    } catch (error) {
        console.error("[SERVICES_POST]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}