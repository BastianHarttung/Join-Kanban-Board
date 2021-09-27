

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
function loginUser() {

    let email = document.getElementById('email-input-login').value; //string
    let password = document.getElementById('password-input-login').value; //string

    checkLogin(email, password);
};


/**
 * Check if Login is valid and Login if
 */
async function checkLogin(email, password) {
    let alertContainer = document.getElementById('input-alert-container');
    let alertText = document.getElementById('alert-text');

    loggedInUser = allUsers.find(user => user.email === email) //Object with User

    if (email === '') {
        alertText.innerHTML = 'Please type in Email-Adress';
        alertContainer.classList.remove('d-none');
    } else if (loggedInUser === undefined) {
        alertText.innerHTML = 'No User with such Email!';
        alertContainer.classList.remove('d-none');
    } else {
        if (loggedInUser.password === password) {
            console.log('User logged in');
            await saveToBackend();
            window.location.href = "../start.html";
        } else {
            alertText.innerHTML = 'Wrong Password for this User';
            alertContainer.classList.remove('d-none');
        }
    }
}

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
function backToLogin() {
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

    let alertContainer = document.getElementById('input-alert-container');
    let alertText = document.getElementById('alert-text');

    if (name == '' || email == '' || password == '') {
        alertText.innerHTML = 'Please fill in all Input-Fields.'
        alertContainer.classList.remove('d-none');        
    } else {
        allUsers.push({
            'name': name,
            'email': email,
            'password': password,
            'profile_img': './assets/img/profilepic.png'
        });

        await saveToBackend();      /* Save user to backend */

        checkLogin(email, password)
    }
}

