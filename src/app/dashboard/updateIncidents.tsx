"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Incident } from "@prisma/client";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UpdateIncident() {
    const [open, setOpen] = useState(false);
    const [incidents, setIncidents] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedIncident, setSelectedIncident] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");


    const statuses = ["INVESTIGATING", "MONITORING", "RESOLVED"];



    const fetchIncidents = async () => {
      const response = await fetch("/api/org/incidents");
      if (response.ok) {
        const data = await response.json();
        return data;
      }else{
        return []
      }
    }
    
    const handleOnSelectClick = async () => {
        const data = await fetchIncidents();
        setIncidents(data);
      };
    return <Card>
    <CardHeader>
      <CardTitle className="text-xl font-bold mb-4">Update Incident</CardTitle>
        {!open && <Button className="block px-4 py-2 bg-blue-600 text-white rounded" onClick={() => {
            handleOnSelectClick()
            setOpen(true)}} >Update Incident</Button>}
    </CardHeader>

    <CardContent>
      {open && <form className="relative" action={"/api/services"} method="POST" onSubmit={async(e) => {
        e.preventDefault()
        const response = await fetch("/api/incident-update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message, selectedIncident, selectedStatus }),
        })

        if (response.ok) {  
          setOpen(false)
        } else {
          toast.error("Failed to create service")
        }
      }}>
        <CircleX className="absolute right-4 -top-10 cursor-pointer" onClick={() => setOpen(false)} /> 
        <label className="block mb-4">
          <span className="text-gray-700">Service</span>
          <Select onValueChange={(value) => setSelectedIncident(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an incident" />
            </SelectTrigger>
            <SelectContent>
                {incidents.length == 0 && <p>No incident found</p>}
              {incidents.map((incident: Incident) => (
                <SelectItem key={incident.id} value={incident.id}>{incident.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Status</span>
          <Select onValueChange={(value) => setSelectedStatus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Message</span>
          <Input value={message} onChange={(e) => setMessage(e.target.value)} name="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <Button type="submit" className="block px-4 py-2 bg-blue-600 text-white rounded">Update</Button>
        </form>}
    </CardContent>
    
  </Card>
  }