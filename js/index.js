
var todoTasks = [];
var completedTasks = [];

function appendTask(list, item){
    
    var selectedTag = localStorage.getItem('selected-tag');

    if(selectedTag && ! item.tags.includes(selectedTag)){
        return;
    }

    var button = "";

    button += "<button type='button'"
    button += "class='list-group-item list-group-item-action list-group-item-task'"
    button += "data-task-id='"+item.id+"'"
    button += ">"
    button += item.text
    button += "</button>"

    $(list).append(button);    
}

function appendTag(list, item){

    var button = "";

    var selectedTag = localStorage.getItem('selected-tag');

    if(selectedTag && selectedTag == item.id){
        button += "<li class='list-group-item list-group-item-action list-group-item-tag text-primary'"
    }else{
        button += "<li class='list-group-item list-group-item-action list-group-item-tag'"
    }
    
    button += "data-tag-id='"+item.id+"'"
    button += ">"
    button += item.name
    button += "</li>"

    $(list).append(button);
}

function updateTasks(){

    $(".list-todo").html("");
    $(".list-done").html("");

    $.each(todoTasks, function(i, item){
        appendTask(".list-todo", item)
    })

    $.each(completedTasks, function(i, item){
        appendTask(".list-done", item)
    })
}

$(function(){

    var userId = localStorage.getItem('user-id');
    var apiToken = localStorage.getItem('api-token');

    if(!userId || !apiToken){
        window.location.href = "/habitica-gtd/login.html"
    }

    var selectedTag = localStorage.getItem('selected-tag');

    if(selectedTag){
        $(".list-group-item-tag").removeClass("text-primary");
    }


    getTodoList(function(result){
       
        if(result.success){

            todoTasks = result.data;

            updateTasks();
        }
    });

    getCompletedTodoList(function(result){
        
        if(result.success){
            
            completedTasks = result.data;

            updateTasks();
        }
    });

    getUserTags(function(result){
       
        $.each(result.data, function(i, item){
            appendTag(".list-tags", item)
        })
    })
   

    $(".list-tags").on('click', ".list-group-item-tag", function(){

        var selectedTag = $(this).data("tag-id");

        localStorage.setItem('selected-tag', selectedTag);

        updateTasks();

        $(".list-group-item-tag").removeClass("text-primary");

        $(this).addClass("text-primary")
    });


    $(".list-todo").on('click', ".list-group-item", function(){

        var taskId = $(this).data("task-id");

        markAsDone(taskId, function(){
            location.reload()
        })
    });

    $(".list-done").on('click', ".list-group-item", function(){

        var taskId = $(this).data("task-id");

        markAsToDo(taskId, function(){
            location.reload()
        })
    });


    $(".form-new-task").submit(function(event){
        event.preventDefault()

        var taskName = $('#task-name').val();
        
        if(!taskName || $.trim(taskName) === ""){
            alert("The name is required");
            return false;
        }
        
        var selectedTag = localStorage.getItem('selected-tag');

        saveNewTask(taskName, selectedTag,  function(){
            location.reload()
        });

        return false;
    })

    $.contextMenu({
        menuTarget: ".list-group-item-task",
        menuSelector: "#contextMenu",
        menuSelected: function (invokedOn, selectedMenu) {

            var taskId = invokedOn.data("taskId");

            if($(selectedMenu).hasClass("btn-remove")){
            
                if(confirm("Are you sure you want to delete this task?")){
                    removeTask(taskId, function(){
                        location.reload()
                    });
                }
            }
        }
    });
});
