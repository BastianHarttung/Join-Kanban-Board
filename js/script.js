let allTasks;
let allUsers;

/**
 * Init for every Page
 * 
 */
function init() {
    includeHTML();                  /* Html templates laden */    
    loadFromBackend();              /* Aus backend laden */    
    /* loadAllTasks();  */          /* Aus localStorage laden */    
}

/**
 * show Users on AddTask Assigned To 
 * 
 **/ 
function initAddTask(){
    setTimeout(showUsersOnAddTask, 300);    
}

/**
 * show Tasks on Backlog 
 */
function initBacklog(){
    setTimeout(backlogShowAllTasks, 300);    
}

/**
 * show Tasks on Board 
 */
function initBoard(){
    setTimeout(updateHTML, 300);    
}

/**
 * Delete last user or task in array
 * 
 */
function deleteLastUserInArray(){    
    allUsers.pop()
}
function deleteLastTaskInArray(){
    allTasks.pop()
}

/**
 * Load allTasks and allUsers from backend
 * 
 * */  
async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allUsers = JSON.parse(backend.getItem('allUsers')) || [];
    console.log('Loaded from backend allTasks: ' , allTasks);
    console.log('Loaded from backend allUsers: ' , allUsers)
};

function deleteAllUsersInBackend(){
    backend.deleteItem('allUsers');
}
function deleteLastUserBackend(){
    deleteLastUserInArray();
    saveToBackend();
    showUsersOnAddTask()
}
function deleteLastTaskBackend(){
    deleteLastTaskInArray();
    saveToBackend();    
}

/**
 * Save Users and Tasks in Backend
 * 
 */
function saveToBackend(){
    backend.setItem('allUsers', JSON.stringify(allUsers));
    backend.setItem('allTasks', JSON.stringify(allTasks));
}

/**
 * load from local storage
 * 
 **/  
async function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = await JSON.parse(allTasksAsString);
    if (allTasks == null){
        allTasks =[]
    }
    console.log('Loaded allTasks from local storage: ', allTasks);    
}


