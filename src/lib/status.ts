import { PrismaClient } from "@prisma/client"
import { getLogger } from "./winston"

const prisma = new PrismaClient()
const logger = getLogger()
export async function getStatus() {
  try {
    const services = await prisma.service.findMany({})
    logger.info("[GET_STATUS]", services)
    return services
  } catch (e) {
    logger.error("[GET_STATUS]", e)
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
    logger.error("[GET_INCIDENTS_AND_MAINTENANCE]", error)

    return { incidents: [], maintenances: [] }
  }
}

