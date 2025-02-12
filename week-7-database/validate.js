import { z } from "zod";

const signupSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(5),
});

const signinSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5),
});

export { signupSchema, signinSchema };
