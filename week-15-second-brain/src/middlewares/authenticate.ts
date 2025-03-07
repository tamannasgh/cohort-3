import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export interface AuthRequest extends Request {
	decodedToken?: string | JwtPayload;
}

export function authenticateUser(
	req: AuthRequest,
	res: Response,
	next: NextFunction
) {
	try {
		const token = req.headers.authorization as string;
		if (!token) {
			return res
				.status(401)
				.json({ message: "Unauthorized: No token provided" });
		}
		const decoded = jwt.verify(token, process.env.jwtSecret as string);
		req.decodedToken = decoded;
		next();
	} catch (e) {
		if (e instanceof Error) {
			res.status(403).json({ msg: e.message });
		} else {
			res.status(500).json({ msg: "An unknown error occurred" });
		}
	}
}
