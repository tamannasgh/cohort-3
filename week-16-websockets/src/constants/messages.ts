export enum ServerMessages {
	Connected = "connected",
	Joined = "joined",
	NewMessage = "newMessage",
	Failed = "failed",
	Success = "success",
}

export enum ClientMessageTypes {
	Identify = "identify",
	Join = "join",
	GrpMessage = "grp-message",
	PrvMessage = "prv-message",
}
