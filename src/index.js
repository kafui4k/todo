import Task from "./Task";

const projectListContainer = document.querySelector('[data-list]');
const addProjectBtn = document.getElementById('add-project');
const newProjectContainer = document.getElementById('new-project-container');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input]');
const deleteProjectBtn = document.querySelector('[data-delete-project-button]');
const listDisplayContainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const tasksContainer = document.querySelector('[data-tasks]');
const taskTemplate = document.getElementById('task-template');
const newTaskForm = document.querySelector('[data-new-task-form]');
const newTaskInput = document.querySelector('[data-new-task-input]');


const LOCAL_STORAGE_PROJECT_KEYS = "project.projects";
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = "project.selectedProjectId";
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEYS)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);


projectListContainer.addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.listId;
        saveAndRender();
    }
});

tasksContainer.addEventListener('click', function(e) {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedProject = projects.find(project => project.id === selectedProjectId);
        const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id);
        selectedTask.complete = e.target.checked;
        save();
    }
})

deleteProjectBtn.addEventListener('click', function(e) {
    projects = projects.filter(project => project.id !== selectedProjectId)
    selectedProjectId = null
    saveAndRender();
});

newProjectForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const projectName = newProjectInput.value;

    if (projectName === '' || projectName === null) {
        return alert('cannot add empty Project');
    }

    const project = createProject(projectName);
    newProjectInput.value = '';
    projects.push(project);
    saveAndRender();
});

newTaskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskName = newTaskInput.value;

    if (taskName === '' || taskName === null) {
        return alert('cannot add empty Task');
    }

    const task = createTask(taskName);
    newTaskInput.value = '';
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    selectedProject.tasks.push(task);
    saveAndRender();
});

function createProject(project) {
    return  { id: Date.now().toString(), name: project, tasks: [] } 
}

function createTask(task) {
    return { id: Date.now().toString(), name: task, complete: false}
}

function saveAndRender() {
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEYS, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId);
}

function render() {
    // clear projects if any
    clearElement(projectListContainer);
    renderProjects()

    const selectedProject = projects.find(project => project.id === selectedProjectId);
    
    if (selectedProjectId == null) {
        listDisplayContainer.style.display = 'none';
    } else {
        listDisplayContainer.style.display = '';
        listTitleElement.innerText = selectedProject.name;
        clearElement(tasksContainer);
        renderTasks(selectedProject);
    }
}

function renderTasks(selectedProject) {
    selectedProject.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name);
        tasksContainer.appendChild(taskElement);
    })
}

function renderProjects() {
    projects.forEach(project => {
        const listElement = document.createElement('li');
        listElement.dataset.listId = project.id;
        listElement.classList.add('project-list-name');
        listElement.innerText = `${project.name}`;

        if (project.id === selectedProjectId) {
          listElement.classList.add('active-project');
        }
            
        projectListContainer.appendChild(listElement);
    })
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

addProjectBtn.addEventListener('click', function() {
    newProjectContainer.classList.add('active');
    addProjectBtn.classList.remove('active');
});

render()








const add = document.getElementById('add');
const cancel = document.getElementById('cancel');

// const btnAddTask = document.getElementById('add-task');
// const tasksContainer = document.getElementById('tasks');
// const taskTitleInputBox = document.getElementById('tasktitle');
// const taskDescInputBox = document.getElementById('description');
// const saveTaskBtn = document.getElementById('save-task');



// add.addEventListener('click', function() {
//     addProjectContainer.classList.remove('active');
//     btnAddProject.classList.add('active');
// });

// cancel.addEventListener('click', function() {
//     addProjectContainer.classList.remove('active');
//     btnAddProject.classList.add('active');
// });

// btnAddTask.addEventListener('click', function() {
//     tasksContainer.classList.add('active');
// });

// saveTaskBtn.addEventListener('click', function() {
//     // checcks
//     const taskTitle = taskTitleInputBox.value;
//     const taskDesc = taskDescInputBox.value;

//     if (taskTitle === '' || taskDesc === '') {
//         return alert('cannot add empty tasks');
//     }


//     // call Task to save task
//     // todos.addTask(new Task(taskTitle, taskDesc))
//     const createTask = new Task(taskTitle, taskDesc);
//     console.log(createTask);

//     // pass createTask to todos

//     // create HTML elements to display task
//     // added
    
// })


