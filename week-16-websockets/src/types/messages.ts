import { ClientMessageTypes } from "../constants/messages";

export type ClientMessage =
	| { type: ClientMessageTypes.Identify; data: { userId: string } }
	| { type: ClientMessageTypes.Join; data: { room: string; userId: string } }
	| {
			type: ClientMessageTypes.GrpMessage;
			data: { room: string; message: string; userId: string };
	  }
	| {
			type: ClientMessageTypes.PrvMessage;
			data: { to: string; message: string; userId: string };
	  };
