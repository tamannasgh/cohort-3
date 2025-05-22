import { WebSocketServer } from "ws";
import {
	handleClose,
	handleError,
	handleMessage,
} from "./handlers/socketHandler";

const wss = new WebSocketServer({ port: 8080 });
console.log("WebSocket server started on ws://localhost:8080");

wss.on("connection", (socket) => {
	console.log("user connected");

	socket.on("message", function (msg) {
		handleMessage(msg.toString(), socket);
	});

	socket.on("close", function () {
		handleClose(socket);
	});

	socket.on("error", function (err) {
		handleError(err);
	});
});
