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
    drawSingleColumns(todo, 'todo');
    drawSingleColumns(inProgress, 'inProgress');
    drawSingleColumns(testing, 'testing');
    drawSingleColumns(done, 'done');
}

function drawSingleColumns(array, string) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        document.getElementById(string).innerHTML += generateToDoElement(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateToDoElement(element, i) {

    let lastUser = element['user'].slice(-1);    

    return `
    <div draggable="true" ondragstart="startDragging(${element['id']})" id ="boardItem${i}" class = "boardItem ${getUrgencyFrameColor(element)}">
        <div class = "boardItemDate">
        ${element['createdAt']}
        </div>
        <div class = "boardItemTitle">
        ${element['title']}
        </div>
        <div class = "boardItemUser">
        ${lastUser[0]['name']}
        </div>
    </div>
    `
}

function getUrgencyFrameColor(element) {

    if (element['urgency'] == 'LOW') {
        return 'green';
    } else if (element['urgency'] == 'MIDDLE') {
        return 'orange';
    } else
        return 'red';
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    updateHTML();
    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}

function init() {
    includeHTML();
    loadAllTasks();
    updateHTML();
}