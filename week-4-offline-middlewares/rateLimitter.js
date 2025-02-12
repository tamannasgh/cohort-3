import express from "express";

const app = express();

let numberOfReqForUser = {};
setInterval(() => {
	numberOfReqForUser = {};
}, 1000);

app.use(function (req, res, next) {
	const uId = req.headers["user-id"];
	if (numberOfReqForUser[uId]) {
		numberOfReqForUser[uId]++;
		if (numberOfReqForUser[uId] > 5) {
			return res.status(404).json({
				msg: "you are not allowed to request more...",
				numberOfReqForUser,
			});
		}
	} else {
		numberOfReqForUser[uId] = 1;
	}

	next();
});

app.get("/", (req, res) => {
	res.status(200).json({
		msg: "success request",
	});
});

app.get("/about", (req, res) => {
	res.status(200).json({
		msg: "success request on /about",
	});
});

app.get("/contact", (req, res) => {
	res.status(200).json({
		msg: "success request on /contact",
	});
});

app.listen(3000, () => {
	console.log("server is up and running on port 3000...");
});
