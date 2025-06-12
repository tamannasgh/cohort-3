import WebSocket, { WebSocketServer } from "ws";
import { server } from "../server";

const wss = new WebSocketServer({ server });

function wsConnectionHandler(socket: WebSocket) {
	console.log("user connecetd");
	socket.send(JSON.stringify({ msg: "you are connecetd" }));
}

export default wss;
export { wsConnectionHandler };
