var simperium = new Simperium('fall-horizon-f42', { token : '2fe0125038ac406798158e7187568367'});


var bucket = simperium.bucket('bucket');
var localbucket;
var serverTodoList;
var serverTodayTodos;
var serverHourTodos;

function pullbucket(data){
    // Pull from server
    serverTodoList =  data["todoList"];
    serverTodayTodos = data["todayTodos"];
    serverHourTodos = data["hourTodos"];
  //
  // var todoList = document.getElementById('todoList');
  // todoList.innerHTML = data["todoList"];
  // var todayTodos = document.getElementById('todayTodos');
  // todayTodos.innerHTML = data["todayTodos"];
  // var hourTodos = document.getElementById('hourTodos');
  // hourTodos.innerHTML = data["hourTodos"];
  // console.log('pullbucket');
 }

bucket.on('notify', function(id, data) {
    console.log("object "+id+" was updated! whooo");
    // console.log("new data is:");
    // console.log(data);
    if (id == "bucketList"){
      pullbucket(data);
   
}

});

bucket.on('ready', function(id) {
  var todoList = document.getElementById('todoList');
  var todayTodos = document.getElementById('todayTodos');
  var hourTodos = document.getElementById('hourTodos');

    console.log("ready!");
       // resume(true);
    
    bucket.update("bucketList", {"todoList": todoList.innerHTML,"todayTodos":todayTodos.innerHTML,"hourTodos":hourTodos.innerHTML });
});

bucket.start();





// SYNC TO SERVER
var syncbutton = document.getElementById('sync');
function sync(){
  var todoList = document.getElementById('todoList');
  var todayTodos = document.getElementById('todayTodos');
  var hourTodos = document.getElementById('hourTodos');
    console.log("synced!");
    bucket.update("bucketList", {"todoList": todoList.innerHTML,"todayTodos":todayTodos.innerHTML,"hourTodos":hourTodos.innerHTML });
};


syncbutton.addEventListener('click',sync,false);
