import { ClientMessageTypes, ServerMessages } from "../constants/messages";
import { ClientMessage } from "../types/messages";
import { sendServerRes } from "../utility/send";
import { users } from "../managers/userManager";
import { rooms } from "../managers/rooms";
import WebSocket from "ws";
import {
	handleIdentify,
	handleJoin,
	handleClientMessage,
} from "./clientMessagesHandler";

export function handleMessage(msg: string, socket: WebSocket) {
	console.log("message received: ", msg);

	try {
		const clientMsg: ClientMessage = JSON.parse(msg);

		if (clientMsg.type !== ClientMessageTypes.Identify) {
			if (!users.userExists(clientMsg.data.userId)) {
				sendServerRes(socket, ServerMessages.Failed, {
					message: "you must identify first.",
				});
				return;
			}
		}

		switch (clientMsg.type) {
			case ClientMessageTypes.Identify:
				handleIdentify(clientMsg, socket);
				break;
			case ClientMessageTypes.Join:
				handleJoin(clientMsg, socket);
				break;
			case ClientMessageTypes.Message:
				handleClientMessage(clientMsg, socket);
		}
	} catch (err) {
		console.log("error occured: ", err);
		sendServerRes(socket, ServerMessages.Failed, {
			message: `error occured: ${err}`,
		});
	}
}

export function handleClose(socket: WebSocket) {
	rooms.removeFromAllRooms(socket);
	users.removeUser(socket);
	console.log("user disconnected");
	console.log(users.usersCount(), "users connected");
}

export function handleError(err: Error) {
	console.error("Socket error:", err);
}
