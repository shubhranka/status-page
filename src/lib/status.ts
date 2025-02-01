import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getStatus() {
  try {
    const services = await prisma.service.findMany({})
    return services
  } catch (error) {
    // console.error("[GET_STATUS]", error)
    console.log(error)
    return []
  }
}

export async function getIncidentsAndMaintenance() {
  try {
    const incidents = await prisma.incident.findMany({})
    const maintenances = await prisma.maintenance.findMany({})
    return { incidents, maintenances }
  } catch (error) {
    // console.error("[GET_INCIDENTS_AND_MAINTENANCE]", error)
    console.log(error)
    return { incidents: [], maintenances: [] }
  }
}