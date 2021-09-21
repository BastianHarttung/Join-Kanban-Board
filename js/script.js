
let allTasks;
let allUsers;
let loggedInUser;

async function initPage() {
    await init();
    await showProfilePicOnNavbar();             // show profile pic navbar 
    checkUrlShowOnNav();
}

/**
 * Init for every Page
 * 
 */
async function init() {
    includeHTML();                        // Html templates laden 
    await loadFromBackend();                    // Aus backend laden        
    /* loadAllTasks();  */                      // Aus localStorage laden falls erwünscht
}

/**
 * Check URL and mark Link on navbar
 */
function checkUrlShowOnNav() {
    if (window.location.href == 'http://127.0.0.1:5500/board.html') {
        document.getElementById('link-board').classList.add('active')
    }
    if (window.location.href == 'http://127.0.0.1:5500/backlog.html') {
        document.getElementById('link-backlog').classList.add('active')
    }
    if (window.location.href == 'http://127.0.0.1:5500/addtask.html') {
        document.getElementById('link-addtask').classList.add('active')
    }
    if (window.location.href == 'http://127.0.0.1:5500/help.html') {
        document.getElementById('link-help').classList.add('active')
    }
}

/**
 * Load allTasks and allUsers from backend
 * 
 * */
async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allUsers = JSON.parse(backend.getItem('allUsers')) || [];
    loggedInUser = JSON.parse(backend.getItem('loggedInUser')) || {};
    console.log('Loaded from backend allTasks: ', allTasks);
    console.log('Loaded from backend allUsers: ', allUsers);
    console.log('Loaded from backend loggedInUser: ', loggedInUser);
};

/**
 * Delete User which delete button is clicked
 * @param {number} id index of array of user 
 */
async function deleteUser(id) {
    if (id > 3) {
        allUsers.splice(id, 1);
        await saveToBackend();
        showUsersOnAddTask()
    } else {
        alert("You can't delete this User!")
    }
}

/**
 * Save Users and Tasks in Backend
 * 
 */
async function saveToBackend() {
    await backend.setItem('allUsers', JSON.stringify(allUsers));
    await backend.setItem('allTasks', JSON.stringify(allTasks));
    await backend.setItem('loggedInUser', JSON.stringify(loggedInUser));
    console.log('saved to backend');
}

/**
 * show Profile Pic of User who is logged in on Navbar
 * starts on init()
 */
async function showProfilePicOnNavbar() {
    document.getElementById('nav').innerHTML += `
        <a class="logged-user" href = "../index.html">
            <img id="nav-profile-pic" class="nav-profile-pic" src="${loggedInUser.profile_img}" title="Logout ${loggedInUser.name}">
            <div>Login</div>
        </a>
        `
}

/*--------------------HACKS-------------------------------*/

/**
 * HACK load from local storage
 * didnt start in programm
 **/
async function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = await JSON.parse(allTasksAsString);
    if (allTasks == null) {
        allTasks = []
    }
    console.log('Loaded allTasks from local storage: ', allTasks);
}

/**
 * HACK Debugger Function to add Publisher User if it was deleted
 */
function addPublisherUsersToBackend() {
    allUsers = [
        {
            'name': "Bastian Harttung",
            'email': "info@bastian-harttung.de",
            'profile_img': "../assets/img/profile-bastian.png",
            'password': 'bastian'
        },
        {
            'name': "Adriano Parente",
            'email': "adriano.parente@gmx.de",
            'profile_img': "../assets/img/Adriano.jpg",
            'password': 'adriano'
        },
        {
            'name': "Cam Trang",
            'email': "camtrang@web.de",
            'profile_img': "../assets/img/cam.jpg",
            'password': 'cam'
        },
        {
            'name': "Guest",
            'email': "info@guest.de",
            'profile_img': "../assets/img/profilepic.png",
            'password': 'guest'
        },
    ];
    allTasks = [];
    loggedInUser = allUsers[3];

    saveToBackend();
}

/**
 * HACK delete All Users in Backend 
 * only started in console
 */
function deleteAllUsersInBackend() {
    backend.deleteItem('allUsers');
}
function deleteLastUserBackend() {
    deleteLastUserInArray();
    saveToBackend();
    showUsersOnAddTask()
}
function deleteLastTaskBackend() {
    deleteLastTaskInArray();
    saveToBackend();
}

/**
 * HACK Delete last user or task in array
 * 
 */
function deleteLastUserInArray() {
    allUsers.pop()
}
function deleteLastTaskInArray() {
    allTasks.pop()
}