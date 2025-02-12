const fs = require("fs");

// const content = fs.readFileSync("a.txt", "utf8");  //synchorous not right way
fs.readFile("./a.txt", { encoding: "utf8" }, (err, data) => {
	console.log(data);
});
