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
