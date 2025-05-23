// this file have the socket events handler functions and inside handle message function, i am checking the type of client msg, join identify and message, and based on that i am calling handler function

import { ClientMessageTypes, ServerMessages } from "../constants/messages";
import { ClientMessage } from "../types/messages";
import { sendServerRes } from "../utils/send";
import { users } from "../models/userManager";
import { rooms } from "../models/rooms";
import WebSocket from "ws";
import {
	handleIdentify,
	handleJoin,
	handleGrpMessage,
	handlePrvMessage,
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
			case ClientMessageTypes.GrpMessage:
				handleGrpMessage(clientMsg, socket);
				break;
			case ClientMessageTypes.PrvMessage:
				handlePrvMessage(clientMsg, socket);
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
