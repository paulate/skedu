// Mashup from http://www.useragentman.com/blog/2010/01/10/cross-browser-html5-drag-and-drop/
// and http://www.html5rocks.com/en/tutorials/dnd/basics/
// thank you to those awesome sites.
var listsDragInit = new function() { // this is initialized at the end of this script
  //GENERATE todaybox
  var todaybox = document.getElementById("todaybox");
  function generateTodayTimes() {
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
  function generateTodayPlaceholders() {
    var placeholders='';
    for (i = 7; i <=24; i++){
      placeholders += '<li></li>'; 
    }
    var placeholderList = '<ul id="todayTodos">'+placeholders+'</ul>';
    return placeholderList
  }
  todaybox.insertAdjacentHTML('beforeEnd', generateTodayTimes()); // insert into DOM
  todaybox.insertAdjacentHTML('beforeEnd', generateTodayPlaceholders());
  //GENERATE hourbox
  var hourbox = document.getElementById("hourbox");
  function generateHourTimes() {
  	 var times ='';
  	 for (i = 0; i<60;i+=5){
  	 	times += '<li>:'+parseInt(i)+'</li>';
  	 }
  	 var timeTable = '<ol>'+times+'</ol>';
  	 return timeTable
   }
   function generateHourPlaceholders() {
     var placeholders='';
     for (i = 0; i<60;i+=5){
       placeholders += '<li></li>';
     }
     var placeholderList = '<ul id="hourTodos">'+placeholders+'</ul>';
     return placeholderList
   }
 hourbox.insertAdjacentHTML('beforeEnd', generateHourTimes()); // insert into DOM
 hourbox.insertAdjacentHTML('beforeEnd', generateHourPlaceholders());
 
 
 
 // initialize stuff when page loads, still not exactly sure y u need 2 wait 4 pageload
 this.init = function () {
    if (EventHelpers.hasPageLoadHappened(arguments)) {return;} // for drag and drop (from useragentman)
    if (!resume()) {} // local storage - load cache back into the site      
    // initialize eventListeners for dragging and dropping
    var items = document.querySelectorAll('p');   // "The Text Layer" // every todo-text is in a p element 
    [].forEach.call(items, function(items) {
      items.addEventListener('dragstart', handleDragStart, false);
      items.addEventListener('dragend', handleDragEnd, false);
      items.addEventListener('contextmenu', deleteTodo,false); 
    });
    var liItems = document.querySelectorAll('ul li'); // "The Sticky Note Layer" // every todo-text is contained in a li
    [].forEach.call(liItems,function(items){
      items.addEventListener('dragover', handleDragOver, false);
      items.addEventListener('drop', handleDrop, false);
      items.addEventListener('dragenter', handleDragEnter, false); 
      items.addEventListener('dragleave', handleDragLeave, false);  
      items.addEventListener('dblclick',makeContentEditable,false);
    });
    // find blank li's in todoList and mark them for removal
    var listBlanks = document.getElementById('todoList').querySelectorAll('li');
    [].forEach.call(listBlanks,function(items){
      if (items.innerHTML===""){
        items.classList.add('remove');
      }
    });
    // remove blank li's in todoList on refresh
    var removeBlanks = document.getElementsByClassName('remove');
    while(removeBlanks[0]) {removeBlanks[0].parentNode.removeChild(removeBlanks[0]);}  
  } // end this.INIT
} // end listsInit 



  var currentlyDraggedNode; // paragraph element being dragged to set to this var
  //START DRAG AND DROP FUNCTIONS
  function handleDragStart(e) {
    this.style.opacity = '0.4';  // Target (this) element is the source node.
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML); 
		currentlyDraggedNode = this; // this is the paragraph element being dragged			
		currentlyDraggedNode.className = 'isDragged';  
  }
  function handleDragOver(e) {
		EventHelpers.preventDefault(e);     // Necessary. Allows us to drop.
    e.dataTransfer.dropEffect = 'move'; // this might not be necessary...
    return false;
  }
  function handleDragEnter(e) {
    this.classList.add('over');  // this / e.target is the current hover target. add "over" class to hover
  }
  function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
  }  
  function handleDrop(e) {
    // this/e.target is current target element.
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
		currentlyDraggedNode.parentNode.removeChild(currentlyDraggedNode); //remove this node from its old position
		this.appendChild(currentlyDraggedNode); //put it in the new position where it was dropped to
    return false;
  }
  function handleDragEnd(e) {
    this.style.opacity = '1';  // this/e.target is the source node.
		currentlyDraggedNode.className = '';
    var liItems = document.querySelectorAll('ul li'); //remove hover/".over" class when item is dropped
    [].forEach.call(liItems, function (items) {
      items.classList.remove('over');
    });
    save(); // local storage save
  }
  function makeContentEditable(e) {
    this.firstChild.contentEditable=true;
    this.firstChild.classList.add('isEditing');
    this.firstChild.focus();
  }
  function deleteTodo(e){
    this.parentNode.innerHTML="";
    e.preventDefault();
    save();
  }
  
DragDropHelpers.fixVisualCues=true; // for drag and drop (from useragentman)
EventHelpers.addPageLoadEvent('listsDragInit.init'); // initialize on page load (from useragentman)

