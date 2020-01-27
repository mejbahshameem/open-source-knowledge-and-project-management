var hostUrl = getHostUrl();

window.onload = init;

function init(){
var currentWorkflow = JSON.parse(localStorage.getItem('currentWorkflow'));
var jsonAuth = JSON.parse(localStorage.getItem('jsonAuth'));

if(!jsonAuth || jsonAuth === null){
    //check if we have a currently set a name/token, if not => send to index
 window.location.href = "./index.html";
}
else if(!currentWorkflow || currentWorkflow === null){
    //check if we have a current workflow id. if not, redirect to members page
 window.location.href = "./member.html";
}
else{
    //we will show current tasks in a table (if there are any)
    showTasks();
}
}


function editT(elem) {
    var taskid = elem.getAttribute("dataid");
    localStorage.setItem('temporaryTask', taskid);

    document.getElementById("taskdesc1").value = "";
    document.getElementById("taskname1").value = "";

    $("#editModal").modal();
    //save temporary task id

}
function deleteT(elem) {
    deleteTask(elem);
}



function deleteTask(elem) {

    var taskid = elem.getAttribute("dataid");

    var currentWorkflow = JSON.parse(localStorage.getItem('currentWorkflow'));
    var workflowid = currentWorkflow.workflowid;

    var jsonAuth = getToken();
    var token = jsonAuth.token;


    const instance = axios.create({
        baseURL: hostUrl,
        timeout: 10000,
        headers: {'Authorization': 'Bearer '+token}
      });

      instance.delete('/workflow/'+workflowid+'/tasks/'+taskid)
      .then(function (response) { 
          
        $("#myTable").show(); //show table 

        //deletes from table
        var i = elem.parentNode.parentNode.rowIndex;
        document.getElementById("myTable").deleteRow(i);

        var rows = document.getElementById("myTable").rows.length; 
        if(rows < 2){
            //hide the table if no rows
            $("#myTable").hide(); 
        }

      }).catch(err => console.log(err));

}


function editTask(taskid, taskstep, taskname, taskdescription, days_required) {
    
    var currentWorkflow = JSON.parse(localStorage.getItem('currentWorkflow'));
    var workflowid = currentWorkflow.workflowid;

    var jsonAuth = getToken();
    var token = jsonAuth.token;

    const instance = axios.create({
        baseURL: hostUrl,
        timeout: 10000,
        headers: {'Authorization': 'Bearer '+token}
      });
      
      //check if name or description is empty and only send those who are not empty
        var editArr = {};
        if(taskname !== ""){
        editArr.name = taskname;
        }
        if(taskdescription !== ""){
        editArr.description = taskdescription;
        }
        if(taskstep !== ""){
        editArr.step_no = taskstep;
        }
        if(days_required !== ""){
        editArr.days_required = days_required;
        }
        
        if(editArr == {} || editArr.length < 1){
            alert("All fields are empty.");
            return;
        }

      instance.patch('/workflow/'+workflowid+'/tasks/'+taskid, editArr)
      .then(function (response) { 
          

        $(".data-table td").remove(); 
        showTasks();

        
      }).catch(err => console.log(err));

}







function taskCreateFunction() {

    var $form = $("#tasksubmitForm");
    var taskstep = $form.find( "input[name='taskstep']" ).val();
    var taskname = $form.find( "input[name='taskname']" ).val();
    var taskdesc = $('textarea#taskdesc').val();
    var taskdays = $form.find( "input[name='taskdays']" ).val();

    if(isEmpty(taskstep)){
        $("#taskstepinvalid").text("Please provide a step for the task.");  
        return;  
    }
    if(taskstep < 1){
        $("#taskstepinvalid").text("Please provide a valid step. (Number starting from 1)");  
        return;  
    }
    if(taskdays < 0){
        alert("Wrong day number. Must be 0 or greater.");
        return;  
    }
    else if(isEmpty(taskname)){
        $("#tasknameinvalid").text("Please provide a name for the task.");  
        return;  
    }
    else if(isEmpty(taskdesc)){
        $("#taskdescinvalid").text("Please provide a description for the task.");  
        return;  
    }
    else if(isEmpty(taskdays)){
        $("#taskdaysinvalid").text("Please provide the days required for this task.");  
        return;  
    }


    var currentWorkflow = JSON.parse(localStorage.getItem('currentWorkflow'));

    var jsonAuth = getToken();
    var token = jsonAuth.token;

    const instance = axios.create({
        baseURL: hostUrl,
        timeout: 10000,
        headers: {'Authorization': 'Bearer '+token}
      });
      
      instance.post('/workflow/tasks/create', {
        name: taskname,
        description: taskdesc,
        step_no: taskstep,
        days_required: taskdays,
        workflow: currentWorkflow.workflowid
        //workflow id is from localstorage
      })
      .then(function (response) { 
          //response._id => task id

          $("#myTable").show(); //show table
        $(".data-table tbody").append("<tr><td>"+taskstep+"</td><td>"+taskname+"</td><td>"+taskdesc+"</td><td>"+taskdays+"</td><td><button class='btn btn-info btn-xs btn-edit' dataid="+response.data._id+" onclick='editT(this)'>Edit</button><button class='btn btn-danger btn-xs btn-delete' dataid="+response.data._id+" onclick='deleteT(this)'>Delete</button></td></tr>"); 

        document.getElementById("taskname").value = " ";
        document.getElementById("taskdesc").value = " ";
        
        //scroll to bottom
        window.scrollTo(0,document.body.scrollHeight);
        
        //show saved 
        $("#successSaved").modal();
        setTimeout(function(){ 
        $("#successSaved").modal('hide'); 
        }, 3000);
  

      }).catch(err => console.log(err));



  }




  function workflowEdit(){
    $("#editWorkflowModal").modal();
  }


  function saveWorkflowChanges(){

    var jsonAuth = getToken();
    var token = jsonAuth.token;
  

    const instance = axios.create({
      baseURL: hostUrl,
      timeout: 10000,
      headers: {'Authorization': 'Bearer '+token}
    });
  



    var $form = $("#nameWorkflowForm");
    var workflowname = $form.find( "input[name='workflowname1']" ).val();
    var workflowdesc = $form.find( "input[name='workflowdesc1']" ).val();
    var workflowlocation = $form.find( "input[name='workflowlocation1']" ).val();

    var access = $('input[name=radioName]:checked', '#myRadios').val();

/*
    if(access === undefined){
      access = "PUBLIC";
    }


    if(isEmpty(workflowname)){
        alert("Please provide a name for the workflow");
        return;  
    }
    if(isEmpty(workflowdesc)){
        alert("Please provide a description for the workflow.");
        return;  
    }
    if(isEmpty(workflowlocation)){
        alert("Please provide a location for the workflow.");
        return;  
    }
    */
            var savedEditArray = {};
        if(workflowname !== ""){
        savedEditArray.name = workflowname;
        }
        if(workflowdesc !== ""){
        savedEditArray.description = workflowdesc;
        }
        if(workflowlocation !== ""){
        savedEditArray.location = workflowlocation;
        }
        if(access !== ""){
        savedEditArray.access = access;
        }
        
        if(savedEditArray == {} || savedEditArray.length < 1){
            alert("All fields are empty.");
            return;
        }

  var currentWorkflow = JSON.parse(localStorage.getItem('currentWorkflow'));

    instance.patch('/workflow/'+currentWorkflow.workflowid+'/edit', savedEditArray)
      .then(function (response) { 
        //reload
        $("#editWorkflowModal").modal("hide");

      document.getElementById('workflowname').innerHTML = response.data.name;
      document.getElementById('workflowlocation').innerHTML = '<i class="fa fa-map-marker"></i> '+response.data.location;
      document.getElementById('workflowdescription').innerHTML = '<i class="fa fa-quote-left" style="font-size:12px;"></i> '+response.data.description;
      
      document.getElementById('workflowaccess').innerHTML = '<i class="fa fa-unlock-alt"></i> '+response.data.access;
        
      })
      .catch(function (error) {
        //oops error
      })


  }

  
  

        /*
    module.exports = isEmpty;
    module.exports = isEmailCorrect;
    */

  
