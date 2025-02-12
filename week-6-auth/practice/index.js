import express, { urlencoded } from "express";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

const users = [];

function generateToken() {
	let options = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z",
		"A",
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
	];

	let token = "";
	for (let i = 0; i < 32; i++) {
		// use a simple function here
		token += options[Math.floor(Math.random() * options.length)];
	}
	return token;
}

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

	const token = generateToken();
	user.token = token;
	res.status(200).json({ msg: "signing successfully", token: token });
	console.log(users);
});

app.get("/me", (req, res) => {
	console.log(req.headers.authorization);
	const user = users.find((user) => user.token === req.headers.authorization);
	if (!user) {
		return res.status(401).json({ msg: "sign in first" });
	}
	res.status(200).json({ msg: `hey ${user.username}` });
});

app.listen(3000, () => {
	console.log("app is listening on port 3000...");
});
