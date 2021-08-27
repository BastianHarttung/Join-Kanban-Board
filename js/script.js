let allTasks = [];

let allUsers = [
    {
        'name': 'Bastian Harttung',
        'email': 'info@bastian-harttung.de',
        'profile-img': '../assets/img/profile-bastian.png'
    },
    {
        'name': 'Cam Trang',
        'email': 'camtrang@web.de',
        'profile-img': '../assets/img/profilepic.png'
    },
    {
        'name': 'Adriano Parente',
        'email': 'adriano.parente@gmx.de',
        'profile-img': '../assets/img/Adriano.jpg'
    },
]

function init() {

    includeHTML();              /* Html templates laden */
    
    loadFromBackend();           /* Aus backend laden */
    
    /* loadAllTasks();  */            /* Aus localStorage laden */                   
  
}

function initAddTask(){
    showUsersOnAddTask();       /* User bei AddTask auflisten */
}

function initBacklog(){
    setTimeout(() => {
        backlogShowAllTasks();  /* Tasks on Backlog */
    }, 0);    
}

function initBoard(){
    updateHTML();
}

/* Aus backend laden */
async function loadFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem('allTasks')) || [];
    allUsers = JSON.parse(backend.getItem('allUsers')) || [];
    console.log('Loaded from backend allTasks: ' , allTasks);
    console.log('Loaded from backend allUsers: ' , allUsers)
};

function addUsersToBackend(){
    allUsers.push(allUsers);
    backend.setItem('allUsers', JSON.stringify(allUsers));
};


/* aus local storage laden */
async function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = await JSON.parse(allTasksAsString);
    if (allTasks == null){
        allTasks =[]
    }
    console.log('Loaded allTasks from local storage: ', allTasks);    
}





