import { ClientMessageTypes, ServerMessages } from "../constants/messages";
import { ClientMessage } from "../types/messages";
import { sendServerRes } from "../utility/send";
import { ROOMS } from "../constants/rooms";
import { users } from "../managers/userManager";
import { rooms } from "../managers/rooms";
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

export function handleClientMessage(
	clientMsg: ClientMessage,
	socket: WebSocket
) {
	if (clientMsg.type !== ClientMessageTypes.Message) {
		return; //for same reason
	}

	try {
		if (!rooms.roomExists(clientMsg.data.room)) {
			sendServerRes(socket, ServerMessages.Failed, {
				message: "there is no room with that name",
			});
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
