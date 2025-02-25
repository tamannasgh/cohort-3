interface User {
  name: string,
  age: number
}

let users: User[] = [
  {name: 'John', age: 16},
  {name: 'tamanna', age: 18},
  {name: 'tanu', age: 45},
];

console.log(users);

function filterUsers(users: User[]): User[] {
  // filter method return an array, that array will contain the objects that statisfy the cndition
  return users.filter(user => user.age >= 18);
}

let filteredUsers = filterUsers(users);
console.log(filteredUsers);

