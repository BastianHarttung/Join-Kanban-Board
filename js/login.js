async function initLogin(){
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
   
    let email = document.getElementById('email-input').value; //string
    let password = document.getElementById('password-input').value; //string

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
}