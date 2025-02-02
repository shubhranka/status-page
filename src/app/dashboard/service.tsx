"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateService() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    return <Card>
    <CardHeader>
      <CardTitle className="text-xl font-bold mb-4">Services</CardTitle>
        {!open && <Button className="block px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setOpen(true)} >Create Service</Button>}
    </CardHeader>

    <CardContent>
      {open && <form className="relative" action={"/api/services"} method="POST" onSubmit={async(e) => {
        e.preventDefault()
        const response = await fetch("/api/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, description }),
        })

        if (response.ok) {  
          setOpen(false)
          toast.success("Service created successfully!")
        } else {
          toast.error("Failed to create service")
        }
      }}>
        <CircleX className="absolute right-4 -top-10 cursor-pointer" onClick={() => setOpen(false)} /> 
        <label className="block mb-4">
          <span className="text-gray-700">Name</span>
          <Input value={name} onChange={(e) => setName(e.target.value)} name="name" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
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