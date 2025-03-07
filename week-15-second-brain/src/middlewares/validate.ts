import { NextFunction, Request, Response } from "express";
import { contentSchema, signupSchema } from "../zodSchemas";
import { ZodSchema } from "zod";

function validatefunctionFactory(schema: ZodSchema) {
	return function (req: Request, res: Response, next: NextFunction) {
		try {
			const result = schema.safeParse(req.body);
			if (!result.success) {
				result.error.errors.map((err: { message: string }) =>
					console.log("err => ", err.message)
				);
				throw new Error("Invalid input");
			} else {
				req.body = result.data;
				next();
			}
		} catch (e) {
			if (e instanceof Error) {
				res.status(411).json({ msg: e.message });
			} else {
				res.status(500).json({ msg: "An unknown error occurred" });
			}
		}
	};
}

export const validateSignupInputs: (
	req: Request,
	res: Response,
	next: NextFunction
) => void = validatefunctionFactory(signupSchema);

export const validateContentInputs: (
	req: Request,
	res: Response,
	next: NextFunction
) => void = validatefunctionFactory(contentSchema);

// export function validateSignupInputs(
// 	req: Request,
// 	res: Response,
// 	next: NextFunction
// ) {
// 	try {
// 		const result = signupSchema.safeParse(req.body);
// 		if (!result.success) {
// 			result.error.errors.map((err) =>
// 				console.log("err => ", err.message)
// 			);
// 			throw new Error("Invalid input");
// 		} else {
// 			req.body = result.data;
// 			next();
// 		}
// 	} catch (e) {
// 		if (e instanceof Error) {
// 			res.status(411).json({ msg: e.message });
// 		} else {
// 			res.status(500).json({ msg: "An unknown error occurred" });
// 		}
// 	}
// }
