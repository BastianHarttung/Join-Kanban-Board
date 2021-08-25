

let allUsers = [
    {
        'name': 'Bastian Harttung',
        'email': 'info@bastian-harttung.de',
        'profile-img': './assets/img/profile-bastian.png'
    },
    {
        'name': 'Cam Trang',
        'email': 'camtrang@web.de',
        'profile-img': './assets/img/profilepic.png'
    },
    {
        'name': 'Adriano Parente',
        'email': 'adriano.parente@gmx.de',
        'profile-img': './assets/img/Adriano.jpg'
    },
]

function init() {

    includeHTML();              /* Html templates laden */
    
    loadFromBackend();           /* Aus backend laden */
    
    loadAllTasks();             /* Aus localStorage laden */                   
  
}

function initAddTask(){
    showUsersOnAddTask();       /* User bei AddTask auflisten */
}

function initBacklog(){
    setTimeout(() => {
        backlogShowAllTasks();  /* Tasks on Backlog */
    }, 0);    
}



/* Aus backend laden */
async function loadFromBackend() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    console.log('Loaded from backend: ' , users)
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





