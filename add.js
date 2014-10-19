// wise adding interaction
var todoList = document.getElementById("todoList");

// listen for keypress  
document.addEventListener("keypress", function(e) {
  if ((document.activeElement.classList.contains('isEditing')==false)&&(e.keyCode!=13)){
    // Type to input todo.
    // nb. i bet this could be oop'd or function'd in a better way
    var p = document.createElement('p');    // "The Text Layer" // every todo-text is in a p element 
      p.classList.add('isEditing'); // this class means the todo is being edited
      p.contentEditable = true;
      p.draggable=true;
      p.addEventListener('dragstart', handleDragStart, false);
      p.addEventListener('dragend', handleDragEnd, false);
      p.addEventListener('contextmenu', deleteTodo,false);
      // nb. make an onmouesover content editable listener?
    var li = document.createElement('li');    // "The Sticky Note Layer" // every todo-text is contained in a li
      li.appendChild(p);
      li.addEventListener('dragover', handleDragOver, false);
      li.addEventListener('drop', handleDrop, false);
      li.addEventListener('dragenter', handleDragEnter, false); 
      li.addEventListener('dragleave', handleDragLeave, false); 
      li.addEventListener('dblclick',makeContentEditable,false);
    todoList.appendChild(li);  // add new todo to DOM
    p.focus(); // continue to type - "The Text Layer" is in focus
  } else if ((e.keyCode == 13) && document.activeElement.classList.contains('isEditing')){
    // Keypress return/enter to complete input/edit 
    var thisTodo = document.activeElement;
    thisTodo.blur();
    thisTodo.contentEditable=false;
    thisTodo.classList.remove('isEditing'); //done editing
    save();    
  } else if((document.activeElement.classList.contains('isEditing')==false)&&(e.keyCode==13)){
    // Add a placeholder li container for todos you want to put back on the todoList
     var li = document.createElement('li');
     li.addEventListener('dragover', handleDragOver, false);
     li.addEventListener('drop', handleDrop, false);
     li.addEventListener('dragenter', handleDragEnter, false); 
     li.addEventListener('dragleave', handleDragLeave, false); 
     li.addEventListener('dblclick', makeContentEditable,false);
     todoList.appendChild(li);  
  }
  
});



