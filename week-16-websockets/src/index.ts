//entry pointtt

import { server } from "./server";
import dbSetup from "./db";
import "dotenv/config";

const port = process.env.PORT || 3000;

dbSetup()
	.then(() => {
		server.listen(port, () =>
			console.log(`server is running on port ${port}`)
		);
	})
	.catch((err) => {
		console.log("error occured: ", err);
	});
