import { z } from "zod";

export const signupSchema = z.object({
	username: z
		.string()
		.min(3, "username must be at least 3 characters long")
		.max(10, "username must be at most 20 characters long"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.max(20, "Password must be at most 20 characters long")
		.regex(/[A-Z]/, "Password must have at least one uppercase letter")
		.regex(/[a-z]/, "Password must have at least one lowercase letter")
		.regex(/[0-9]/, "Password must have at least one number")
		.regex(
			/[@#$%^&*!]/,
			"Password must have at least one special character (@#$%^&*!)"
		),
});

export const contentSchema = z.object({
	type: z.enum(["document", "tweet", "youtube", "link"]),
	link: z.string(),
	title: z.string().min(1).max(100, "title should be atmost 100 characters"),
	tags: z.array(z.string()).optional(),
});

export const updateContentSchema = contentSchema.partial();
