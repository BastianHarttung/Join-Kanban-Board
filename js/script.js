let allTasks;
let allUsers;

/**
 * Init for every Page
 * 
 */
async function init() {
    await includeHTML();                  /* Html templates laden */    
    await loadFromBackend();              /* Aus backend laden */  
      
    /* loadAllTasks();  */          /* Aus localStorage laden */    
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

function deleteUser(id){
    allUsers.splice(id,1);
    saveToBackend();
    showUsersOnAddTask()
}

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


