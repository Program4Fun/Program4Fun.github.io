$(document).ready(function(){
  var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  window.onbeforeunload = function(event) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    return;
  };

  for (var task of tasks) {
    addTask(task);
  }

  function addTask(task) {
    // Create li with the title.
    var li = document.createElement('li');
    var t = document.createTextNode(task.title);
    li.dataset.value = task.title;
    li.appendChild(t);

    // Add the x sign at the right of the li.
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    // Assign onclick event to the x sign.
    span.onclick = function() {
      var v = $(this).parent().attr('data-value');
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].title === v) {
          tasks.splice(i, 1);
          break;
        }
      }

      $(this).parent().remove();
    }

    if (task.done)
      li.classList.toggle('checked');

    // Add the final li to the tasks list and the title to the tasks array.
    $("#tasks").append(li);
  }

  function newTask() {
    var input = $("#newTaskInput");
    var title = $(input).val();
    var obj = {title:title, done:false};
    tasks.push(obj);
    addTask(obj);
    input.val('');
  }

  $(".addTaskBtn").on('click', newTask);

  // Add a "checked" symbol when clicking on a list item
  $("#tasks").on('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
      for (var task of tasks) {
        if (task.title === $(ev.target).attr('data-value')) {
          task.done = !task.done;
        }
      }
    }
  });
});

/*// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newTask() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("newTaskInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("tasks").appendChild(li);
  }
  document.getElementById("newTaskInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}*/