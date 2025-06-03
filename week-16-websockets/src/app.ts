import express from "express";
import authRouter from "./routes/auth.routes";
import { verifyJwtToken } from "./core/auth/jwt";

const app = express();

export { app };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("okayy we got itt");
});

app.use("/auth", authRouter);

app.use((req, res, next) => {
	try {
		const token = req.headers.authorization;
		const data = verifyJwtToken(token!);
		console.log(data);
		next();
	} catch (err: any) {
		console.log("error: ", err);
		res.status(400).send({
			msg: "error occured",
			error: err.message || "something went wrong",
		});
	}
});

app.get("/me", (req, res) => {
	console.log("hey");
	res.send("done");
});
