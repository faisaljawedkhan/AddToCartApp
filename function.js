export function add(a, b) {
    return a + b;
}

let scrimbaUsers = {
    "00" : "scrimba0@yahoo.com",
    "01" : "scrimba1@yahoo.com",
    "02" : "scrimba2@yahoo.com"
}

let scrimbaUsersEmails = Object.values(scrimbaUsers);
let scrimbaUsersKeys = Object.keys(scrimbaUsers)
let scrimbaUsersEntries = Object.entries(scrimbaUsers);

console.log(scrimbaUsersEmails);
console.log(scrimbaUsersKeys);
console.log(scrimbaUsersEntries);