let allTasks;
let allUsers;

function init() {
    includeHTML();                  /* Html templates laden */    
    loadFromBackend();              /* Aus backend laden */    
    /* loadAllTasks();  */          /* Aus localStorage laden */    
}

/**
 * Users on AddTask Assigned To 
 **/ 
function initAddTask(){
    setTimeout(() => {
        showUsersOnAddTask();      
    }, 300);    
}
/**
 * Tasks on Backlog 
 */
function initBacklog(){
    setTimeout(() => {
        backlogShowAllTasks();  
    }, 300);    
}
/**
 * Tasks on Board 
 */
function initBoard(){
    setTimeout(() => {
        updateHTML();
    }, 300);    
}


function deleteLastUserInArray(){    
    allUsers.pop()
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
    saveAllUsersToBackend();
    showUsersOnAddTask()
}

function saveAllUsersToBackend(){
    backend.setItem('allUsers', JSON.stringify(allUsers));
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


