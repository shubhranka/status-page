"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Service } from "@prisma/client";
import { format } from "date-fns";
import { CalendarIcon, CircleX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateIncidents() {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [from, setFrom] = useState<Date | undefined>(undefined);
    const [to, setTo] = useState<Date | undefined>(undefined);



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
      <CardTitle className="text-xl font-bold mb-4">Schedule Maintenance</CardTitle>
        {!open && <Button className="block px-4 py-2 bg-blue-600 text-white rounded" onClick={() => {
            handleOnSelectClick()
            setOpen(true)}} >Schedule Maintenance</Button>}
    </CardHeader>

    <CardContent>
      {open && <form className="relative" action={"/api/services"} method="POST" onSubmit={async(e) => {
        e.preventDefault()
        const response = await fetch("/api/maintenance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description, service: selectedService, from, to }),
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
          <span className="text-gray-700">From</span>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {from ? format(from, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={from}
                  onSelect={(day)=>{setFrom(day!)}}
                  initialFocus
                  fromDate={new Date()}
                  />
              </PopoverContent>
            </Popover>
          </div>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">To</span>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {to ? format(to, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={to}
                  onSelect={(day)=>{setTo(day!)}}
                  initialFocus
                  fromDate={new Date(Date.now() + 86400000)}
                  />
              </PopoverContent>
            </Popover>
          </div>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Title</span>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} name="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Description</span>
          <Input value={description} onChange={(e) => setDescription(e.target.value)} name="description" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
        </label>
        <Button type="submit" className="block px-4 py-2 bg-blue-600 text-white rounded">Schedule</Button>
        </form>}
    </CardContent>
    
  </Card>
  }