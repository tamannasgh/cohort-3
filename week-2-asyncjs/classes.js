class User {
	constructor(name, age, email) {
		this.name = name;
		this.age = age;
		this.email = email;
		console.log("User created");
	}

	printInfo() {
		console.log("name: ", this.name);
		console.log("age: ", this.age);
		console.log("email: ", this.email);
	}

	editInfo(propName, newInfo) {
		if (!(propName == "name" || propName == "age" || propName == "email")) {
			console.log(propName, " doesn't exist ");
			return new Error("Property " + propName + " doesn't exist");
		}
		this[propName] = newInfo;
	}
}

const user1 = new User("Tamanna Sharma", 18, "tamanna@gmail.com");
// user1.printInfo();

// user1.editInfo("emaill", "newEmail@gmail.com");
// user1.printInfo();
