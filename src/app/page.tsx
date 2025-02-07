"use client"
import StatusCard from "@/components/StatusCard"
import IncidentsAndMaintenance from "@/components/Incidents"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MaintenanceScreen from "@/components/Maintenance"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs/"
import { useEffect, useState } from "react"
import { Service } from "@prisma/client"

export default function Home() {

  const [services, setServices] = useState<Service[]>([])
  const [incidents, setIncidents] = useState<any[]>([])
  const [maintenances, setMaintenances] = useState<any[]>([])
  const user = useAuth()

  useEffect(() => {
    const asyncfunc = async () => {
      const servicesResponse = await fetch("/api/services")
      const services = await servicesResponse.json()

      const incidentsResponse = await fetch("/api/incidents")
      const incidents = await incidentsResponse.json()

      const maintenancesResponse = await fetch("/api/maintenance")
      const maintenances = await maintenancesResponse.json()
      setServices(services)
      setIncidents(incidents)
      setMaintenances(maintenances)
    }
    asyncfunc()
  },[])

  return (
    <main className="container mx-auto p-4 space-y-8 max-w-4xl relative">
      <Link href={"/dashboard"} className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">{ user.isSignedIn ? "Dashboard" : "Sign In"}</Link>
      <Tabs defaultValue="services">
        <TabsList className="w-full">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="maintenances">Maintenances</TabsTrigger>
        </TabsList>
      <TabsContent value="services">
        <div className="grid grid-cols-1 gap-4">
          {services.map(service => (
            <StatusCard key={service.id} service={service.name} status={service.status} message={service.description} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="incidents">
        {incidents.length > 0 && <IncidentsAndMaintenance incidents={incidents} />}
      </TabsContent>
      <TabsContent value="maintenances">
        {maintenances.length > 0 && <MaintenanceScreen maintenances={maintenances} />}
      </TabsContent>
      </Tabs>
    </main>
  )
}

