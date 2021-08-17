let currentDraggedElement;
let allTasksOptimzed = [];
let status = 'todo';
let allTask;

function optimzeAllTasks(allTasks) {
    for (let i = 0; i < allTasks.length; i++) {
        let taskOptimized = {
            'id': i,
            'title': allTask[i]['title'],
            'category': allTask[i]['category'],
            'urgency': allTask[i]['urgency'],
            'description': allTask[i]['description'],
            'status': status
        };
        allTasksOptimzed.push(taskOptimized);
    }
}

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTask = JSON.parse(allTasksAsString);
}

function updateHTML() {

    let todo = allTasksOptimzed.filter(t => t['status'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += generateToDoElement(element);
    }

    let inProgress = allTasksOptimzed.filter(t => t['status'] == 'inProgress');

    document.getElementById('inProgress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateToDoElement(element);
    }

    let testing = allTasksOptimzed.filter(t => t['status'] == 'testing');

    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += generateToDoElement(element);
    }

    let done = allTasksOptimzed.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateToDoElement(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateToDoElement(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class = "boardItem">${element['title']}</div>`
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    allTasksOptimzed[currentDraggedElement]['status'] = status;
    updateHTML();
}

function init() {
    includeHTML();
    loadAllTasks();
    optimzeAllTasks(allTask);
    updateHTML();
}