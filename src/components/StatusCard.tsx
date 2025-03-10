import { Card, CardContent } from "@/components/ui/card"
  
interface StatusCardProps {
  service: string
  status: "OPERATIONAL" | "DEGRADED_PERFORMANCE" | "PARTIAL_OUTAGE" | "MAJOR_OUTAGE" | "UNDER_MAINTENANCE"
  message: string | null
}

const statusColors = {
  OPERATIONAL: "green-500",
  DEGRADED_PERFORMANCE: "yellow-500",
  PARTIAL_OUTAGE: "orange-500",
  MAJOR_OUTAGE: "red-500",
  UNDER_MAINTENANCE: "blue-500",
}

const bgColors = {
    OPERATIONAL: "bg-green-500",
    DEGRADED_PERFORMANCE: "bg-yellow-500",
    PARTIAL_OUTAGE: "bg-orange-500",
    MAJOR_OUTAGE: "bg-red-500",
    UNDER_MAINTENANCE: "bg-blue-500",
  }
const statusLabels = {
    OPERATIONAL: "Operational",
    DEGRADED_PERFORMANCE: "Degraded Performance",
    PARTIAL_OUTAGE: "Partial Outage",
    MAJOR_OUTAGE: "Major Outage",
    UNDER_MAINTENANCE: "Under Maintenance",
  }

  const borderColors = {
    OPERATIONAL: "border-l-green-500",
    DEGRADED_PERFORMANCE: "border-l-yellow-500",
    PARTIAL_OUTAGE: "border-l-orange-500",
    MAJOR_OUTAGE: "border-l-red-500",
    UNDER_MAINTENANCE: "border-l-blue-500",
  }

  
export default function StatusCard({ service, status, message }: StatusCardProps) {
  return (
    <Card className={`border-l-4 ${borderColors[status]} shadow-sm`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{service}</h2>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">{statusLabels[status]}</span>
          <div className={`w-3 h-3 rounded-full ${bgColors[status]}`}></div>
        </div>
      </CardContent>
    </Card>
  )
}

