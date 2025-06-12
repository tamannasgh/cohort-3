//entry pointtt

import { server } from "./server";
import dbSetup from "./db";
import "dotenv/config";
import wss, { wsConnectionHandler } from "./websocket/connection";
const port = process.env.PORT || 3000;

dbSetup()
	.then(() => {
		wss.on("connection", wsConnectionHandler);
		server.listen(port, () =>
			console.log(`server is running on port ${port}`)
		);
	})
	.catch((err) => {
		console.log("error occured: ", err);
	});
