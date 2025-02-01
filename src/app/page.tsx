import { getIncidentsAndMaintenance, getStatus } from "@/lib/status"
import StatusCard from "@/components/StatusCard"
import IncidentsAndMaintenance from "@/components/Incidents"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Maintenance from "@/components/Maintenance"
import Link from "next/link"

export default async function Home() {
  const services = await getStatus()
  const { incidents, maintenances } = await getIncidentsAndMaintenance()

  return (
    <main className="container mx-auto p-4 space-y-8 max-w-4xl relative">
      <Link href={"/dashboard"} className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Dashboard</Link>
      <Tabs defaultValue="services" className="w-full">
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
        <IncidentsAndMaintenance incidents={incidents} />
      </TabsContent>
      <TabsContent value="maintenances">
        <Maintenance maintenances={maintenances} />
      </TabsContent>
      </Tabs>
      {/* <UpdateStatusForm /> */}
    </main>
  )
}

