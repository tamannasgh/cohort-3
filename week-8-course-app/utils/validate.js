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

const courseSchema = z.object({
	title: z.string().max(40),
	des: z.string().max(150),
	price: z.number().min(0),
});

const updateCourseSchema = z.object({
	title: z.string().max(40).optional(),
	des: z.string().max(150).optional(),
	price: z.number().min(0).optional(),
});

export { signupSchema, signinSchema, courseSchema, updateCourseSchema };
