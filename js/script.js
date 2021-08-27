let allTasks;
let allUsers;

function init() {

    includeHTML();              /* Html templates laden */
    
    loadFromBackend();           /* Aus backend laden */
    
    /* loadAllTasks();  */            /* Aus localStorage laden */                   
  
}

function initAddTask(){
    setTimeout(() => {
        showUsersOnAddTask();       /* User bei AddTask auflisten */
    }, 300);    
}

function initBacklog(){
    setTimeout(() => {
        backlogShowAllTasks();  /* Tasks on Backlog */
    }, 300);    
}

function initBoard(){
    setTimeout(() => {
        updateHTML();
    }, 300);    
}

/* Aus backend laden */
async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allUsers = JSON.parse(backend.getItem('allUsers')) || [];
    console.log('Loaded from backend allTasks: ' , allTasks);
    console.log('Loaded from backend allUsers: ' , allUsers)
};

function deleteUser(){
    backend.deleteItem('allUsers');
}

/* aus local storage laden */
async function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = await JSON.parse(allTasksAsString);
    if (allTasks == null){
        allTasks =[]
    }
    console.log('Loaded allTasks from local storage: ', allTasks);    
}





