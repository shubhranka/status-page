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


interface IncidentsAndMaintenanceProps {
  incidents: Incident[]
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
  }

  return (
    <Badge className={`${colorMap[status] || "bg-gray-500"} text-white uppercase`}>
      {status.replace("_", " ")}
    </Badge>
  )
}

export default function IncidentsAndMaintenance({ incidents}: IncidentsAndMaintenanceProps) {
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
                  <div>

                  <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    {incident.title}
                    <StatusBadge status={incident.status} />
                  </h3>
                  <h6 className="text-lg font-semibold flex items-center gap-2 mb-2">
                    {incident.impact}
                  </h6>
                  </div>
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

      
    </div>
  )
}