
let allTasks;
let allUsers;
let loggedInUser;

async function initPage(){
    await init();
    await showProfilePicOnNavbar();             // show profile pic navbar   
}

/**
 * Init for every Page
 * 
 */
async function init() {
    await includeHTML();                        // Html templates laden 
    await loadFromBackend();                    // Aus backend laden        
    /* loadAllTasks();  */                      // Aus localStorage laden falls erwünscht
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
function deleteUser(id) {
    if (id > 3) {
        allUsers.splice(id, 1);
        saveToBackend();
        showUsersOnAddTask()
    } else {
        alert("You can't delete this User!")
    }    
}

/**
 * Save Users and Tasks in Backend
 * 
 */
function saveToBackend() {
    backend.setItem('allUsers', JSON.stringify(allUsers));
    backend.setItem('allTasks', JSON.stringify(allTasks));
    backend.setItem('loggedInUser', JSON.stringify(loggedInUser));
}

/**
 * show Profile Pic of User who is logged in on Navbar
 * starts on init()
 */
function showProfilePicOnNavbar(){
    document.getElementById('nav').innerHTML += `
        <a href = "../index.html">
            <img id="nav-profile-pic" class="nav-profile-pic" src="${loggedInUser.profile_img}" title="Logout ${loggedInUser.name}">
        </a>
        `
}

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
function addPublisherUsersToBackend(){
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
    loggedInUser = {};
    
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