
let usertask = [];
let id;


function deleteInput() {
    document.getElementById('addTaskTitle').value = '';
    document.getElementById('addTaskDate').value = '';
    document.getElementById('addTaskCatergory').value = '';
    document.getElementById('addTaskUrgency').value = '';
    document.getElementById('addTaskDescription').value = '';
}

function showUsersOnAddTask() {

    document.getElementById('addTask-participants').innerHTML = '';

    for (let i = 0; i < allUsers.length; i++) {

        document.getElementById('addTask-participants').innerHTML += `
            <div class="addTask-participants">
                <img class="addTask-img-area" src="${allUsers[i]['profile-img']}">
                <div class="addtask-plus" onclick="assignToTask(${i})">
                    <i class="fas fa-plus"></i>
                </div>            
            </div>
            `
    }
}

function addNewParticipants() {

    let name = document.getElementById('firstLastName').value;
    let email = document.getElementById('mail').value;

    allUsers.push({
        'name': name,
        'email': email,
<<<<<<< HEAD
        'profile-img': './assets/img/profilepic.png'
=======
        'profile-img': '../assets/img/profilepic.png'
>>>>>>> ca08f960601ff5a9b687bc8471e5e9559ba1e216
    });

    saveToBackend();      /* Save user to backend */

    showUsersOnAddTask();
}

function createTask() {

    let title = document.getElementById('addTaskTitle').value;
    let createdAt = document.getElementById('addTaskDate').value;
    let category = document.getElementById('addTaskCatergory').value;
    let urgency = document.getElementById('addTaskUrgency').value;
    let description = document.getElementById('addTaskDescription').value;
    let status = 'todo';  
    id = allTasks.length; //id = Math.round(Math.random() * 1000);

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

    allTasks.push(task);

    backend.setItem('allTasks', JSON.stringify(allTasks));      /* Save task to backend */

    deleteInput();

    window.location.href = "./board.html";   
}

/**
 * add user to new task
 * 
 * @param {number} i Index of User in array 
 */
function assignToTask(i) {

    usertask.push(allUsers[i])

    console.log('usertask: ', usertask)
}

