import express from "express";
import authRouter from "./routes/auth.routes";
import authMiddleware from "./middlewares/auth.middleware";

const app = express();

export { app };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send("okayy we got itt");
});

app.use("/auth", authRouter);

app.use(authMiddleware);

app.get("/me", (req, res) => {
	console.log("hey");
	res.send("done");
});
