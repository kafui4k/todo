/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Task.js":
/*!*********************!*\
  !*** ./src/Task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Task {\n    constructor(title, desc, dueDate = 'today') {\n        this.title = title;\n        this.desc = desc;\n        this.dueDate = dueDate;\n    }\n\n    setTitle(title) {\n        this.title = title;\n    }\n\n    getTitle() {\n        return this.title;\n    }\n\n    setDesc(desc) {\n        this.desc = desc;\n    }\n\n    getDesc() {\n        return this.desc;\n    }\n\n    setDueDate(dueDate) {\n        this.dueDate = dueDate;\n    }\n\n    getDueDate() {\n        return this.dueDate;\n    }\n\n\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);\n\n//# sourceURL=webpack://todo/./src/Task.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ \"./src/Task.js\");\n\n\nconst projectListContainer = document.querySelector('[data-list]');\nconst addProjectBtn = document.getElementById('add-project');\nconst newProjectContainer = document.getElementById('new-project-container');\nconst newProjectForm = document.querySelector('[data-new-project-form]');\nconst newProjectInput = document.querySelector('[data-new-project-input]');\nconst deleteProjectBtn = document.querySelector('[data-delete-project-button]');\nconst listDisplayContainer = document.querySelector('[data-list-display-container]');\nconst listTitleElement = document.querySelector('[data-list-title]');\nconst tasksContainer = document.querySelector('[data-tasks]');\nconst taskTemplate = document.getElementById('task-template');\nconst newTaskForm = document.querySelector('[data-new-task-form]');\nconst newTaskInput = document.querySelector('[data-new-task-input]');\n\n\nconst LOCAL_STORAGE_PROJECT_KEYS = \"project.projects\";\nconst LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = \"project.selectedProjectId\";\nlet projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEYS)) || [];\nlet selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);\n\n\nprojectListContainer.addEventListener('click', function(e) {\n    if (e.target.tagName.toLowerCase() === 'li') {\n        selectedProjectId = e.target.dataset.listId;\n        saveAndRender();\n    }\n});\n\ntasksContainer.addEventListener('click', function(e) {\n    if (e.target.tagName.toLowerCase() === 'input') {\n        const selectedProject = projects.find(project => project.id === selectedProjectId);\n        const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id);\n        selectedTask.complete = e.target.checked;\n        save();\n    }\n})\n\ndeleteProjectBtn.addEventListener('click', function(e) {\n    projects = projects.filter(project => project.id !== selectedProjectId)\n    selectedProjectId = null\n    saveAndRender();\n});\n\nnewProjectForm.addEventListener('submit', function(e) {\n    e.preventDefault();\n    const projectName = newProjectInput.value;\n\n    if (projectName === '' || projectName === null) {\n        return alert('cannot add empty Project');\n    }\n\n    const project = createProject(projectName);\n    newProjectInput.value = '';\n    projects.push(project);\n    saveAndRender();\n});\n\nnewTaskForm.addEventListener('submit', function(e) {\n    e.preventDefault();\n    const taskName = newTaskInput.value;\n\n    if (taskName === '' || taskName === null) {\n        return alert('cannot add empty Task');\n    }\n\n    const task = createTask(taskName);\n    newTaskInput.value = '';\n    const selectedProject = projects.find(project => project.id === selectedProjectId);\n    selectedProject.tasks.push(task);\n    saveAndRender();\n});\n\nfunction createProject(project) {\n    return  { id: Date.now().toString(), name: project, tasks: [] } \n}\n\nfunction createTask(task) {\n    return { id: Date.now().toString(), name: task, complete: false}\n}\n\nfunction saveAndRender() {\n    save()\n    render()\n}\n\nfunction save() {\n    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEYS, JSON.stringify(projects));\n    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY, selectedProjectId);\n}\n\nfunction render() {\n    // clear projects if any\n    clearElement(projectListContainer);\n    renderProjects()\n\n    const selectedProject = projects.find(project => project.id === selectedProjectId);\n    \n    if (selectedProjectId == null) {\n        listDisplayContainer.style.display = 'none';\n    } else {\n        listDisplayContainer.style.display = '';\n        listTitleElement.innerText = selectedProject.name;\n        clearElement(tasksContainer);\n        renderTasks(selectedProject);\n    }\n}\n\nfunction renderTasks(selectedProject) {\n    selectedProject.tasks.forEach(task => {\n        const taskElement = document.importNode(taskTemplate.content, true);\n        const checkbox = taskElement.querySelector('input');\n        checkbox.id = task.id;\n        checkbox.checked = task.complete;\n        const label = taskElement.querySelector('label');\n        label.htmlFor = task.id;\n        label.append(task.name);\n        tasksContainer.appendChild(taskElement);\n    })\n}\n\nfunction renderProjects() {\n    projects.forEach(project => {\n        const listElement = document.createElement('li');\n        listElement.dataset.listId = project.id;\n        listElement.classList.add('project-list-name');\n        listElement.innerText = `${project.name}`;\n\n        if (project.id === selectedProjectId) {\n          listElement.classList.add('active-project');\n        }\n            \n        projectListContainer.appendChild(listElement);\n    })\n}\n\nfunction clearElement(element) {\n    while(element.firstChild) {\n        element.removeChild(element.firstChild);\n    }\n}\n\naddProjectBtn.addEventListener('click', function() {\n    newProjectContainer.classList.add('active');\n    addProjectBtn.classList.remove('active');\n});\n\nrender()\n\n\n\n\n\n\n\n\nconst add = document.getElementById('add');\nconst cancel = document.getElementById('cancel');\n\n// const btnAddTask = document.getElementById('add-task');\n// const tasksContainer = document.getElementById('tasks');\n// const taskTitleInputBox = document.getElementById('tasktitle');\n// const taskDescInputBox = document.getElementById('description');\n// const saveTaskBtn = document.getElementById('save-task');\n\n\n\n// add.addEventListener('click', function() {\n//     addProjectContainer.classList.remove('active');\n//     btnAddProject.classList.add('active');\n// });\n\n// cancel.addEventListener('click', function() {\n//     addProjectContainer.classList.remove('active');\n//     btnAddProject.classList.add('active');\n// });\n\n// btnAddTask.addEventListener('click', function() {\n//     tasksContainer.classList.add('active');\n// });\n\n// saveTaskBtn.addEventListener('click', function() {\n//     // checcks\n//     const taskTitle = taskTitleInputBox.value;\n//     const taskDesc = taskDescInputBox.value;\n\n//     if (taskTitle === '' || taskDesc === '') {\n//         return alert('cannot add empty tasks');\n//     }\n\n\n//     // call Task to save task\n//     // todos.addTask(new Task(taskTitle, taskDesc))\n//     const createTask = new Task(taskTitle, taskDesc);\n//     console.log(createTask);\n\n//     // pass createTask to todos\n\n//     // create HTML elements to display task\n//     // added\n    \n// })\n\n\n\n\n//# sourceURL=webpack://todo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;