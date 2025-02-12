import express from "express";
import mongoose from "mongoose";
import { User, Todo } from "./db.js";
import JWT from "jsonwebtoken";
const JWT_SECRET = "jwt_secret";
import bcrypt from "bcrypt";
import { signupSchema, signinSchema } from "./validate.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	return res.json({ msg: "server is running" });
});

app.post("/signup", async (req, res) => {
	try {
		const validatedData = signupSchema.safeParse(req.body);

		if (!validatedData.success) {
			validatedData.error.errors.forEach((err) => {
				console.log(err.path, err.message);
			});
			throw new Error("input validation failed");
		}
		const { name, email, password } = validatedData.data;

		const hashedPassword = await bcrypt.hash(password, 5);
		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});
		res.status(201).json({ msg: "new user created!" });
	} catch (e) {
		res.status(409).json({ msg: e.message });
	}
});

app.post("/signin", async (req, res) => {
	try {
		const validatedData = signinSchema.safeParse(req.body);

		if (!validatedData.success) {
			validatedData.error.errors.forEach((err) =>
				console.log(err.path, err.message)
			);
			throw new Error("input validation failed");
		}

		const { email, password } = validatedData.data;

		const user = await User.findOne({ email });

		if (!user) throw new Error("user not found");

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) throw new Error("wrong password");

		const token = JWT.sign({ id: user._id.toString() }, JWT_SECRET);
		res.status(200).json({ msg: "logged in", token });
	} catch (err) {
		res.status(403).json({ msg: err.message });
	}
});

//auth middleware
app.use((req, res, next) => {
	const token = req.headers.token;

	try {
		const userId = JWT.verify(token, JWT_SECRET);
		req.userId = userId.id; //yahpe ek iat krke bhi prop h wo userid ka part nhi h wo srf jwt ka part h
		next();
	} catch (err) {
		res.status(403).json({ msg: err.message });
	}
});

app.post("/todo", async (req, res) => {
	const userId = req.userId;
	const { des, done } = req.body;

	try {
		const newTodo = await Todo.create({ des, done, userId });
		res.status(201).json({ msg: "todo created!" });
	} catch (err) {
		res.status(409).json({ msg: err.message });
	}
});

app.get("/todo", async (req, res) => {
	const userId = req.userId;
	try {
		const todos = await Todo.find({ userId });
		res.status(200).json({ todos });
	} catch (err) {
		res.status(403).json({ msg: err.message });
	}
});

app.get("/todo/:id", async (req, res) => {
	const userId = req.userId;

	try {
		const todo = await Todo.findById(req.params.id);

		if (!todo) throw new Error("Todo not found");
		if (todo.userId.toString() !== userId)
			throw new Error("you dont have access to this!");
		res.status(200).json({ todo });
	} catch (err) {
		res.status(403).json({ msg: err.message });
	}
});

mongoose
	.connect(
		"mongodb+srv://tamanna:kLoY9drKmRPp8eD2@cluster0.wn3i7.mongodb.net/todo-app-db"
	)
	.then(() => {
		app.listen(3000, () => {
			console.log("server listening on port 3000");
		});
	})
	.catch(() => {
		console.log("databse is not connected");
	});
