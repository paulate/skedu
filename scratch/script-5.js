var dragSrcEl = null;

function handleDragStart(e) {
  // Target (this) element is the source node.
  this.style.opacity = '0.4';

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

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

  // Don't do anything if dropping the same column we're dragging.
  if (dragSrcEl != this) {
    // Set the source column's HTML to the HTML of the column we dropped on.
    //dragSrcEl.innerHTML = this.innerHTML; //this swaps the content
    this.innerHTML = e.dataTransfer.getData('text/html');
  }

  return false;
}


function handleDragEnd(e) {
  // this/e.target is the source node.
  var items = document.querySelectorAll('ul li');

  [].forEach.call(items, function (items) {
    items.classList.remove('over');
  });
}



var items = document.querySelectorAll('ul li');
[].forEach.call(items, function(items) {
  items.addEventListener('dragstart', handleDragStart, false);
  items.addEventListener('dragenter', handleDragEnter, false);  
  items.addEventListener('dragover', handleDragOver, false);
  items.addEventListener('dragleave', handleDragLeave, false);  
  items.addEventListener('drop', handleDrop, false);
  items.addEventListener('dragend', handleDragEnd, false);
});

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

schedule.insertAdjacentHTML('afterBegin', displayTimeList());

