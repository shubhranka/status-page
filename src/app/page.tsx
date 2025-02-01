import { getStatus } from "@/lib/status"
import StatusCard from "@/components/StatusCard"
// import IncidentsAndMaintenance from "@/components/IncidentsAndMaintenance"
// import UpdateStatusForm from "@/components/UpdateStatusForm"

export default async function Home() {
  const services = await getStatus()

  return (
    <main className="container mx-auto p-4 space-y-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Service Status</h1>
      <div className="grid grid-cols-1 gap-4">
        {services.map(service => (
          <StatusCard key={service.id} service={service.name} status={service.status} message={service.description} />
        ))}
      </div>
      {/* <IncidentsAndMaintenance incidents={incidents} maintenances={maintenances} /> */}
      {/* <UpdateStatusForm /> */}
    </main>
  )
}

