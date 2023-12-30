const username = document.getElementById('logged-in-user')
const logoutbtn = document.getElementById('logout-icon')

// Dashboard
const activeuserdashboard = document.getElementById('active-user-count')
const yettocompletetaskdashboard = document.getElementById('yet-to-complete-task-count')
const completedtaskdashboard = document.getElementById('completed-task-count')

//Todo tasks
const todotasksection = document.getElementsByClassName('task-board-list-items')[0]

//Inprogress tasks
const inprogresssection = document.getElementsByClassName('task-board-list-items')[1]

//Completed tasks
const completedsection = document.getElementsByClassName('task-board-list-items')[2]

//Filter
const projectfilterselect = document.getElementById('task-project-filter')

//Add task buttons
const addtaskbtn = document.getElementById('add-task-btn')
const addtodotaskbtn = document.getElementById('todo-tasks-add-btn')
const addinprogresstaskbtn = document.getElementById('inprogress-tasks-add-btn')
const adddonetasksbtn = document.getElementById('done-tasks-add-btn')
//Form and Overlays
const formoverlay = document.getElementById('form-overlay')
const formcancelbtn = document.getElementById('task-form-cancel-btn')
const formaddbtn = document.getElementById('task-form-add-btn')
const projectinpform = document.getElementById('project-input-form')
const taskinpform = document.getElementById('task-input-form')
const priorityinpform = document.getElementById('priority-input-form')
const tasklevelinpform = document.getElementById('task-level-input-form')
const duedateinpform = document.getElementById('duedate-input-form')
const assigntoselect = document.getElementById('assignedto-input-form')
const formtype = document.querySelectorAll('.form-type')
let jsondata,users,tasks,modifyindex
let modify = false
;

(async()=>{
    const currentuserres = await fetch('/get-user')
    const currentuser = await currentuserres.json()
    if(currentuser.username === undefined) {
        window.location.replace('/signin')
    }
    username.innerText = currentuser.username
    const datares = await fetch('/users-data')
    jsondata = await datares.json()
    users = jsondata.users
    tasks = jsondata.tasks
    username.innerText = currentuser.username
    populateselect(users,tasks)
    populateboards(tasks)
    populatedashboard(users,tasks)
})()

/**
 * Function to populate the dashboard with respective information
 * @param {object} users Array of objects with user details
 * @param {object} tasks Array of Objects with task details
 */
function populatedashboard(users,tasks) {
    const totalusers = users.length
    const totaltasks = tasks.length
    const completedtasks = tasks.filter((task) => task.level === 'completed').length
    activeuserdashboard.innerText = totalusers
    yettocompletetaskdashboard.innerText = totaltasks - completedtasks
    completedtaskdashboard.innerText = completedtasks
}

/**
 * Function to populate the boards with their levels
 * @param {objects} tasks Array of objects with task Details
 */
function populateboards(tasks) {
    populatetodotasks(tasks)
    populateinprogresstasks(tasks)
    populatecompletedtasks(tasks)
}

/**
 * Function to populate the todo level of tasks.
 * @param {object} tasks Array of objects with task details
 */
function populatetodotasks(tasks) {
    const todotasks = tasks.filter((task) => task.level === 'todo')
    todotasksection.innerHTML = ''
    todotasks.forEach((todotask)=>{
    const todotaskitem = `<div class="task-board-list-item todo-border" draggable="true">
                        <div class="board-project-date-row">
                            <div class="todo-task-color-container"></div>
                            <div class="task-project-name">${todotask.project}</div>
                            <div class="task-due-date">${formatDate(todotask.duedate)}</div>
                        </div>
                        <div class="board-task-name-priority">
                            <div class="task-name">${todotask.task}</div>
                            <div class="task-priority ${todotask.priority}">${todotask.priority}</div>
                        </div>
                        <div class="board-task-asignees">
                            <div class="task-assignees-label">
                                Assigned to
                            </div>
                            <div class="task-asignee">
                                ${todotask.assignedto}
                            </div>
                        </div>
                    </div>`
    todotasksection.innerHTML+=todotaskitem
    })
}

/**
 * Function to populate the Inprogress level of tasks.
 * @param {object} tasks Array of objects with task details
 */
function populateinprogresstasks(tasks) {
    const inprogresstasks = tasks.filter((task) => task.level === 'inprogress')
    inprogresssection.innerHTML = ''
    inprogresstasks.forEach((inprogresstask)=>{
    const inprogressitem = `<div class="task-board-list-item inprogress-border" draggable="true">
        <div class="board-project-date-row">
            <div class="inprogress-task-color-container"></div>
            <div class="task-project-name">${inprogresstask.project}</div>
            <div class="task-due-date">${formatDate(inprogresstask.duedate)}</div>
        </div>
        <div class="board-task-name-priority">
            <div class="task-name">${inprogresstask.task}</div>
            <div class="task-priority ${inprogresstask.priority}">${inprogresstask.priority}</div>
        </div>
        <div class="board-task-asignees">
            <div class="task-assignees-label">
                Assigned to
            </div>
            <div class="task-asignee">
            ${inprogresstask.assignedto}
            </div>
        </div>
    </div>`
    inprogresssection.innerHTML+=inprogressitem
    })
}

/**
 * Function to populate the completed level of tasks.
 * @param {object} tasks Array of objects with task details
 */
function populatecompletedtasks(tasks) {
    const completedtasks = tasks.filter((task) => task.level === 'completed')
    completedsection.innerHTML = ''
    completedtasks.forEach((completedtask)=>{
    const completeditem = `<div class="task-board-list-item done-border">
        <div class="board-project-date-row">
            <div class="done-task-color-container"></div>
            <div class="task-project-name">${completedtask.project}</div>
            <div class="task-due-date">${formatDate(completedtask.duedate)}</div>
        </div>
        <div class="board-task-name-priority">
            <div class="task-name">${completedtask.task}</div>
            <div class="task-priority ${completedtask.priority}">${completedtask.priority}</div>
        </div>
        <div class="board-task-asignees">
            <div class="task-assignees-label">
                Assigned to
            </div>
            <div class="task-asignee">
            ${completedtask.assignedto}
            </div>
        </div>
    </div>`
    completedsection.innerHTML+=completeditem
    })
}

/**
 * Function to populate the select fields of the appliaction with valid & suitable options
 * @param {object} users Array of objects with user details 
 * @param {*} tasks Array of objects with task details
 */
function populateselect(users,tasks) {
    // Assignto 
    assigntoselect.innerHTML = ''
    users.forEach((user)=>{
        const option = document.createElement('option')
        option.value = user.username
        option.innerHTML = user.username
        assigntoselect.append(option)
    })

    // projectfilter
    projectfilterselect.innerHTML = ''
    const projects = new Set(tasks.map((task)=>task.project))
    const defaultoption = document.createElement('option')
    defaultoption.value = 'all'
    defaultoption.innerHTML = 'All Projects'
    projectfilterselect.append(defaultoption)
    projects.forEach((project)=>{
        const option = document.createElement('option')
        option.value = project
        option.innerHTML = project
        projectfilterselect.append(option)
    })
}

// Event Listeners

logoutbtn.addEventListener('click',async ()=>{
    const user = {}
    const response = await fetch('/load-user', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(user),
    });
    window.location.replace('/signin')
})

addtaskbtn.addEventListener('click',()=>{
    modify = false
    formtype.forEach((element)=>{
        element.innerText = 'Add'
    })
    formoverlay.style.display = 'flex'
})

// Filter Event

projectfilterselect.addEventListener('click',()=>{
    const projectname = projectfilterselect.value
    if(projectname === 'all') {
        populateboards(tasks)
        return
    }
    const filteredtasks = tasks.filter((task)=> task.project === projectname)
    populateboards(filteredtasks)
})


// Individual Board Events - Add
addtodotaskbtn.addEventListener('click',()=>{
    modify = false
    tasklevelinpform.value = 'todo'
    tasklevelinpform.setAttribute('disabled',true)
    formoverlay.style.display = 'flex'
})

addinprogresstaskbtn.addEventListener('click',()=>{
    modify = false
    tasklevelinpform.value = 'inprogress'
    tasklevelinpform.setAttribute('disabled',true)
    formoverlay.style.display = 'flex'
})

adddonetasksbtn.addEventListener('click',()=>{
    modify = false
    tasklevelinpform.value = 'completed'
    tasklevelinpform.setAttribute('disabled',true)
    formoverlay.style.display = 'flex'
})

// Form Events

formcancelbtn.addEventListener('click',()=>{
    formoverlay.style.display = 'none'
    clearformfields()
})


formaddbtn.addEventListener('click',async ()=>{
    const project = projectinpform.value
    const task = taskinpform.value
    const priority = priorityinpform.value
    const level = tasklevelinpform.value
    const assignedto = assigntoselect.value
    const duedate = duedateinpform.value

    if(!project || !task || !priority || !level || !assignedto || !duedate) {
        window.alert('All fields are required')
        return
    }

    const taskid = tasks.length + 1
    if(modify) {
        const modifytask = {
            "id":modifyindex+1,
            "project":project,
            "task":task,
            "level":level,
            "duedate":duedate,
            "assignedto":assignedto,
            "priority":priority
          }
        
          const response = await fetch('/modify-tasks', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(modifytask),
        });

        jsondata = await response.json()
        tasks = jsondata.tasks
        populateboards(tasks)
        populatedashboard(users,tasks)
        formoverlay.style.display = 'none'
        clearformfields()
        return
    }
    const newtask = {
      "id":taskid,
      "project":project,
      "task":task,
      "level":level,
      "duedate":duedate,
      "assignedto":assignedto,
      "priority":priority
    } 

    const response = await fetch('/add-tasks', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(newtask),
    });

    jsondata = await response.json()
    tasks = jsondata.tasks
    populateboards(tasks)
    populatedashboard(users,tasks)
    clearformfields()
    formoverlay.style.display = 'none'
})

// Modify Boards

todotasksection.addEventListener('dblclick',(e)=>{
    const boarditem = e.target.closest('.task-board-list-item')
    const index = Array.from(boarditem.parentElement.children).indexOf(boarditem)
    const modifyitem = tasks.filter((task)=> task.level === 'todo')[index]
    formtype.forEach((element)=>{
        element.innerText = 'Modify'
    })
    formoverlay.style.display = 'flex'
    modifyboard(modifyitem)
})

inprogresssection.addEventListener('dblclick',(e)=>{
    const boarditem = e.target.closest('.task-board-list-item')
    const index = Array.from(boarditem.parentElement.children).indexOf(boarditem)
    const modifyitem = tasks.filter((task)=> task.level === 'inprogress')[index]
    formtype.forEach((element)=>{
        element.innerText = 'Modify'
    })
    formoverlay.style.display = 'flex'
    modifyboard(modifyitem)
})


completedsection.addEventListener('dblclick',(e)=>{
    const boarditem = e.target.closest('.task-board-list-item')
    const index = Array.from(boarditem.parentElement.children).indexOf(boarditem)
    const modifyitem = tasks.filter((task)=> task.level === 'completed')[index]
    formtype.forEach((element)=>{
        element.innerText = 'Modify'
    })
    formoverlay.style.display = 'flex'
    modifyboard(modifyitem)
})

function modifyboard(modifyitem) {
    modify = true
    modifyindex = modifyitem.id - 1
    projectinpform.value = modifyitem.project
    taskinpform.value = modifyitem.task
    priorityinpform.value = modifyitem.priority
    tasklevelinpform.value = modifyitem.level
    assigntoselect.value = modifyitem.assignedto
    duedateinpform.value = modifyitem.duedate
}


// Utilities 
function clearformfields(){
    tasklevelinpform.removeAttribute('disabled')
    projectinpform.value = ''
    taskinpform.value = ''
    priorityinpform.value = ''
    tasklevelinpform.value = ''
    assigntoselect.value = ''
    duedateinpform.value = ''
}

function formatDate(strdate) {
    const date = new Date(strdate)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
}