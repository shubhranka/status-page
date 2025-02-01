"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function UpdateStatusForm() {
  const [service, setService] = useState("")
  const [status, setStatus] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ service, status, message }),
    })

    if (response.ok) {
      setService("")
      setStatus("")
      setMessage("")
      router.refresh()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-blue-600">Update Service Status</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Service Name"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            className="border-gray-300"
          />
          <Select value={status} onValueChange={setStatus} required>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="operational">Operational</SelectItem>
              <SelectItem value="degraded">Degraded</SelectItem>
              <SelectItem value="outage">Outage</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Status message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="border-gray-300"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Update Status
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

