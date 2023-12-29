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
let jsondata,users,tasks
;
(async()=>{
    const currentuserres = await fetch('/get-user')
    const currentuser = await currentuserres.json()
    const datares = await fetch('/users-data')
    jsondata = await datares.json()
    users = jsondata.users
    tasks = jsondata.tasks
    username.innerText = currentuser.username
    populateform(users,tasks)
    populateboards(tasks)
    populatedashboard(users,tasks)
})()

function populatedashboard(users,tasks) {
    const totalusers = users.length
    const totaltasks = tasks.length
    const completedtasks = tasks.filter((task) => task.level === 'completed').length
    activeuserdashboard.innerText = totalusers
    yettocompletetaskdashboard.innerText = totaltasks - completedtasks
    completedtaskdashboard.innerText = completedtasks
}

function populateboards(tasks) {
    populatetodotasks(tasks)
    populateinprogresstasks(tasks)
    populatecompletedtasks(tasks)
}

function populatetodotasks(tasks) {
    const todotasks = tasks.filter((task) => task.level === 'todo')
    todotasksection.innerHTML = ''
    todotasks.forEach((todotask)=>{
    const todotaskitem = `<div class="task-board-list-item todo-border">
                        <div class="board-project-date-row">
                            <div class="todo-task-color-container"></div>
                            <div class="task-project-name">${todotask.project}</div>
                            <div class="task-due-date">${todotask.duedate}</div>
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


function populateinprogresstasks(tasks) {
    const inprogresstasks = tasks.filter((task) => task.level === 'inprogress')
    inprogresssection.innerHTML = ''
    inprogresstasks.forEach((inprogresstask)=>{
    const inprogressitem = `<div class="task-board-list-item inprogress-border">
        <div class="board-project-date-row">
            <div class="inprogress-task-color-container"></div>
            <div class="task-project-name">${inprogresstask.project}</div>
            <div class="task-due-date">${inprogresstask.duedate}</div>
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

function populatecompletedtasks(tasks) {
    const completedtasks = tasks.filter((task) => task.level === 'completed')
    completedsection.innerHTML = ''
    completedtasks.forEach((completedtask)=>{
    const completeditem = `<div class="task-board-list-item done-border">
        <div class="board-project-date-row">
            <div class="done-task-color-container"></div>
            <div class="task-project-name">${completedtask.project}</div>
            <div class="task-due-date">${completedtask.duedate}</div>
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

function populate(currentuser) {
    username.innerText = currentuser.username
}

function populateform(users,tasks) {

    // Assignto 
    assigntoselect.innerHTML = ''
    users.forEach((user)=>{
        const option = document.createElement('option')
        option.value = user.username
        option.innerHTML = user.username
        assigntoselect.append(option)
    })
}

logoutbtn.addEventListener('click',()=>{
    window.location.href = '/signin'
})

// Form Events

addtaskbtn.addEventListener('click',()=>{
    formoverlay.style.display = 'flex'
})

addtodotaskbtn.addEventListener('click',()=>{
    tasklevelinpform.value = 'todo'
    tasklevelinpform.setAttribute('disabled',true)
    formoverlay.style.display = 'flex'
})

addinprogresstaskbtn.addEventListener('click',()=>{
    tasklevelinpform.value = 'inprogress'
    tasklevelinpform.setAttribute('disabled',true)
    formoverlay.style.display = 'flex'
})

adddonetasksbtn.addEventListener('click',()=>{
    tasklevelinpform.value = 'completed'
    tasklevelinpform.setAttribute('disabled',true)
    formoverlay.style.display = 'flex'
})

formcancelbtn.addEventListener('click',()=>{
    formoverlay.style.display = 'none'
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
    formoverlay.style.display = 'none'
})
