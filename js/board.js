/**
 * show Tasks on Board 
 */
async function initBoard() {
    await init();
    updateHTML()
}

let currentDraggedElement;

/**
 * updates the status container
 */
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

/**
 * draws all ststus container with the single tasks
 * 
 * @param {*} array an array with the status seperated tasks
 * @param {*} string string of the status seperated tasks and id of the html container
 */
function drawSingleColumns(array, string) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        document.getElementById(string).innerHTML += generateToDoElement(element, i);
    }
}

/**
 * 
 * 
 * @param {*} id special identification number of a task
 */
function startDragging(id) {

    allTasks.forEach(task => {
        if (task['id'] == id) {
            currentDraggedElement = allTasks.indexOf(task)
        }
    });
}

/**
 * draws a task in html
 * 
 * @param {*} element a special element(task) in an array
 * @returns an html task
 */
function generateToDoElement(element, i) {

    let lastUser = element['user'].slice(-1);

    return `
    <div draggable="true" ondragstart="startDragging(${element['id']})" class = "boardItem ${getUrgencyFrameColor(element)}">
        <div class = "deleteTask" onclick = "deleteTask(${i})">
        X
        </div>
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

function deleteTask(i) {
    allTasks.splice(i, 1);
    saveToBackend();
    updateHTML();
}

/**
 * get the color for the taskframe, depends on the urgency
 * 
 * @param {*} element element a special element(task) in an array
 * @returns color for the frame seperated for the urgency
 */
function getUrgencyFrameColor(element) {

    if (element['urgency'] == 'LOW') {
        return 'green';
    } else if (element['urgency'] == 'MIDDLE') {
        return 'orange';
    } else
        return 'red';

}

/**
 * 
 * @param {*} ev event
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * change status of a task after the task was dragged in an other container
 * 
 * @param {*} status status of the task
 */
function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    updateHTML();
    saveToBackend();
    /*let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);*/
}
