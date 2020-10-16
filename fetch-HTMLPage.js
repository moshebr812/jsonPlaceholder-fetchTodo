alert('using https://jsonplaceholder.typicode.com   \n\nRoy: video 2020-Sep-13');



// Syntax 1 but NOT async
function loadDemoPage_1 () {
    console.log ('\n ======  loadDemoPage_1 ..3  =======\n');

    
    fetch ('https://jsonplaceholder.typicode.com')
    // input = the fetch reponse which is an html page content
    // output to the next then() ==>> we convert it to text
    .then (response => response.text())
    // input text, which represnts html page
    // & we assign it to the page body
    .then (htmlAsText => {
         document.body.innerHTML = htmlAsText;
    });
}

async function loadDemoPage_2() {
    console.log ('\n ======  loadDemoPage_2 ..AA  =======\n');
    let fetchResponse = await fetch ('https://jsonplaceholder.typicode.com');
    let pageAsHTML = await fetchResponse.text();
    document.body.innerHTML = pageAsHTML;
}
//  loadDemoPage_1();
 loadDemoPage_2();