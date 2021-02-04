document.getElementById("addNewUser").addEventListener("submit", addNewUser);

function addNewUser(e){
    e.preventDefault();

    let firstName = document.getElementById("firstNameNew").value;
    let lastName = document.getElementById("lastNameNew").value;
    let age = document.getElementById("ageNew").value;
    let mail = document.getElementById("mailNew").value;
    let password = document.getElementById("passwordNew").value;
    let roles = setRoles(Array.from(document.getElementById("roleNew").selectedOptions)
        .map(option => option.value));

    fetch("http://localhost:8080/addUser", {
        method: "POST",
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
            age: age,
            mail: mail,
            password: password,
            roles: roles
        })
    })
        .finally(() => {
            document.getElementById("idUsersTable").click();
            getUsers();
            document.getElementById("addNewUser").reset();
        })
}

function setRoles(someRoles) {
    let roles = [];
    if (someRoles.indexOf("USER") >= 0) {
        roles.push({"id": 2, "name": "USER"});
    }
    if (someRoles.indexOf("ADMIN") >= 0) {
        roles.push({"id": 1, "name": "ADMIN"});
    }
    return roles;
}