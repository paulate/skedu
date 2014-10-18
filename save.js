function supportsLocalStorage() {
    return ('localStorage' in window) && window['localStorage'] !== null;
}
function save() {
    if (!supportsLocalStorage()) { return false; }
    //store todos
    localStorage["stored.todos"] = todoList.innerHTML;
    //store schedule tasks
    localStorage["stored.scheduledTodos"] = scheduledTodos.innerHTML;
    //store timebox tasks
    localStorage["stored.timeboxTodos"] = timeboxTodos.innerHTML;
    console.log("saving...");
    return true;
}
function resume() {
    if (!supportsLocalStorage()) { return false; }
    storedTodos = localStorage["stored.todos"];
    storedScheduledTodos = localStorage["stored.scheduledTodos"];
    storedTimeboxTodos = localStorage["stored.timeboxTodos"];

    if (!storedTodos) { return false; }
    if (!storedScheduledTodos) { return false; }
    if (!storedTimeboxTodos) { return false; }
    
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = storedTodos;
    var scheduledTodos = document.getElementById('scheduledTodos');
    scheduledTodos.innerHTML = storedScheduledTodos;
    var timeboxTodos = document.getElementById('timeboxTodos');
    timeboxTodos.innerHTML = storedTimeboxTodos;
    return true;
}

var syncbutton = document.getElementById('sync');


function sync(){
  request = new XMLHttpRequest();
  request.open('GET', 'data.json', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
      // Success!
       resp = request.responseText;
       document.body.innerHTML=resp;
       console.log("hey");
    } else {
      // We reached our target server, but it returned an error

    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();

}
syncbutton.addEventListener('click',sync,false);



// function init(){
  
   
// }

// init();
