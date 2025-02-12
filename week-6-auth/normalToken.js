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

app.post("/signup", (req, res) => {
	const { username, password } = req.body;

	users.push({ username, password });

	res.json({ msg: "account has been created!" });
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

	user.token = generateToken();
	res.json({ msg: "successfully signin!", token: user.token });
	console.log(users);
});

app.get("/me", (req, res) => {
	const token = req.headers.authorization;

	const user = users.find((user) => user.token === token);

	if (!user) {
		return res.json({ msg: "invalid token" });
	}

	res.json({ msg: `Hey ${user.username}!` });
});

app.listen(3000, () => {
	console.log("app is up and runnning on port 3000");
});
