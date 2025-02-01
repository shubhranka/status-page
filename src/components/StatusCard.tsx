import { Card, CardContent } from "@/components/ui/card"
  
interface StatusCardProps {
  service: string
  status: "OPERATIONAL" | "DEGRADED_PERFORMANCE" | "PARTIAL_OUTAGE" | "MAJOR_OUTAGE"
  message: string | null
}

const statusColors = {
  OPERATIONAL: "green-500",
  DEGRADED_PERFORMANCE: "yellow-500",
  PARTIAL_OUTAGE: "orange-500",
  MAJOR_OUTAGE: "red-500",
}
const statusLabels = {
    OPERATIONAL: "Operational",
    DEGRADED_PERFORMANCE: "Degraded Performance",
    PARTIAL_OUTAGE: "Partial Outage",
    MAJOR_OUTAGE: "Major Outage",
  }

  
export default function StatusCard({ service, status, message }: StatusCardProps) {
  return (
    <Card className={`border-l-4 border-l-${statusColors[status]} shadow-sm`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{service}</h2>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">{statusLabels[status]}</span>
          <div className={`w-3 h-3 rounded-full bg-${statusColors[status]}`}></div>
        </div>
      </CardContent>
    </Card>
  )
}

