let allTasks =[];
let usertask = [];
let id;


function deleteInput() {
    document.getElementById('addTaskTitle').value = '';
    document.getElementById('addTaskDate').value = '';
    document.getElementById('addTaskCatergory').value = '';
    document.getElementById('addTaskUrgency').value = '';
    document.getElementById('addTaskDescription').value = '';
}

function showUsersOnAddTask(){

    for (let i = 0; i < allUsers.length; i++) {        

       document.getElementById('addTask-participants-container').innerHTML += `
            <div class="addTask-participants">
                <img class="addTask-img-area" src="${allUsers[i]['profile-img']}">
                <div class="addtask-plus" onclick="assignToTask(${i})">
                    <i class="fas fa-plus"></i>
                </div>            
            </div>
            `         
    }    
}

function createTask() {
    
    let title = document.getElementById('addTaskTitle').value;
    let createdAt = document.getElementById('addTaskDate').value;
    let category = document.getElementById('addTaskCatergory').value;
    let urgency = document.getElementById('addTaskUrgency').value;
    let description = document.getElementById('addTaskDescription').value;
    let status = 'todo';  
    id = Math.round(Math.random() * 1000);   
    
    // Unser task ist letzendlich ein JSON
    let task = {
        'id': id,                   //evtl ändern weil nicht eindeutig ??????????
        'title': title,
        'createdAt': createdAt,
        'category': category,
        'urgency': urgency,
        'description': description,
        'status': status,
        'user': usertask,        
    };
 
    allTasks.push(task);    

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
 
    window.location.href = "./board.html";

    deleteInput();

}

function assignToTask(i){    
     
    usertask.push(allUsers[i])    

    console.log('usertask: ',usertask)    
}

/* function loadallTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
     console.log('Loaded all tasks', allTasks); 
}   ist bereits in init bei script.js*/ 
