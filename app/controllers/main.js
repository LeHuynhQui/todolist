import { METHOD } from '../configs/constants.js';
import { ToDoListSerVice } from './../services/ToDoListService.js';
import { Validation } from "./../models/Validation.js";
import Task from './../models/Task.js'

const getEle = (id) => document.getElementById(id)


const service = new ToDoListSerVice();
const validation = new Validation();

let taskList = [];
let deleteID = '';


// thay doi ngay
const DATE = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let dateNow = months[DATE.getMonth()] + " " + DATE.getDate() + ", " + DATE.getFullYear()

document.querySelector(".card__title").innerHTML = `<h3>${dateNow}</h3>`




// 

const getTaskList = () => {
    service.callAPI("/toDoList", METHOD.GET, null)
        .then(({data}) => {
            taskList = data
            renderDoTask(data)
            renderDoneTask(data)
        })
        .catch (error => {
            console.log(error)
        })
}

getTaskList()

const renderDoTask = (taskList) => {
    let html =  taskList.filter(task => !task.done).reduce((init, task) => {
        return init += `<li>
            <span>${task.taskName}</span>
            <div class="buttons">
                <button type="button" class="remove" data-toggle="modal" data-target="#exampleModal" onclick = "handleXoaBtn(${task.id})">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button type="button" class="complete" onclick = "addTaskCompleted(${task.id})">
                    <i class="far fa-check-circle">
                    </i>
                    <i class="fas fa-check-circle">
                    </i>
                </button>
            </div>
        </li>`
    }, '')

    getEle("todo").innerHTML = html
}

const renderDoneTask = (taskList) => {
    let html =  taskList.filter(task => task.done).reduce((init, task) => {
        return init += `<li>
            <span>${task.taskName}</span>
            <div class="buttons">
                <button type="button" class="remove" data-toggle="modal" data-target="#exampleModal" onclick = "handleXoaBtn(${task.id})">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button type="button" class="complete">
                    <i class="far fa-check-circle">
                    </i>
                    <i class="fas fa-check-circle">
                    </i>
                </button>
                <button type="button" class="complete" onclick = "rejectTask(${task.id})">
                    <i class="fas fa-undo"></i>
                </button>
            </div>
        </li>`
    }, '')

    getEle("completed").innerHTML = html
}


// addTask

const addTask = () => {
    // validation
    const taskName = getEle("newTask").value

    let isValid = true;

    isValid &= validation.kiemTraRong (
        taskName,
        "error-mess",
        "* The field is required!"
    ) && validation.kiemTraTrung (
        taskName,
        "error-mess",
        "* Task name already exists!",
        taskList
    ) && validation.kiemtraOnlyChu (
        taskName,
        "error-mess",
        "* Only letters are accepted!",
    )

    if (isValid) {
        const task = new Task(taskName.toUpperCase(), false)
        service.callAPI("/toDoList", METHOD.POST, task)
            .then(() => {
                getTaskList()
                console.log("ADD TASK SUCCESSFULLY!")
                getEle("newTask").value = ""
            })
            .catch(error => {
                console.log(error)
            })
    }
}

window.addTask = addTask

// deleteTask
const handleXoaBtn = (id) => {
    deleteID = id
}

window.handleXoaBtn = handleXoaBtn;


const deleteTask = () => {
    service.callAPI(`/toDoList/${deleteID}`, METHOD.DELETE, null)
        .then(() => {
            console.log ("DELETE TASK COMPLETED!")
            getTaskList()
            document.querySelector(".close").click()
        })
        .catch (error => {
            console.log(error)
        })
}

window.deleteTask = deleteTask;

// addTaskCompleted

const addTaskCompleted = (id) => {
    let task = taskList.find(task => task.id == id)

    task = {...task, done: true}

    service.callAPI(`/toDoList/${id}`, METHOD.PUT, task)
        .then(() => {
            console.log ("ADD COMPLETED TASK COMPLETED!")
            getTaskList()
        })
        .catch (error => {
            console.log(error)
        })
}

window.addTaskCompleted = addTaskCompleted;


// rejectTask
const rejectTask = (id) => {
    let task = taskList.find(task => task.id == id)

    task = {...task, done: false}

    service.callAPI(`/toDoList/${id}`, METHOD.PUT, task)
        .then(() => {
            console.log ("REJECT TASK COMPLETED!")
            getTaskList()
        })
        .catch (error => {
            console.log(error)
        })
}

window.rejectTask = rejectTask;


// sortDown
const sortDown = () => {
    let taskName = []
    taskList.forEach(task => {
        taskName.push(task.taskName)
    });

    taskName.sort();

    let mangTaskSort = []
    taskName.forEach(task => {
        let objectTaskSort = taskList.find (taskFind => taskFind.taskName === task)
        mangTaskSort.push(objectTaskSort)
    })

    renderDoTask(mangTaskSort);
    renderDoneTask(mangTaskSort);
}

window.sortDown = sortDown;


// sortUp
const sortUp = () => {
    let taskName = []
    taskList.forEach(task => {
        taskName.push(task.taskName)
    });

    taskName.sort();

    let mangTaskSort = []
    taskName.forEach(task => {
        let objectTaskSort = taskList.find (taskFind => taskFind.taskName === task)
        mangTaskSort.unshift(objectTaskSort)
    })

    renderDoTask(mangTaskSort);
    renderDoneTask(mangTaskSort);
}

window.sortUp = sortUp;