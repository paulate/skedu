var scheduleDD = new function() {

  //GENERATE SCHEDULE
  var schedule = document.getElementById("schedule");
  function displayTimeList() {
  	var times ='';
  	for (i = 7; i<=9;i++){
  		times += '<li>0'+parseInt(i)+':00</li>';
  	
  	}
  	for (i = 10; i<=24;i++){
  		times += '<li>'+parseInt(i)+':00</li>';
  	
  	}
  	var timeTable = '<ol>'+times+'</ol>';
  	return timeTable
  }
  function displayPlaceholderList() {
    var placeholders='';
    for (i = 7; i <=24; i++){
      placeholders += '<li></li>';
      
    }
    var placeholderList = '<ul id="scheduledTodos">'+placeholders+'</ul>';
    return placeholderList
  }
  schedule.insertAdjacentHTML('beforeEnd', displayTimeList());
  schedule.insertAdjacentHTML('beforeEnd', displayPlaceholderList());
  //GENERATE TIMEBOX
  var timebox = document.getElementById("timebox");
  function displayTimeboxList() {
  	var times ='';
  	for (i = 0; i<60;i+=5){
  		times += '<li>:'+parseInt(i)+'</li>';
  	
  	}
  	var timeTable = '<ol>'+times+'</ol>';
  	return timeTable
  }
  function displayTimeboxPlaceholderList() {
    var placeholders='';
    for (i = 0; i<60;i+=5){
      placeholders += '<li></li>';
      
    }
    var placeholderList = '<ul id="timeboxTodos">'+placeholders+'</ul>';
    return placeholderList
  }
 timebox.insertAdjacentHTML('beforeEnd', displayTimeboxList());
 timebox.insertAdjacentHTML('beforeEnd', displayTimeboxPlaceholderList());
  
  
  this.init = function () {
      if (EventHelpers.hasPageLoadHappened(arguments)) {
        return;
      }
      if (!resume()) {
      }
      
  // var dragSrcEl = null;
  var currentlyDraggedNode; 
  
 
  
  
  
  var items = document.querySelectorAll('p');
  [].forEach.call(items, function(items) {
    items.addEventListener('dragstart', handleDragStart, false);
    items.addEventListener('dragend', handleDragEnd, false);
    items.addEventListener('contextmenu', deleteTodo,false);
    
  });
  
  var list = document.querySelectorAll('ul li');
  [].forEach.call(list,function(items){
    items.addEventListener('dragover', handleDragOver, false);
    items.addEventListener('drop', handleDrop, false);
    items.addEventListener('dragenter', handleDragEnter, false); 
    items.addEventListener('dragleave', handleDragLeave, false);  
    items.addEventListener('dblclick',makeContentEditable,false);
  });

  
  var listBlanks = document.getElementById('todo-list').querySelectorAll('li');
  [].forEach.call(listBlanks,function(items){
    if (items.innerHTML===""){
      items.classList.add('remove');
    }
  });
  
  var deleteBlanks = document.getElementsByClassName('remove');
  while(deleteBlanks[0]) {
      deleteBlanks[0].parentNode.removeChild(deleteBlanks[0]);
  }
  
  }
  

  
  }


  function handleDragStart(e) {
    // Target (this) element is the source node.
    this.style.opacity = '0.4';
  
    // dragSrcEl = this;
  
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  
		currentlyDraggedNode = this;				
		currentlyDraggedNode.className = 'isDragged';  
  }
  
  function handleDragOver(e) {
		EventHelpers.preventDefault(e);     // Necessary. Allows us to drop.
    
  
    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  
    return false;
  }
  
  function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
  }
  
  function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }
  
  function handleDrop(e) {
    // this/e.target is current target element.
  
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
  
    // // Don't do anything if dropping the same column we're dragging.
//     if (dragSrcEl != this) {
//       // Set the source column's HTML to the HTML of the column we dropped on.
//       //dragSrcEl.innerHTML = this.innerHTML; //this swaps the content
//       this.innerHTML = e.dataTransfer.getData('text/html');
//     }
		currentlyDraggedNode.parentNode.removeChild(currentlyDraggedNode);
		this.appendChild(currentlyDraggedNode);
    return false;
  }
  
  
  function handleDragEnd(e) {
    // this/e.target is the source node.
    this.style.opacity = '1';
    
		currentlyDraggedNode.className = '';
    
    var items = document.querySelectorAll('ul li');
  
    [].forEach.call(items, function (items) {
      items.classList.remove('over');
    });
   save();
  }
  function makeContentEditable(e) {
    this.firstChild.contentEditable=true;
    this.firstChild.classList.add('isInput');
    this.firstChild.focus();
  
  }
  function deleteTodo(e){
    this.parentNode.innerHTML="";
    e.preventDefault();
    save();
  }
DragDropHelpers.fixVisualCues=true;
EventHelpers.addPageLoadEvent('scheduleDD.init');

