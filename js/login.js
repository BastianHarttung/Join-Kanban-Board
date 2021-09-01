async function initLogin(){
    await init();
    loggedInUser = {};
    saveToBackend();    
}

/**
 * Login Button 
 * login User and write json to loggedInUser
 * @param {click} event only to stop prevent link 
 */
function loginUser(event) {

    let email = document.getElementById('email-input').value; //string
    let password = document.getElementById('password-input').value; //string

    loggedInUser = allUsers.find(user => user.email === email) //Object with User

    if (loggedInUser === undefined) {
        alert('No User with such Email!');
        event.preventDefault();     //prevent link to the welcome page
    } else {
        if (loggedInUser.password === password) {
            console.log('User logged in');
            saveToBackend();
        } else {
            alert('Wrong Password for this User');
            event.preventDefault();     //prevent link to the welcome page
        }
    }
};

/**
 * button login as guest
 */
function loginGuestUser() {
    loggedInUser = allUsers[3];
    saveToBackend();
    window.location.href = "../start.html";
}