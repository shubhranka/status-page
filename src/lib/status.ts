import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getStatus() {
  try {
    const services = await prisma.service.findMany({})
    return services
  } catch (e) {
    return []
  }
}


export async function getIncidentsAndMaintenance() {
  try {
    // Populate incidents and maintenances
    const incidents = await prisma.incident.findMany({
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
    return { incidents, maintenances }
  } catch (error) {
    // console.error("[GET_INCIDENTS_AND_MAINTENANCE]", error)
    console.log(error)
    return { incidents: [], maintenances: [] }
  }
}

