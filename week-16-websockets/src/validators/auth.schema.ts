import { z } from "zod/v4";

const SignupSchema = z.object({
	name: z.string().trim().max(20),
	email: z.email().trim().max(20),
	username: z.string().trim().max(20),
	password: z.string().trim().min(8).max(20),
});

const SigninSchema = z.object({
	username: z.string().trim().max(20),
	password: z.string().trim().min(8).max(20),
});

export { SignupSchema, SigninSchema };
