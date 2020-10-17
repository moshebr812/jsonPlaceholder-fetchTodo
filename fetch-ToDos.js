/* Object Fields are:
        userId, id, title, completed
*/
const domTotalCounter = document.querySelector('#idTotalTasks');
const domCompletedCounter = document.querySelector('#idCompletedTasks');
const domOpenCounter = document.querySelector('#idOpenTasks');

const isDebug = true;

let allTodoArray=[];
// I do not hold here any globals to make sure I pass the parameters properly between the objects

async function getTodoList() {
    // get the data via API .... fetch
    let response = await fetch ('https://jsonplaceholder.typicode.com/todos')
    // convert response to a valid JavaScript Array Object
    let totalToDosArray = await response.json();
    allTodoArray = totalToDosArray;
    return totalToDosArray;
}


// note: if the filter is on a long array, I might want to add async & await on filter
function calcTodoCounters (totalTodos) {
//async function setTodoCounters (totalTodos) {
    let todoCounters = {total: 0, completed: 0, open: 0};
    todoCounters.total = totalTodos.length;
    // put the filter in await as it may be a long file
    todoCounters.completed = (totalTodos.filter ( element => element.completed)).length;
    // todoCounters.completed = (await totalTodos.filter ( element => element.completed)).length;
    todoCounters.open = todoCounters.total - todoCounters.completed;
    
    if (isDebug) {console.log (JSON.stringify (todoCounters)) };
    return todoCounters;
}

updateDOMTodoCounters = (todoStatus) => {
    domTotalCounter.innerHTML = todoStatus.total.toString();
    domCompletedCounter.innerHTML = todoStatus.completed.toString();
    domOpenCounter.innerHTML = todoStatus.open.toString();
    // no return value. This function only updates the DOM Counters
}

loadTodoListToDOM = (pArrayToPrint, showingWhatFilter) => {
    console.log ('loadTodoListToDOM().  Array size = ' + pArrayToPrint.length + ' /showingWhatFilter='+showingWhatFilter);
    // May receive any of 3 lists: 1=All, 2=Completed, 3=Open
    let html = '<ol class="uoTodoList">';
    pArrayToPrint.forEach ( element =>{
        html += `<li  class="${element.completed ? "completedTasks" : "openTasks"}">
                 ${element.title}  (id: ${element.id})
                </li>`
    });
    html += '</ol>';

    document.querySelector('#todosListItems').innerHTML = html;

    let classColor = (showingWhatFilter=='All') ? "allTasks" :
                     ((showingWhatFilter=='Completed') ?  "completedTasks" : "openTasks");
    
    document.querySelector('#idNowShowing').className = classColor;
    document.querySelector('#idNowShowing').innerHTML = showingWhatFilter;
}

function initFilterButtons() {
    console.log ('initFilterButtons()');
    let btn1 = document.querySelector('#btnShowAll');
    btn1.addEventListener ('click', () => {
        console.log ('button "Show All pressed');
        loadTodoListToDOM (allTodoArray, 'All');
    });

    let btn2 = document.querySelector('#btnShowCompleted');
    btn2.addEventListener ('click', () => {
        console.log ('button "Show Completed pressed');
        let completedArr = allTodoArray.filter (element => element.completed);
        loadTodoListToDOM (completedArr , 'Completed');
    });

    let btn3 = document.querySelector('#btnShowOpen');
    btn3.addEventListener ('click', () => {
        console.log ('button "Show Open pressed');
        let openArr = allTodoArray.filter (element => !element.completed);
        loadTodoListToDOM (openArr, 'Open');
    });
}

(() => {
    // await getToDoList();
    // updateTasksCounters(totalToDosCounter, completedToDosCounter);
})();

async function init() {
    // 1. read the todo list from API via fetch.
    let todosList = await getTodoList();
    // if (isDebug) {console.log ('init(). after getTodoList().  todosList.length - ' +todosList.length)};
    
    // 2. Get the counters. using await as we filter a potentially long list.
    let todosStatus = calcTodoCounters (todosList);
    // !!!!this also worked, but was not necessary
    // let todosStatus = await setTodoCounters (todosList);
    
    // 3. Update the DOM with the counters
    updateDOMTodoCounters (todosStatus);

    // 4. Load actual todo list to DOM.
    loadTodoListToDOM(todosList , 'All');

    // 5. We need to init the events for all 3 buttons
    initFilterButtons();
}


init();