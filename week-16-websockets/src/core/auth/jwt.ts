import jwt from "jsonwebtoken";
import "dotenv/config";

function getJwtToken(payload: { username: string }) {
	return jwt.sign(payload, process.env.JWT_SECRET!);
}

function verifyJwtToken(token: string) {
	try {
		return jwt.verify(token, process.env.JWT_SECRET!);
	} catch (err) {
		throw err;
	}
}

export { getJwtToken, verifyJwtToken };
