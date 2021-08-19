let allTasks = [];

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

   
    // Unser task ist letzendlich ein JSON

    let task = {
        'title': title,        
        'createdAt': createdAt,        
        'category': category,
        'urgency': urgency,
        'description': description
    };
 
    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);

    deleteInput();

    window.location.href = "../board.html";

}

function loadallTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
    console.log('Loaded all tasks', allTasks);
}


