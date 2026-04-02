import { io } from "socket.io-client";

export const socket = io("https://api.blustor.net", {
  transports: ["polling", "websocket"], // Allow polling first
  withCredentials: true,
  autoConnect: false, // We will connect manually in the component
});
