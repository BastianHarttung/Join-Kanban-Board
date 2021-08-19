let allTasks = [];
let allUsers = [
    {
        'name': 'Bastian Harttung',
        'email': 'info@harttung-fotografie.de',
        'profile-img': './assets/img/profile-bastian.png'
    },
    {
        'name': 'Cam Trang',
        'email': 'camtrang@web.de',
        'profile-img': './assets/img/profilepic.png'
    },
    {
        'name': 'Adriano Parente',
        'email': 'adriano.parente@gmx.de',
        'profile-img': './assets/img/profilepic.png'
    },
]
let id = 0;

function deleteInput() {
    document.getElementById('addTaskTitle').value = '';
    document.getElementById('addTaskDate').value = '';
    document.getElementById('addTaskCatergory').value = '';
    document.getElementById('addTaskUrgency').value = '';
    document.getElementById('addTaskDescription').value = '';
}

function createTask() {

    let title = document.getElementById('addTaskTitle').value;
    let createdAt = document.getElementById('addTaskDate').value;
    let category = document.getElementById('addTaskCatergory').value;
    let urgency = document.getElementById('addTaskUrgency').value;
    let description = document.getElementById('addTaskDescription').value;
    let status = 'todo';
    let usertask =  [];
    
    // Unser task ist letzendlich ein JSON
    let task = {
        'id': id,
        'title': title,
        'createdAt': createdAt,
        'category': category,
        'urgency': urgency,
        'description': description,
        'status': status,
        'user': usertask,        //Muss noch geändert werden!!!!!!!!!!!!!
    };
 
    allTasks.push(task);

    id = id++;

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);

}

function loadallTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
    console.log('Loaded all tasks', allTasks);
}

