function signup() {
	const username = document.getElementById("username-su");
	const password = document.getElementById("password-su");

	axios.post("/signup", {
		username: username.value,
		password: password.value,
	});

	alert("accout created");
	username.value = "";
	password.value = "";
}

async function signin() {
	const username = document.getElementById("username-si");
	const password = document.getElementById("password-si");

	const res = await axios.post("/signin", {
		username: username.value,
		password: password.value,
	});

	localStorage.setItem("token", res.data.token);
	alert("signed in");
	username.value = "";
	password.value = "";
	getInfo();
}

function logout() {
	localStorage.removeItem("token");
	document.getElementById("info").innerText = "";
}

async function getInfo() {
	const token = localStorage.getItem("token");
	if (!token) return;

	const res = await axios.get("/me", {
		headers: {
			authorization: token,
		},
	});

	const info = document.getElementById("info");
	info.innerText = res.data.msg;
}

getInfo();
