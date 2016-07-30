// JavaScript source code

var urersNumber = 5;

var userList = []; // declare empty array

var pattern = new RegExp(/^[a-zA-Z\s]*$/); //only letters and white spaces allowed

var counter = 1;

var resultMessage;

// get the list of users and add to our users list array
while (counter <= urersNumber)
{
    var userName = prompt("Please, give the name of user number " + counter, '');
    if (pattern.test(userName) && userName != '' && userName != null)
    {
        userList.push(userName);
        counter++;
    }
}

// get admin name from the user
var adminName;

do {
    adminName = prompt("What is your name?", '');
} while (!(pattern.test(adminName)) || adminName == '' || adminName == null);

// check if admin name is in the list of users
for (var i = 0; i < userList.length; i++) {
    if (userList[i] == adminName) {
        alert(adminName + ', you succesfully logged to the system!');
        resultMessage = adminName + ', you succesfully logged to the system!';
        i = userList.length; // this way we stop the check
    } else if (i == userList.length - 1) {
        alert('Error: user not found!');
        resultMessage = 'Error: user not found!';
    }
}

showResult();

function showResult() {
    document.getElementById("userResult").innerHTML = resultMessage;
}