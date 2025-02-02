"use client"

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WebSocketComp() { 
    const [ws, setWs] = useState<WebSocket | null>(null);
    useEffect(() => {
        console.log(process.env.NEXT_PUBLIC_WEB_SOCKET_URL)
        const ws = new WebSocket(process.env.NEXT_PUBLIC_WEB_SOCKET_URL as string);
        setWs(ws);
        ws.onopen = () => {
            console.log("WebSocket connection opened");
        }

        ws.onmessage = (event) => {
            toast.success(event.data);
        }

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        }

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        }

        return () => {
            ws.close();
        }
      },[])
    return (
        null
    )
}