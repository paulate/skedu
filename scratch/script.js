var t = document.getElementById("todo-input"),
    r = document.getElementById("result"),
    stored_r;

// window.onkeyup = save;
// document.onmouseup = save;

document.addEventListener("keypress", function(e) {
  if (document.activeElement == document.body || document.activeElement == null){
    t.focus();
  } 
  else if (e.keyCode == 13) {
      if (document.activeElement == t){
        t.insertAdjacentHTML('beforebegin', '<p contentEditable draggable>'+t.value+'</p>');
        t.value="";
      }
      t.focus();
      t.blur(); //not sure why document.activeElement.blur() doesn't work :\ but this does!
    }
  }, false
);

$(function() {
  $('#result').sortable();
});


function supportsLocalStorage() {
    return ('localStorage' in window) && window['localStorage'] !== null;
}
function save() {
    if (!supportsLocalStorage()) { return false; }
    stored_r = r.innerHTML;
    localStorage["stored.result"] =  stored_r;
    console.log("saving...");
    return true;
}
function resume() {
    if (!supportsLocalStorage()) { return false; }
    stored_r = localStorage["stored.result"];
    if (!stored_r) { return false; }
    r.innerHTML = stored_r;
    return true;
}

// function init(){
//
//     if (!resume()) {
//     }
// }
//
// init();
