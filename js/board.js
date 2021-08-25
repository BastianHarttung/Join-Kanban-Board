let currentDraggedElement;


function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
}

function updateHTML() {
    let todo = allTasks.filter(t => t['status'] == 'todo');
    let inProgress = allTasks.filter(t => t['status'] == 'inProgress');
    let testing = allTasks.filter(t => t['status'] == 'testing');
    let done = allTasks.filter(t => t['status'] == 'done');
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('testing').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += generateToDoElement(element);
    }
    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateToDoElement(element);
    }
    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateToDoElement(element);
    }
    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateToDoElement(element);
    }
      
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateToDoElement(element) {
    return `
    <div draggable="true" ondragstart="startDragging(${element['id']})" class = "boardItem">
    <div class = "boardItemTitle">
        ${element['id']}
        </div>
        <div class = "boardItemDate">
        ${element['createdAt']}
        </div>
        <div class = "boardItemTitle">
        ${element['title']}
        </div>
        <div class = "boardItemTitle">
        ${element['status']}
        </div>
    </div>
    `
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    updateHTML();
}

function init() {
    includeHTML();
    loadAllTasks();
    updateHTML();
}