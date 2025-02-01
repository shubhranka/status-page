// Import necessary components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Update interface definitions to match the schema
interface IncidentUpdate {
  id: string
  incidentId: string
  status: "INVESTIGATING" | "IDENTIFIED" | "MONITORING" | "RESOLVED"
  message: string
  createdAt: Date
  updatedAt: Date
  updater?: {
    id: string
    email: string
  }
}

interface Incident {
  id: string
  title: string
  status: "INVESTIGATING" | "IDENTIFIED" | "MONITORING" | "RESOLVED"
  impact: "MINOR" | "MAJOR" | "CRITICAL" 
  description: string | null
  createdAt: Date
  updatedAt: Date
  updates: IncidentUpdate[]
  service: {
    id: string
    name: string
  }
}

interface MaintenanceUpdate {
  id: string
  maintenanceId: string
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  message: string
  createdAt: Date
  updatedAt: Date
  updater?: {
    id: string
    email: string
  }
}

interface Maintenance {
  id: string
  title: string
  status: "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
  description: string | null
  scheduledStartTime: Date
  scheduledEndTime: Date
  createdAt: Date
  updatedAt: Date
  updates: MaintenanceUpdate[]
  service: {
    id: string
    name: string
  }
}

interface IncidentsAndMaintenanceProps {
  incidents: Incident[]
  maintenances: Maintenance[]
}

// Helper functions
function formatDate(dateString: string | Date): string {
  return new Date(dateString).toLocaleString()
}

function StatusBadge({ status }: { status: string }) {
  const colorMap: { [key: string]: string } = {
    INVESTIGATING: "bg-yellow-500",
    IDENTIFIED: "bg-orange-500",
    MONITORING: "bg-blue-500",
    RESOLVED: "bg-green-500",
    SCHEDULED: "bg-gray-500",
    IN_PROGRESS: "bg-yellow-500",
    COMPLETED: "bg-green-500",
    CANCELLED: "bg-red-500",
  }

  return (
    <Badge className={`${colorMap[status] || "bg-gray-500"} text-white uppercase`}>
      {status.replace("_", " ")}
    </Badge>
  )
}

export default function IncidentsAndMaintenance({ incidents, maintenances }: IncidentsAndMaintenanceProps) {
  return (
    <div className="space-y-8">
      {/* Active Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">Active Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          {incidents.length === 0 ? (
            <p className="text-gray-600">No active incidents</p>
          ) : (
            <ul className="space-y-6">
              {incidents.map((incident) => (
                <li key={incident.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    {incident.title}
                    <StatusBadge status={incident.status} />
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Service: {incident.service.name}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Opened: {formatDate(incident.createdAt)} | Last update: {formatDate(incident.updatedAt)}
                  </p>
                  {incident.description && (
                    <p className="text-gray-700 mb-4">{incident.description}</p>
                  )}
                  <ul className="space-y-4">
                    {incident.updates.map((update) => (
                      <li key={update.id} className="bg-gray-50 rounded-lg p-4">
                        <p className="font-semibold text-gray-700 mb-1">{formatDate(update.createdAt)}</p>
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge status={update.status} />
                          {update.updater && (
                            <p className="text-sm text-gray-600">by {update.updater.email}</p>
                          )}
                        </div>
                        <p className="text-gray-600">{update.message}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Scheduled Maintenance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">Scheduled Maintenance</CardTitle>
        </CardHeader>
        <CardContent>
          {maintenances.length === 0 ? (
            <p className="text-gray-600">No scheduled maintenance</p>
          ) : (
            <ul className="space-y-6">
              {maintenances.map((maintenance) => (
                <li key={maintenance.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    {maintenance.title}
                    <StatusBadge status={maintenance.status} />
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Service: {maintenance.service.name}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Scheduled for: {formatDate(maintenance.scheduledStartTime)} - {formatDate(maintenance.scheduledEndTime)}
                  </p>
                  {maintenance.description && (
                    <p className="text-gray-700 mb-4">{maintenance.description}</p>
                  )}
                  <ul className="space-y-4">
                    {maintenance.updates.map((update) => (
                      <li key={update.id} className="bg-gray-50 rounded-lg p-4">
                        <p className="font-semibold text-gray-700 mb-1">{formatDate(update.createdAt)}</p>
                        <div className="flex items-center gap-2 mb-1">
                          <StatusBadge status={update.status} />
                          {update.updater && (
                            <p className="text-sm text-gray-600">by {update.updater.email}</p>
                          )}
                        </div>
                        <p className="text-gray-600">{update.message}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}