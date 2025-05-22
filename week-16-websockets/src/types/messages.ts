import { ClientMessageTypes } from "../constants/messages";

export type ClientMessage =
	| { type: ClientMessageTypes.Identify; data: { userId: string } }
	| { type: ClientMessageTypes.Join; data: { room: string; userId: string } }
	| {
			type: ClientMessageTypes.Message;
			data: { room: string; message: string; userId: string };
	  };
