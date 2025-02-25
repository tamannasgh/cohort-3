var users = [
    { name: 'John', age: 16 },
    { name: 'tamanna', age: 18 },
    { name: 'tanu', age: 45 },
];
console.log(users);
function filterUsers(users) {
    // filter method return an array, that array will contain the objects that statisfy the cndition
    return users.filter(function (user) { return user.age >= 18; });
}
var filteredUsers = filterUsers(users);
console.log(filteredUsers);
