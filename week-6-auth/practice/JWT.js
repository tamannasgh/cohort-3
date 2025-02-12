import express, { urlencoded } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = "jwt-secret";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

const users = [];

app.get("/", (req, res) => {
	res.json({ msg: "heyy" });
});

app.post("/signup", (req, res) => {
	if (users.find((user) => user.username === req.body.username)) {
		return res.status(409).json({ msg: "User already exists." });
	}

	const newUser = {
		username: req.body.username,
		password: req.body.password,
	};

	if (!newUser.username || !newUser.password) {
		return res.status(400).json({ msg: "info is not provided." });
	}

	users.push(newUser);
	res.status(201).json({
		msg: "user is created successfully.",
		users: newUser,
	});
	console.log(users);
});

app.post("/signin", (req, res) => {
	const { username, password } = req.body;
	const user = users.find((user) => user.username === username);
	if (!user) {
		return res.status(404).json({ msg: "User not found" });
	}

	if (!(user.password === password)) {
		return res.status(401).json({ msg: "wrong credentials" });
	}

	if (user.token) {
		return res.status(200).json({ msg: "already signed in" });
	}

	const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
	user.token = token;
	res.status(200).json({ msg: "signing successfully", token });
	console.log(users);
});

app.use((req, res, next) => {
	try {
		const token = jwt.verify(req.headers.authorization, JWT_SECRET);
		req.tokenDecoded = token;
		next();
	} catch (err) {
		res.status(401).json({ msg: err.message });
	}
});

app.get("/me", (req, res) => {
	const token = req.tokenDecoded;
	res.status(200).json({ msg: `hey ${token.username}` });
});

app.listen(3000, () => {
	console.log("app is listening on port 3000...");
});
