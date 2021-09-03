/**
 * show Users on AddTask Assigned To 
 * 
 **/
async function initAddTask() {
    await initPage();
    showUsersOnAddTask()
}

let usertask = [];


/**
 * Delete content in field input
 */
function deleteInput() {

    document.getElementById('addTaskTitle').value = '';
    document.getElementById('addTaskDate').value = '';
    document.getElementById('addTaskCatergory').value = '';
    document.getElementById('addTaskUrgency').value = '';
    document.getElementById('addTaskDescription').value = '';
}


/**
 * Show users in Add Task
 */
function showUsersOnAddTask() {

    document.getElementById('addTask-participants').innerHTML = '';

    for (let i = 0; i < allUsers.length; i++) {

        if (i < 4) {
            document.getElementById('addTask-participants').innerHTML += generateHTMLUser(i);
        } else {
            document.getElementById('addTask-participants').innerHTML += `
            <div class="addTask-participants">
                <img class="addTask-img-area" src="${allUsers[i]['profile_img']}">
                <b class="name-area">${allUsers[i]['name']}</b>
                <div id="${i}" class="addtask-plus" onclick="assignToTask(${i})">
                    <i id="plus-usertask${i}" class="fas fa-plus"></i>
                </div>
                <button class="delete-last-user" onclick="deleteUser(${i})"><b>Delete User</b></button>            
            </div>
            `
        }
    }
}

/**
 * Add new participants to our group (name and email)
 */

async function addNewParticipants() {

    let name = document.getElementById('firstLastName').value;
    let email = document.getElementById('mail').value;
    let password = document.getElementById('password').value;

    allUsers.push({
        'name': name,
        'email': email,
        'password': password,
        'profile_img': './assets/img/profilepic.png'
    });

    await saveToBackend();      /* Save user to backend */

    showUsersOnAddTask(); /* Show user von Add Task*/
}


/**
 * To create new task and then save task to backend
 */
async function createTask(event) {
    event.preventDefault();
    if (usertask == '') {
        alert('Please choose a User')

    } else {

        readTaskAndPushToArray()

        await saveToBackend();        /* Save task to backend */

        deleteInput(); // delete content in field input 

        window.location.href = "../board.html";
    }
}

/**
 * add user to new task
 * 
 * @param {number} i Index of User in array 
 */
let usersActivated = [];
function assignToTask(i) {

    if (usersActivated.includes(i)) {
        document.getElementById(i).classList.remove('selectedPlus');
        document.getElementById('plus-usertask' + i).classList.remove('minus');
        let indexUsertask = usertask.indexOf(usertask[i]);
        usertask.splice(indexUsertask, 1);
        let index = usersActivated.indexOf(i);
        usersActivated.splice(index, 1);
    } else {
        document.getElementById(i).classList.add('selectedPlus');
        document.getElementById('plus-usertask' + i).classList.add('minus');
        usertask.push(allUsers[i]);
        usersActivated.push(i);
    }
    console.log('usertask: ', usertask);
}

/**
 * Read Values from Input and Push to Array allTasks
 */
function readTaskAndPushToArray() {

    let title = document.getElementById('addTaskTitle').value;
    let createdAt = document.getElementById('addTaskDate').value;
    let category = document.getElementById('addTaskCatergory').value;
    let urgency = document.getElementById('addTaskUrgency').value;
    let description = document.getElementById('addTaskDescription').value;

    let status = 'todo';
    let id = Math.round(Math.random() * 10000);

    let task = {
        'id': id,
        'title': title,
        'createdAt': createdAt,
        'category': category,
        'urgency': urgency,
        'description': description,
        'status': status,
        'user': usertask
    };

    allTasks.push(task); // push new task to alltasks
}

/**
 * Generate Html to add User to task
 * @param {i} i 
 * @returns HTML Container for User Adding to Task
 */
function generateHTMLUser(i) {
    return `
        <div class="addTask-participants">
            <img class="addTask-img-area" src="${allUsers[i]['profile_img']}">
            <b class="name-area">${allUsers[i]['name']}</b>
            <div id="${i}" class="addtask-plus" onclick="assignToTask(${i})">
                <i id="plus-usertask${i}" class="fas fa-plus"></i>
            </div>                
        </div>
        `
}