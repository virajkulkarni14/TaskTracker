// Parse JSON data
var taskList = {
  "tasks": [
  {
    "name": "Test Task #1",
    "date": "12/01/2012",
    "assigned": "John Doe"
  },
  {
    "name": "Test Task #2",
    "date": "12/02/2012",
    "assigned": "John Doe"
  },
  {
    "name": "Test Task #3",
    "date": "12/03/2012",
    "assigned": "John Doe"
  },
  {
    "name": "Test Task #4",
    "date": "12/04/2012",
    "assigned": "John Doe"
  },
  {
    "name": "Test Task #5",
    "date": "12/05/2012",
    "assigned": "John Doe"
  },
  {
    "name": "Test Task #6",
    "date": "12/06/2012",
    "assigned": "John Doe"
  },
  {
    "name": "Test Task #7",
    "date": "12/07/2012",
    "assigned": "John Doe"
  }
]
};

var oldTasks = taskList.tasks;
var node = '';
function createNode(data) {
  node += '<tr>';
  node += '<td class="task-name">';
  node += '<b>' + data.name + '</b>' + '     ' + data.date;
  node += '</td>';
  node += '<td class="assignee">';
  node += '<b>' + data.assigned + '</b>';
  node += '</td>';
  node += '</tr>';
  return node;
}
// Store in local storage
// save task to local storage
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// create new task and save to local storage
function saveNewTask(json) {
  var keys = Object.keys(localStorage);
  var lastKey = Number(keys[keys.length-1]);
  saveToLocalStorage((lastKey+1).toString(), json);
  var newTask = localStorage.getItem((lastKey+1).toString());
  var newNode = createNode(newTask);
  $('.list').empty().prepend(newNode);
}
function convertFormToJSON(form) {
  var dataArray = $(form).serializeArray();
  var json = {};

  $.each(dataArray, function() {
    json[this.name] = this.value || '';
  });

  return json;
}

$.each(oldTasks,function(index, value){
  saveToLocalStorage(index, value);
  createNode(value);
});

$(function() {
  $('form#taskForm').on('submit', function(e) {
    e.preventDefault();

    var form = this;
    var jsonData = convertFormToJSON(form);


    $.ajax({
      type: "POST",
      url: "#",
      data: jsonData,
      dataType: "json"
    }).done(function() {
      console.log(jsonData);
      console.log("Inside done");
    }).fail(function() {
      console.log(jsonData);
      console.log("Inside fail");
      createNode(jsonData);
      // node = $('.list').html(node);
      saveNewTask(jsonData);
    });

  });
});
// Load on page with elements
$('.list').html(node);

// prepend task to table
