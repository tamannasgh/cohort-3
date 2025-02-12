import express, { urlencoded } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = "jwt-secret";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static("public"));

const users = [];

app.get("/", (req, res) => {
	res.send("wait..");
});

app.post("/signup", (req, res) => {
	const { username, password } = req.body;

	users.push({ username, password });

	res.status(201).json({ msg: "account has been created!" });
	console.log(users);
});

app.post("/signin", (req, res) => {
	const { username, password } = req.body;

	const user = users.find(
		(user) => user.username === username && user.password === password
	);

	if (!user) {
		return res.status(404).json({ msg: "User not exists!" });
	}

	const token = jwt.sign({ username }, JWT_SECRET);
	res.status(200).json({ msg: "successfully signin!", token });
});

//auth middleware
app.use((req, res, next) => {
	const token = req.headers.authorization;
	try {
		const { username } = jwt.verify(token, JWT_SECRET);
		req.username = username;
		next();
	} catch (err) {
		return res.status(401).json({ msg: err.message });
	}
});

app.get("/me", (req, res) => {
	const username = req.username;
	res.status(200).json({ msg: `Hey ${username}!` });
});

app.listen(3000, () => {
	console.log("app is up and runnning on port 3000");
});
