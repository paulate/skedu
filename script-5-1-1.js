var todoList = document.getElementById("todo-list");

  
document.addEventListener("keypress", function(e) {
  if ((document.activeElement.classList.contains('isInput')==false)&&(e.keyCode!=13)){
    console.log('make a thing');
    var p = document.createElement('p');
    p.classList.add('isInput');
    p.contentEditable = true;
    p.draggable=true;
    p.addEventListener('dragstart', handleDragStart, false);
    p.addEventListener('dragend', handleDragEnd, false);
    p.addEventListener('contextmenu', deleteTodo,false);
    //make an onmouesover content editable listener?
    var li = document.createElement('li');
    li.appendChild(p);
    li.addEventListener('dragover', handleDragOver, false);
    li.addEventListener('drop', handleDrop, false);
    li.addEventListener('dragenter', handleDragEnter, false); 
    li.addEventListener('dragleave', handleDragLeave, false); 
    li.addEventListener('dblclick',makeContentEditable,false);
    
    
    todoList.appendChild(li);
    p.focus();
  } else if ((e.keyCode == 13) && document.activeElement.classList.contains('isInput')){
    
    var thisTodo = document.activeElement;
    thisTodo.blur();
    thisTodo.contentEditable=false;
    thisTodo.classList.remove('isInput');
    save();    
  } else if((document.activeElement.classList.contains('isInput')==false)&&(e.keyCode==13)){
     var li = document.createElement('li');
     li.addEventListener('dragover', handleDragOver, false);
     li.addEventListener('drop', handleDrop, false);
     li.addEventListener('dragenter', handleDragEnter, false); 
     li.addEventListener('dragleave', handleDragLeave, false); 
     li.addEventListener('dblclick',makeContentEditable,false);
     todoList.appendChild(li);
     
  }
  
});



