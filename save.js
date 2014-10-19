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
function resume(isServer) {
      if (!isServer){
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
  } else {
    pullBucket(bucket.data.store.bucketList.object);
    var todoList = document.getElementById('todoList');
    todoList.innerHTML = serverTodoList; //storedTodos;
    var todayTodos = document.getElementById('todayTodos');
    todayTodos.innerHTML = serverTodayTodos;//storedTodayTodos;
    var hourTodos = document.getElementById('hourTodos');
    hourTodos.innerHTML = serverHourTodos;// storedHourTodos;
  }
    
    return true;
}

