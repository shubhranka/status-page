"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Service } from "@prisma/client";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateIncidents() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [selectedImpact, setSelectedImpact] = useState("");

    const impacts = ["MINOR", "MAJOR", "CRITICAL"];



    const fetchServices = async () => {
      const response = await fetch("/api/org/services");
      if (response.ok) {
        const data = await response.json();
        return data;
      }else{
        return []
      }
    }
    
    const handleOnSelectClick = async () => {
        const data = await fetchServices();
        setServices(data);
      };
    return <Card>
    <CardHeader>
      <CardTitle className="text-xl font-bold mb-4">Incidents</CardTitle>
        {!open && <Button className="block px-4 py-2 bg-blue-600 text-white rounded" onClick={() => {
            handleOnSelectClick()
            setOpen(true)}} >Create Incidents</Button>}
    </CardHeader>

    <CardContent>
      {open && <form className="relative" action={"/api/services"} method="POST" onSubmit={async(e) => {
        e.preventDefault()
        const response = await fetch("/api/incidents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, service: selectedService, impact: selectedImpact }),
        })

        if (response.ok) {  
          setOpen(false)
        } else {
          toast.error("Failed to create Incident")
        }
      }}>
        <CircleX className="absolute right-4 -top-10 cursor-pointer" onClick={() => setOpen(false)} /> 
        <label className="block mb-4">
          <span className="text-gray-700">Service</span>
          <Select onValueChange={(value) => setSelectedService(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
                {services.length == 0 && <p>No services found</p>}
              {services.map((service: Service) => (
                <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Impact</span>
          <Select onValueChange={(value) => setSelectedImpact(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose an impact" />
            </SelectTrigger>
            <SelectContent>
              {impacts.map((impact) => (
                <SelectItem key={impact} value={impact}>{impact}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Title</span>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} name="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Description</span>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} name="description" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <Button type="submit" className="block px-4 py-2 bg-blue-600 text-white rounded">Create</Button>
        </form>}
    </CardContent>
    
  </Card>
  }