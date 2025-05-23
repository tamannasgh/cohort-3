import WebSocket from "ws";

const usersMap = new Map<string, WebSocket>();

function addUser(userId: string, socket: WebSocket) {
	if (usersMap.has(userId)) {
		throw new Error(`${userId} already exits.`);
	}
	usersMap.set(userId, socket);
}

function removeUser(socket: WebSocket) {
	for (const [id, sock] of usersMap.entries()) {
		if (sock === socket) {
			usersMap.delete(id);
			break;
		}
	}
}

function getAllUsers() {
	return usersMap.entries();
	// return Object.fromEntries(users.entries());
}

function getUser(userName: string) {
	return usersMap.get(userName);
}

function userExists(userId: string) {
	return usersMap.has(userId);
}

function usersCount() {
	return usersMap.size;
}

export const users = {
	addUser,
	removeUser,
	getAllUsers,
	userExists,
	usersCount,
	getUser,
};
