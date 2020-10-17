==============
fetch-HTMLPage
==============
    Example how to receve an html page from fetch & load it to DOM
    // Option 1
    fetch ('')
        .then (response => response.text())
        .then (pageAsText => {
            document.body.innerHTML = pageAsText;
        })


    // Option 2
    respose = await fetc('');
    finalText = await response.text();
    document.body.innerHTML = pageAsText;

==============
fetch-ToDos
==============
    Example how to load JSON data from jsonplaceholder
    provide separate function for:
    
        async function getTodoList( ) /  (using fecth)
        calcTodoCounters (count total, complered, open using array.filter)
        updateDOMTodoCounters (update 3 counters on DOM)
        loadTodoListToDOM (loop on array, convert to <li>, st to DOM)
        initFilterButtons (add the events that set the different Array Lists)


==============
fetch-ToDos-classes
==============
    I split the function into 3 classes
    class TodoApp {
        1. performs the fetch via getTodoList

        2. creates 3 arrays: all[] (via fetch), completed[] (via filter), open[] (via filter)

        3. create instances:    
            3.1 new TodoStatusCounters
                this.calcTodoCounters (allTodoArr, completedTodoArr, openTodoArr);
                this.updateDOMTodoCounters();
        
            3.2 new new TodoList
                get pointers to DOM objects
                this.loadTodoListToDOM('All');
                this.initFilterButtons();
    }


    class TodoStatusCounters {

    }
    
    class TodoList {

    }

    Why afe the buttons on the same class as the List?
        As they work on the list, and have no scope without the list.
        The list can "live" without the buttons