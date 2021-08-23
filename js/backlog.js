
function backlogShowAllTasks(){
    
    if (allTasks.length == 0) {
        document.getElementById('table').innerHTML = `
            ${htmlTableHead()}
            <tr>No Tasks in Backlog</tr>
            `
    }else{
        document.getElementById('table').innerHTML = htmlTableHead();               
                
        for (let i = 0; i < allTasks.length; i++) {
            
                let color;

                if (allTasks[i]['urgency'] == 'LOW') {
                    color = 'green';           
                }else if(allTasks[i]['urgency'] == 'MIDDLE'){
                    color = 'orange';
                }else if(allTasks[i]['urgency'] == 'HIGH'){
                    color = 'red';
                }else{
                    color = 'blue';
                }

            for (let j = 0; j < allTasks[i]['user'].length; j++) {
                
                document.getElementById('table').innerHTML += htmlTableRow(color,allTasks,i,j)

            }                
               
        }      
        
    }             

}

function htmlTableRow(color,allTasks,i,j){
    return `
        <tr class="table-todo-row">
            <td id="table-profile" class="${color}">
                <div class="table-profile-container">
                    <img id="profile-img" src=${allTasks[i]['user'][j]['profile-img']}>
                    <div class="table-profile-name-email">
                        <div id="profile-name">${allTasks[i]['user'][j]['name']}</div>
                        <a href="mailto: ${allTasks[i]['user'][j]['email']}" id="profile-email" class="profile-email">${allTasks[i]['user'][j]['email']}</a>    
                    </div>
                </div>                                                      
            </td>
            <td id="table-category">${allTasks[i]['category']}</td>
            <td id="table-details">${allTasks[i]['description']}</td>
        </tr>
        `    
}

function htmlTableHead(){
    return`
    <tr class="table-head">
        <th>Assigned To</th>
        <th>Category</th>
        <th>Details</th>
    </tr>
    `
}