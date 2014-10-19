//local storage stuff - thanks diveintoHTML

function supportsLocalStorage() {
    return ('localStorage' in window) && window['localStorage'] !== null;
}
function save() {
    if (!supportsLocalStorage()) { return false; }
    //store todos
    localStorage["stored.todos"] = todoList.innerHTML;
    //store todaybox todos
    localStorage["stored.todayTodos"] = todayTodos.innerHTML;
    //store timebox todos
    localStorage["stored.hourTodos"] = hourTodos.innerHTML;
    console.log("saving...");
    return true;
}
function resume() {
    if (!supportsLocalStorage()) { return false; }
    storedTodos = localStorage["stored.todos"];
    storedTodayTodos = localStorage["stored.todayTodos"];
    storedHourTodos = localStorage["stored.hourTodos"];

    if (!storedTodos) { return false; }
    if (!storedTodayTodos) { return false; }
    if (!storedHourTodos) { return false; }
    
    var todoList = document.getElementById('todoList');
    todoList.innerHTML = storedTodos;
    var todayTodos = document.getElementById('todayTodos');
    todayTodos.innerHTML = storedTodayTodos;
    var hourTodos = document.getElementById('hourTodos');
    hourTodos.innerHTML = storedHourTodos;
    return true;
}

// SYNC TO SERVER 
// var syncbutton = document.getElementById('sync');
// function sync(){
//   request = new XMLHttpRequest();
//   request.open('GET', 'data.json', true);
//   request.onload = function() {
//     if (request.status >= 200 && request.status < 400){
//       // Success!
//        resp = request.responseText;
//        document.body.innerHTML=resp;
//     } else {
//       // We reached our target server, but it returned an error
//     }
//   };
//   request.onerror = function() {
//     // There was a connection error of some sort
//   };
//   request.send();
// }
// syncbutton.addEventListener('click',sync,false);
