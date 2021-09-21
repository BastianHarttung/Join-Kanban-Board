/**
 * show Tasks on Board 
 */
async function initBoard() {
    await initPage();
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
function drawSingleColumns(array, category) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        document.getElementById(category).innerHTML += generateToDoElement(element);
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
function generateToDoElement(element) {

    let lastUser = element['user'].slice(-1);

    return `
    <div draggable="true" onClick = "showTaskLightbox(${element['id']})" ondragstart="startDragging(${element['id']})" class = "boardItem ${getUrgencyFrameColor(element)}">
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

/**
 * 
 * @param {*} $  
 */
function showTaskLightbox(taskId) {
    
    document.getElementById('lightbox-container').classList.remove('d-none')
    let clickedTask = allTasks.filter(task => task['id'] == taskId)
    console.log(clickedTask[0])
    document.getElementById('lightbox-container').innerHTML = `
        <div id="lightbox-container" class="lightbox-container">
            <div id="lightbox" class="lightbox ${getUrgencyFrameColor(clickedTask[0])}">
                <div id="title" class="lb-row lb-title">${clickedTask[0].title}</div>
                <div id="date" class="lb-row lb-date">${clickedTask[0].createdAt}</div>
                <div id="category" class="lb-row lb-category">${clickedTask[0].category}</div>
                <div id="description" class="lb-row lb-description">${clickedTask[0].description}</div>
                <div id="taskUser-row" class="taskUser-row">
                </div>
                <div class = "deleteTask lb-deleteTask" >
                    <i class="far fa-trash-alt" onclick = "deleteTask(${taskId})"></i>
                </div>  
            </div>
        </div>
    `    
    showUserOnLightbox(clickedTask);
     
}

function showUserOnLightbox(clickedTask) {

    for (let i = 0;  i < clickedTask[0].user.length; i++) {

    document.getElementById('taskUser-row').innerHTML += `
            <div id="taskUser-Container" class="lb-row lb-taskUser">
                    <img src="${clickedTask[0].user[i].profile_img}">
                    <div class="taskUser-name">${clickedTask[0].user[i].name}</div>
            </div>`    
    }    
}

/**
 * Close Lightbox by clicking background
 */
function closeLightbox() {
    document.getElementById('lightbox-container').classList.add('d-none')
}

/**
 * Delete Task on click
 * @param {id} id 
 */

function deleteTask(id) {
     
    let index;
    allTasks.forEach(task => {
        if (task['id'] == id) {
            index = allTasks.indexOf(task);
            allTasks.splice(index, 1);
        }
    });

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
