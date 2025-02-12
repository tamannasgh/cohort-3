import express from "express";

const app = express();
let reqCounts = 0;

function reqCountMiddleware(req, res, next) {
	reqCounts++;
	next();
}

app.use(reqCountMiddleware);

app.get("/", (req, res) => {
	res.status(200).json({
		msg: "success request",
		reqCounts,
	});
});

app.get("/about", (req, res) => {
	res.status(200).json({
		msg: "success request on /about",
		reqCounts,
	});
});

app.get("/contact", (req, res) => {
	res.status(200).json({
		msg: "success request on /contact",
		reqCounts,
	});
});

app.listen(3000, () => {
	console.log("app is up and running on port 3000");
});
