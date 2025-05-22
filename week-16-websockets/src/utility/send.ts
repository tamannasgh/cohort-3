import WebSocket from "ws";
import { ServerMessages } from "../constants/messages";

type ServerData = { [key: string]: any };

export function sendServerRes(
	socket: WebSocket,
	message: ServerMessages,
	data: ServerData
) {
	socket.send(
		JSON.stringify({
			type: message,
			data: data,
		})
	);
}
