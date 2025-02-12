import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let todos = [
	{
		id: 1,
		des: "wake early",
	},
	{
		id: 2,
		des: "exercise",
	},
	{
		id: 3,
		des: "go to temple.",
	},
];

app.get("/api/todos", (req, res) => {
	res.json(todos);
});

app.get("/api/todos/:id", (req, res) => {
	const id = Number(req.params.id);
	const todo = todos.find((todo) => todo.id === id);
	res.status(200).json(todo);
});

app.post("/api/todos", (req, res) => {
	const body = req.body;
	const id = todos[todos.length - 1].id + 1;
	const todo = { id, des: body.des };
	todos.push(todo);
	res.status(201).json({ msg: "added!", todo });
});

app.patch("/api/todos/:id", (req, res) => {
	const id = Number(req.params.id);
	const body = req.body;
	const newTodo = { id, des: body.des };
	todos = todos.map((todo) => {
		if (todo.id !== id) return todo;
		return newTodo;
	});
	res.status(200).json({ msg: "updated!", newTodo });
});

app.delete("/api/todos/:id", (req, res) => {
	const id = Number(req.params.id);
	todos = todos.filter((todo) => todo.id !== id);
	res.status(204).json({ msg: "deleted!" });
});

app.listen(3000, () => {
	console.log("app is up and running on port 3000");
});
