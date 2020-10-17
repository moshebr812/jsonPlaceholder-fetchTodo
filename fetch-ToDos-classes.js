class TodoApp {
    constructor() {
        this.domListContainer = document.querySelector('#todosListItems');
        // by pass limitation - can't use async in constructor
        
        // This can be skipped as these are defined in the init, but for calrity added them here
        this.allTodoArray = [];
        this.completedTodoArray = [];
        this.openTodoArray = [];

        this.initTodo();
    }

    // No need for the prefix function: its a Methid on the class
    // must put async as we are accessing API
    async initTodo() {
        // 1. 
        console.log (`#1. START TodoApp.initTodo() ..909`);
        // 2. the function returns the full array, and we initiate a class variable with it
        this.allTodoArray = await this.getTodoList();
        this.completedTodoArray = this.allTodoArray.filter (element => element.completed);
        this.openTodoArray = this.allTodoArray.filter (element => (!element.completed) );
        console.log (`#2. In initTodo(), after getTodoList().  Array.length = ${this.allTodoArray.length}`);

        // 3. Moved to class TodoList --> load the list to the DON
        // this.loadTodoListToDOM('All');  // at init - show full list

        // 4. Moved to class TodoStatusCounters
        // this.calcTodoCounters();

        // 5. Moved to class TodoStatusCounters
        // this.updateDOMTodoCounters();

        // 6. 
        // this.initFilterButtons();

        // create instance of class TodoStatusCounters
        console.log (`#7. In initTodo(), new TodoStatusCounters`);
        let todoStatus = new TodoStatusCounters (this.allTodoArray, this.completedTodoArray, this.openTodoArray);

        // create instance of class TodoList
        console.log (`#8. In initTodo(), new TodoList`);
        let todoList = new TodoList (this.allTodoArray, this.completedTodoArray, this.openTodoArray);
    }

    async getTodoList() {
        let response = await fetch ('https://jsonplaceholder.typicode.com/todos')
        // convert response to a valid JavaScript Array Object
        let totalToDosArray = await response.json();
        return totalToDosArray;
    }
}

let todoApp = new TodoApp();

class TodoStatusCounters {
    constructor (allTodoArr, completedTodoArr, openTodoArr) {
        this.calcTodoCounters (allTodoArr, completedTodoArr, openTodoArr);
        this.updateDOMTodoCounters();
    }

    calcTodoCounters (allTodoArr, completedTodoArr, openTodoArr) {
        console.log ('in class TodoStatusCounters :  calcTodoCounters()');
        this.statusCounters =  {
            total:      allTodoArr.length,
            completed:  completedTodoArr.length,
            open:       openTodoArr.length
        } // end object "statusCounters"    
    }
    
    updateDOMTodoCounters () {
        console.log ('in class TodoStatusCounters :  updateDOMTodoCounters()');
        document.querySelector('#idTotalTasks').innerHTML = this.statusCounters.total;
        document.querySelector('#idCompletedTasks').innerHTML = this.statusCounters.completed;
        document.querySelector('#idOpenTasks').innerHTML = this.statusCounters.open;
    }
}

class TodoList {
    constructor (allTodoArr, completedTodoArr, openTodoArr) {
        // hold all data locally
        this.allTodo = allTodoArr;
        this.completedTodo = completedTodoArr;
        this.openTodo = openTodoArr;
        // dom List Container & Text Header
        this.domListObject = document.querySelector('#todosListItems');
        this.domListFilterType = document.querySelector('#idNowShowing')
        // buttons pointers
        this.btn1 = document.querySelector('#btnShowAll');
        this.btn2 = document.querySelector('#btnShowCompleted');
        this.btn3 = document.querySelector('#btnShowOpen');
        this.btnAbout = document.querySelector('#btnAbout');
        //
        this.loadTodoListToDOM('All');
        this.initFilterButtons();
    }    

    loadTodoListToDOM (filterType) {
        console.log (`in class TodoList:  loadTodoListToDOM(${filterType})`);
        let arrInFocus = [];
        if (filterType ==='All') {
             arrInFocus = this.allTodo;
         } else if (filterType === 'Completed') {
             arrInFocus = this.completedTodo;
         } else {  // Open
             arrInFocus = this.openTodo;    
         }
        
         let html = '<ol class="uoTodoList">';
         arrInFocus.forEach ( element =>{
             html += `<li  class="${element.completed ? "completedTasks" : "openTasks"}">
                      ${element.title}  (id: ${element.id})
                     </li>`
             });
         html += '</ol>';
 
         this.domListObject.innerHTML = html;     // Array List
         let classColor = (filterType=='All') ? "allTasks" :
                          ((filterType=='Completed') ?  "completedTasks" : "openTasks");
         this.domListFilterType.className = classColor;     // Header on list
         this.domListFilterType.innerHTML = filterType;  // Header Text showing selected filter
    }

    initFilterButtons() {
        console.log (`in class TodoList:  initFilterButtons()`);
        this.btn1.addEventListener ('click', () => {
            console.log ('......button "Show All" pressed');
            this.loadTodoListToDOM ('All');
        });

        this.btn2.addEventListener ('click', () => {
            console.log ('......button "Show Completed" pressed');
            this.loadTodoListToDOM ('Completed');
        });

        this.btn3.addEventListener ('click', () => {
            console.log ('......button "Show Open" pressed');
            this.loadTodoListToDOM ('Open');
        });

        this.btnAbout.addEventListener ('click', () => {
            console.log ('......button "About" pressed');
            alert ('Lesson from: 2020-Sep-13 / Roy P \nusing jsonplaceholder over Todo list \n\n divide your code into 3 classes');
        });
    }
}