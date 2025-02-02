// app/api/websocket/route.ts
import { WebSocketServer, WebSocket } from 'ws';
import { NextResponse } from 'next/server';
import { Socket } from 'net';
import { NextApiResponse } from 'next';

interface WebSocketServerWithClients extends WebSocketServer {
  clients: Set<WebSocket>;
}

interface WebSocketWithSocket extends WebSocket {
  socket: Socket;
}

let wss: WebSocketServerWithClients | undefined;

export async function GET(req: Request, res: NextApiResponse) {
  if (!wss) {
    // @ts-expect-error Property 'socket' does not exist on type 'NextApiResponse<any>'
    const server = res.socket?.server;

    if (!server) {
      return NextResponse.json({ error: 'No socket server found' }, { status: 500 });
    }

    if (!server.wss) {
      wss = new WebSocketServer({ server }) as WebSocketServerWithClients; // Type assertion here
      server.wss = wss;
      server.clients = wss.clients;

      wss.on('connection', (ws: WebSocketWithSocket) => { // Type WebSocket here
        console.log('Client connected (App Router - TS)');

        ws.on('message', (message: string) => { // Message is usually Buffer or String, type as needed
          console.log(`Received message (App Router - TS): ${message}`);

          wss?.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(`Server (App Router - TS) received: ${message}`);
            }
          });
        });

        ws.on('close', () => {
          console.log('Client disconnected (App Router - TS)');
        });

        ws.on('error', (error: Error) => { // Type error
          console.error('WebSocket error (App Router - TS):', error);
        });

        ws.send('Welcome to the WebSocket server (App Router - TS)!');
      });

      console.log('WebSocket server started (App Router - TS)');
    } else {
      wss = server.wss as WebSocketServerWithClients; // Type assertion here
      server.clients = wss.clients;
    }
  }

  return NextResponse.json({ message: 'WebSocket server is running (App Router - TS)' }, { status: 200 });
}

export const config = {
  api: {
    bodyParser: false,
  },
};