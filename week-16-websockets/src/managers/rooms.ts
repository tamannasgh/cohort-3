import WebSocket from "ws";

const roomsMap = new Map<string, Set<WebSocket>>([
	["broadcast", new Set<WebSocket>()],
]);

function getRoom(roomName: string): Set<WebSocket> {
	if (!roomsMap.has(roomName)) {
		roomsMap.set(roomName, new Set<WebSocket>());
	}
	return roomsMap.get(roomName)!; //added ! to tell typescript that this will not be undefined
}

function joinRoom(socket: WebSocket, roomName: string) {
	getRoom(roomName).add(socket);
}

function removeFromAllRooms(socket: WebSocket) {
	roomsMap.forEach((room) => {
		room.delete(socket);
	});
}

function removeFromRoom(socket: WebSocket, roomName: string) {
	if (roomExists(roomName)) {
		getRoom(roomName).delete(socket);
	}
}

function roomExists(roomName: string) {
	return roomsMap.has(roomName);
}

function roomCount() {
	return roomsMap.size;
}

export const rooms = {
	getRoom,
	joinRoom,
	removeFromAllRooms,
	removeFromRoom,
	roomCount,
	roomExists,
};
