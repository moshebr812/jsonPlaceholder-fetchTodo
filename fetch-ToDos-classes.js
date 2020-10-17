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
        this.completedTodoArray = await this.allTodoArray.filter (element => element.completed);
        this.openTodoArray = await this.allTodoArray.filter (element => (!element.completed) );
        console.log (`#2. In initTodo(), after getTodoList().  Array.length = ${this.allTodoArray.length}`);

        // 3. load the list to the DON
        this.loadTodoListToDOM('All');  // at init - show full list
        console.log (`#3. In initTodo(), after loadTodoListToDOM(All)`);

        // 4. 
        this.calcTodoCounters();
        console.log (`#4. In initTodo(), after calcTodoCounters().  ${JSON.stringify(this.todoCounters)}`);
        // 5.
        this.updateDOMTodoCounters();
        console.log (`#5. In initTodo(), after updateDOMTodoCounters().`);

        // 6. 
        this.initFilterButtons();
        console.log (`#6. In initTodo(), after initFilterButtons().`);
    }

    async getTodoList() {
        let response = await fetch ('https://jsonplaceholder.typicode.com/todos')
        // convert response to a valid JavaScript Array Object
        let totalToDosArray = await response.json();
        return totalToDosArray;
    }

    loadTodoListToDOM = (showingWhatFilter) => {
        
       let arrInFocus = [];
       if (showingWhatFilter ==='All') {
            arrInFocus = this.allTodoArray
        } else if (showingWhatFilter === 'Completed') {
            arrInFocus = this.completedTodoArray;
        } else {  // Open
            arrInFocus = this.openTodoArray;    
        }
       
        console.log ('in loadTodoListToDOM().  Array size = ' + arrInFocus.length + ' /showingWhatFilter='+showingWhatFilter);
        let html = '<ol class="uoTodoList">';
        arrInFocus.forEach ( element =>{
            html += `<li  class="${element.completed ? "completedTasks" : "openTasks"}">
                     ${element.title}  (id: ${element.id})
                    </li>`
            });
        html += '</ol>';

        this.domListContainer.innerHTML = html;     // Array List
        let classColor = (showingWhatFilter=='All') ? "allTasks" :
                         ((showingWhatFilter=='Completed') ?  "completedTasks" : "openTasks");
        document.querySelector('#idNowShowing').className = classColor;     // Header on list
        document.querySelector('#idNowShowing').innerHTML = showingWhatFilter;  // Header Text showing selected filter
    }

    calcTodoCounters () {       // method in class
        this.todoCounters = {total: 0, completed: 0, open: 0};
        this.todoCounters.total = this.allTodoArray.length;
        this.todoCounters.completed = this.completedTodoArray.length;
        this.todoCounters.open = this.openTodoArray.length;
    }

    updateDOMTodoCounters () {
        document.querySelector('#idTotalTasks').innerHTML = this.todoCounters.total;
        document.querySelector('#idCompletedTasks').innerHTML = this.todoCounters.completed;
        document.querySelector('#idOpenTasks').innerHTML = this.todoCounters.open;
    }

    initFilterButtons() {
        let btn1 = document.querySelector('#btnShowAll');
        btn1.addEventListener ('click', () => {
            console.log ('......button "Show All" pressed');
            this.loadTodoListToDOM ('All');
        });

        let btn2 = document.querySelector('#btnShowCompleted');
        btn2.addEventListener ('click', () => {
            console.log ('......button "Show Completed" pressed');
            this.loadTodoListToDOM ('Completed');
        });

        let btn3 = document.querySelector('#btnShowOpen');
        btn3.addEventListener ('click', () => {
            console.log ('......button "Show Open" pressed');
            this.loadTodoListToDOM ('Open');
        });
    }
}

let todoApp = new TodoApp();




