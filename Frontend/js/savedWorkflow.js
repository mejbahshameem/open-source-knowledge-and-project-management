var hostUrl = getHostUrl();

window.onload = init;


function init() {


    var workflowId = localStorage.getItem('followedWorkflow');


    var jsonAuth = getToken();
    if(jsonAuth === null){
      window.location.href = "./index.html";
      return;
    }
    var token = jsonAuth.token;


    const instance = axios.create({
        baseURL: hostUrl,
        timeout: 10000,
        headers: {'Authorization': 'Bearer '+token}
      });

      instance.get('/following/workflow/'+workflowId+'/tasks/all')
      .then(function (response) { 

        var currentStep = response.data[response.data.length-1].current_step_workflow;

        for (var i = 0; i < response.data.length-1; i++) { 

          var taskID = response.data[i]._id;
          var taskStatus = response.data[i].status;
          var taskStep = response.data[i].step_no;
          var taskNotification = response.data[i].notification;
          var taskName = response.data[i].name;
          var taskDays = response.data[i].days_required;


          if(taskNotification === true){
            var notification = "ON <i class='fa fa-check-square'></i>";
          }
          else {
            var notification = "OFF <i class='fa fa-times-circle'></i>";
          }
        
        if(taskStatus == "COMPLETED" && currentStep == taskStep){
            //if same step and the step is completed then disable all buttons for this step
            $(".data-table tbody").append("<tr><td>"+taskName+"</td><td>"+taskStep+"</td><td>"+taskDays+"</td><td><button class='btn btn-light btn-xs btn-edit disabled'>Start</button><button class='btn btn-danger btn-xs btn-light disabled'>End</button></td><td>Completed</td><td dataid="+taskID+" onclick='notifyTask(this)'>"+notification+"</td></tr>"); 
         }
         else if(taskStatus == "IN_PROGRESS" && currentStep == taskStep){
            //if this step is in progress and current step is this one then show a end button
            $(".data-table tbody").append("<tr><td>"+taskName+"</td><td>"+taskStep+"</td><td>"+taskDays+"</td><td><button class='btn btn-light btn-xs btn-edit disabled'>Start</button><button class='btn btn-danger btn-xs btn-danger' dataid="+taskID+" onclick='endTask(this)'>End</button></td><td>In Progress</td><td dataid="+taskID+" onclick='notifyTask(this)'>"+notification+"</td></tr>"); 
         }
         else if(taskStatus == "NOT_STARTED" && currentStep == taskStep){
            //if this step is not yet started and current step is this one then show a start button
            $(".data-table tbody").append("<tr><td>"+taskName+"</td><td>"+taskStep+"</td><td>"+taskDays+"</td><td><button class='btn btn-info btn-xs btn-edit' dataid="+taskID+" onclick='startTask(this)'>Start</button><button class='btn btn-danger btn-xs btn-light disabled'>End</button></td><td>Not Started</td><td dataid="+taskID+" onclick='notifyTask(this)'>"+notification+"</td></tr>"); 
         }
         else if(taskStatus == "COMPLETED"){
            //if same step and the step is completed then disable all buttons for this step
            $(".data-table tbody").append("<tr><td>"+taskName+"</td><td>"+taskStep+"</td><td>"+taskDays+"</td><td><button class='btn btn-light btn-xs btn-edit disabled'>Start</button><button class='btn btn-danger btn-xs btn-light disabled'>End</button></td><td>Completed</td><td dataid="+taskID+" onclick='notifyTask(this)'>"+notification+"</td></tr>"); 
         }
         else {
            $(".data-table tbody").append("<tr><td>"+taskName+"</td><td>"+taskStep+"</td><td>"+taskDays+"</td><td><button class='btn btn-info btn-xs btn-light disabled'>Start</button><button class='btn btn-danger btn-xs btn-light disabled'>End</button></td><td>Not Started</td><td dataid="+taskID+" onclick='notifyTask(this)'>"+notification+"</td></tr>"); 
         }

        }
         



      })



      getComments();

}


function notifyTask(elem) {
    var taskid = elem.getAttribute("dataid");

  $(".spinner").show(); 
  $("#overlay").show();

  var jsonAuth = getToken();
  var token = jsonAuth.token;
  

  const instance = axios.create({
    baseURL: hostUrl,
    timeout: 10000,
    headers: {'Authorization': 'Bearer '+token}
  });
  
  var workflowId = localStorage.getItem('followedWorkflow');

  instance.post('/following/workflow/'+workflowId+'/task/'+taskid+'/notify', {"task_notification": true})
    .then(function (response) { 
  
      //remove and reload
      $(".data-table td").remove(); 

      init();

      $(".spinner").hide(); 
      $("#overlay").hide();


      //show info modal and hide after 3 seconds
      $("#notifyModal").modal();
      setTimeout(function(){ $("#notifyModal").modal('hide'); }, 3000);
  
  
    }).catch(function (error) {
      $(".spinner").hide(); 
      $("#overlay").hide();
  
    });


    //trigger API call with the taskid to enable/disable notification
    //on success reload table

}




function triggerTask(taskid, action){


  $(".spinner").show(); 
    $("#overlay").show();

    var jsonAuth = getToken();
    var token = jsonAuth.token;
    

    const instance = axios.create({
      baseURL: hostUrl,
      timeout: 10000,
      headers: {'Authorization': 'Bearer '+token}
    });
    
    var workflowId = localStorage.getItem('followedWorkflow');

      instance.post('/following/workflow/'+workflowId+'/task/'+taskid+'/'+action)
      .then(function (response) { 
    
        //remove and reload
        $(".data-table td").remove(); 

        init();

        $(".spinner").hide(); 
        $("#overlay").hide();


    
    
      }).catch(function (error) {
        $(".spinner").hide(); 
        $("#overlay").hide();
    
      });



}


function startTask(elem) {

  var taskid = elem.getAttribute("dataid");
  var action = "start";
  triggerTask(taskid, action);

    //trigger API call with the taskid to start task
    //on success reload table

}

function endTask(elem) {
    var taskid = elem.getAttribute("dataid");
    var action = "end";
    triggerTask(taskid, action);

    //trigger API call with the taskid to end task
    //on success reload table

}



  

function getComments(){


  $(".errorEmptyComments").hide(); 
 

  $(".card").remove(); 

  var jsonAuth = getToken();
  var token = jsonAuth.token;

  const instance = axios.create({
      baseURL: hostUrl,
      timeout: 10000,
      //headers: {'Authorization': 'Bearer '+token}
    });

    var workflowId = localStorage.getItem('followedWorkflow');

    instance.get('/workflow/'+workflowId+'/comments/PRIVATE/all/'+token)
    .then(function (response) { 

      if(response.data.length < 1){
        $(".errorEmptyComments").show(); 
        return;
      }

for (var i = 0; i < response.data.length; i++) { 
  var time = moment(response.data[i].createdAt).fromNow();
  $("#comments").prepend("<div class='card'><div class='card-body'><div style='font-size:18px;font-weight:bold;margin-bottom:10px;'>"+response.data[i].commenter.name+"</div><p>"+response.data[i].comment+"</p><small><i class='fa fa-clock-o'></i> "+time+"</small></div></div>"); 
}


    })
    .catch(function (error){
      $(".errorEmptyComments").show(); 
    });

}






function writeComment(){


  var $form = $("#commentsubmitForm");
  var comment = $('textarea#commentInput').val();

  if(isEmpty(comment)){
    $("#commentInputinvalid").text("Please enter a comment.");  
    return;  
}



$("#commentButton").hide(); 
$("#commentButtonLoad").show();

var jsonAuth = getToken();
    var token = jsonAuth.token;

    const instance = axios.create({
        baseURL: hostUrl,
        timeout: 10000,
        headers: {'Authorization': 'Bearer '+token}
      });
      
      var workflowId = localStorage.getItem('followedWorkflow');

      instance.post('/comment/post', {
        "workflow": workflowId,
        "comment": comment,
        "comment_type": "PRIVATE"
      })
      .then(function (response) { 

        $("#commentButton").show(); 
        $("#commentButtonLoad").hide();

        getComments();
        //reload comments
      })
      .catch(function (error){
        $("#commentButton").show(); 
        $("#commentButtonLoad").hide();
        //show error modal
      })



}



$(document).ready(function(){

//remove error message if new inserted character
  $("#commentInput").keyup(function() {
    $("#commentInputinvalid").text("");
  });

})
