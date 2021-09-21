async function initLogin() {
    await init();
    loggedInUser = {};
    await saveToBackend();
}

/**
 * Login Button 
 * login User and write json to loggedInUser
 * @param {click} event only to stop prevent link 
 */
async function loginUser() {

    let email = document.getElementById('email-input-login').value; //string
    let password = document.getElementById('password-input-login').value; //string

    loggedInUser = allUsers.find(user => user.email === email) //Object with User

    if (loggedInUser === undefined) {
        alert('No User with such Email!');
    } else {
        if (loggedInUser.password === password) {
            console.log('User logged in');
            await saveToBackend();
            window.location.href = "../start.html";
        } else {
            alert('Wrong Password for this User');
        }
    }
};

/**
 * button login as guest
 */
async function loginGuestUser() {
    loggedInUser = allUsers[3];
    await saveToBackend();
    window.location.href = "../start.html";
};

/**
 * Sign In new User
 */
function startNewSignIn() {
    document.getElementById('login-form').classList.add('d-none');
    document.getElementById('signin-form').classList.remove('d-none');
}

/**
 * Back to Login Screen
 */
function backToLogin(){
    document.getElementById('login-form').classList.remove('d-none');
    document.getElementById('signin-form').classList.add('d-none');
}

/**
 * Add new participants to our group (name and email)
 */

async function addNewParticipants() {

    let name = document.getElementById('first-lastname-input').value;
    let email = document.getElementById('email-input').value;
    let password = document.getElementById('password-input').value;

    allUsers.push({
        'name': name,
        'email': email,
        'password': password,
        'profile_img': './assets/img/profilepic.png'
    });

    await saveToBackend();      /* Save user to backend */

    loginUserAfterSignIn(email,password)
}

async function loginUserAfterSignIn(email,password) {

    loggedInUser = allUsers.find(user => user.email === email) //Object with User

    if (loggedInUser === undefined) {
        alert('No User with such Email!');
    } else {
        if (loggedInUser.password === password) {
            console.log('User logged in');
            await saveToBackend();
            window.location.href = "../start.html";
        } else {
            alert('Wrong Password for this User');
        }
    }
};
