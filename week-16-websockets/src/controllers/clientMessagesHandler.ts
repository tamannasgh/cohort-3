// here i have the client message handlers, when user msg type is join, identify and message.

import { ClientMessageTypes, ServerMessages } from "../constants/messages";
import { ClientMessage } from "../types/messages";
import { sendServerRes } from "../utils/send";
import { ROOMS } from "../constants/rooms";
import { users } from "../models/userManager";
import { rooms } from "../models/rooms";
import WebSocket from "ws";

export function handleIdentify(clientMsg: ClientMessage, socket: WebSocket) {
	try {
		const newUserId = clientMsg.data.userId;
		users.addUser(newUserId, socket);
		sendServerRes(socket, ServerMessages.Connected, {
			message: `welcome ${newUserId}.`,
		});
		rooms.joinRoom(socket, ROOMS.BROADCAST);

		sendServerRes(socket, ServerMessages.Joined, {
			message: `You joined broadcast ${clientMsg.data.userId}!`,
		});
	} catch (err) {
		sendServerRes(socket, ServerMessages.Failed, {
			message: `error occured: ${err}`,
		});
		console.log("error:", err);
	}
}

export function handleJoin(clientMsg: ClientMessage, socket: WebSocket) {
	if (clientMsg.type !== ClientMessageTypes.Join) {
		return; //doing this because there was a ts error as room may or may not exists but here we are explicitly checking that if type is not join then return and it proceed if type is join, and ts know that is type is join room definitely exists
	}
	try {
		rooms.joinRoom(socket, clientMsg.data.room);

		sendServerRes(socket, ServerMessages.Joined, {
			room: clientMsg.data.room,
			message: `You joined the room ${clientMsg.data.userId}!`,
		});
	} catch (err) {
		sendServerRes(socket, ServerMessages.Failed, {
			message: `error occured: ${err}`,
		});
		console.log("error:", err);
	}
}

export function handleGrpMessage(clientMsg: ClientMessage, socket: WebSocket) {
	if (clientMsg.type !== ClientMessageTypes.GrpMessage) {
		return; //for same reason
	}

	try {
		if (!rooms.roomExists(clientMsg.data.room)) {
			sendServerRes(socket, ServerMessages.Failed, {
				message: "there is no room with that name",
			});
		} else if (!clientMsg.data.message) {
			throw new Error("message is required.");
		} else {
			rooms.getRoom(clientMsg.data.room).forEach((client) => {
				sendServerRes(client, ServerMessages.NewMessage, {
					room: clientMsg.data.room,
					message: clientMsg.data.message,
					from: clientMsg.data.userId,
				});
			});
		}
	} catch (err) {
		sendServerRes(socket, ServerMessages.Failed, {
			message: `error occured: ${err}`,
		});
		console.log("error:", err);
	}
}

export function handlePrvMessage(clientMsg: ClientMessage, socket: WebSocket) {
	if (clientMsg.type !== ClientMessageTypes.PrvMessage) {
		return;
	}
	try {
		const sendMsgTo = users.getUser(clientMsg.data.to);
		if (!sendMsgTo) {
			throw new Error(`there is no user: ${clientMsg.data.to}`);
		}
		if (!clientMsg.data.message) {
			throw new Error("message is required.");
		}
		sendServerRes(sendMsgTo, ServerMessages.NewMessage, {
			message: clientMsg.data.message,
			from: clientMsg.data.userId,
		});
		sendServerRes(socket, ServerMessages.Success, {
			message: "message sent.",
			to: clientMsg.data.to,
		});
	} catch (err) {
		sendServerRes(socket, ServerMessages.Failed, {
			message: `error occured: ${err}`,
		});
		console.log("error:", err);
	}
}
