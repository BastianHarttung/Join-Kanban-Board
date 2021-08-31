/**
 * show Users on AddTask Assigned To 
 * 
 **/
async function initAddTask() {
    await init();
    showUsersOnAddTask()
}

let usertask = [];
let id = 0;

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

        document.getElementById('addTask-participants').innerHTML += `
            <div class="addTask-participants">
                <img class="addTask-img-area" src="${allUsers[i]['profile-img']}">
                <b class="name-area">${allUsers[i]['name']}</b>
                <div id="${i}" class="addtask-plus" onclick="assignToTask(${i})">
                    <i class="fas fa-plus"></i>
                </div>
                <button class="delete-last-user" onclick="deleteUser(${i})"><b>Delete</b></button>            
            </div>
            `
    }
}

/**
 * Add new participants to our group (name and email)
 */

function addNewParticipants() {

    let name = document.getElementById('firstLastName').value;
    let email = document.getElementById('mail').value;

    allUsers.push({
        'name': name,
        'email': email,
        'profile-img': './assets/img/profilepic.png'
    });

    saveToBackend();      /* Save user to backend */

    showUsersOnAddTask(); /* Show user von Add Task*/
}


/**
 * To create new task and then save task to backend
 */
function createTask() {

    let title = document.getElementById('addTaskTitle').value;
    let createdAt = document.getElementById('addTaskDate').value;
    let category = document.getElementById('addTaskCatergory').value;
    let urgency = document.getElementById('addTaskUrgency').value;
    let description = document.getElementById('addTaskDescription').value;

    if (isValidForm()) {
        let status = 'todo';


        // Unser task ist letzendlich ein JSON
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

        backend.setItem('allTasks', JSON.stringify(allTasks));      /* Save task to backend */

        id++; //id = Math.round(Math.random() * 1000);

        deleteInput(); // delete content in field input

        window.location.href = "./board.html";   // forword onto ""./board.html"

        return false;
    }
}

/**
 * add user to new task
 * 
 * @param {number} i Index of User in array 
 */
function assignToTask(i) {

    document.getElementById(i).classList.remove('addtask-plus');
    document.getElementById(i).classList.add('selectedPlus');

    usertask.push(allUsers[i]);

    console.log('usertask: ', usertask);
}