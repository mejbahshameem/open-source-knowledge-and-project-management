var hostUrl = getHostUrl();

window.onload = initView;


var ownertoken = null;
var newworkflowId = null;
var thisworkflowName = null;


function initView() {


  getComments();

  $(".dashboard").hide();

  $(".enabledButtons").hide();
  $(".disabledButtons").hide();


  var jsonAuth = getToken();
  if(jsonAuth == null || !jsonAuth){
    $(".disabledButtons").show();
    $(".dashboard").hide();
    $(".loginregister").show();

  }
  else{

  
  var token = jsonAuth.token;

  const inst = axios.create({
      baseURL: hostUrl,
    });

    inst.get('/user/'+token)
    .then(function (response) { 
      $(".enabledButtons").show();

      $(".dashboard").show();
      $(".loginregister").hide();
    }).catch(function (err) { 
      $(".disabledButtons").show();

      $(".dashboard").hide();
      $(".loginregister").show();

    })

  }

  $("#spinnerLoader").show();

  $("#buttonGroup").hide();
  

  //get the wrofklowId
  var workflowId = localStorage.getItem('viewWorkflow');
  



  const instance = axios.create({
      baseURL: hostUrl,
      timeout: 10000
    });

    instance.get('/workflow/'+workflowId+'/view')
    .then(function (response) { 
      $(".table").show();
      $(".noWorkflow").hide();

      $("#buttonGroup").show();
      $("#spinnerLoader").hide();

      thisworkflowName = response.data.name;

      $(".wflowName").text(response.data.name); 
      $(".wflowDescription").text(response.data.description);  
      
      $("#upvotesShow").html("<i class='fa fa-arrow-up' style='color:green;'></i> "+response.data.up_votes);
      $("#downvotesShow").html("<i class='fa fa-arrow-down' style='color:red;'></i> "+response.data.down_votes);
      $("#followersShow").html("<i class='fa fa-users'></i> "+response.data.followers);

      ownertoken = response.data.owner;

      if(response.data.tasks.length < 1) {
        //hide table and show "no workflow" info
        $(".table").hide();
        $(".noWorkflow").show();
      }


      for (var i = 0; i < response.data.tasks.length; i++) { 

        var taskName = response.data.tasks[i].name;
        var taskDescription = response.data.tasks[i].description;
        var taskDays = response.data.tasks[i].days_required;
        var step = response.data.tasks[i].step_no;

        $(".data-table tbody").append("<tr><td>"+step+"</td><td>"+taskName+"</td><td>"+taskDescription+"</td><td>"+taskDays+"</td><td></tr>"); 

      }




    })



}






function follow(){



  var jsonAuth = getToken();
  var token = jsonAuth.token;
  

  const instance = axios.create({
    baseURL: hostUrl,
    timeout: 10000,
    headers: {'Authorization': 'Bearer '+token}
  });
  
  var workflowId = localStorage.getItem('viewWorkflow');

  instance.post('/workflow/'+workflowId+'/follow')
    .then(function (response) { 

      //show success and redirect to member page
      $("#successFollowing").modal();
      setTimeout(function(){ 
      $("#successFollowing").modal('hide'); 
      window.location.href = "./member.html";
      }, 3000);

    })
    .catch(function (error) {
     
      //show info
      $("#notifyModal").modal();
      setTimeout(function(){ $("#notifyModal").modal('hide'); }, 3000);

    })





}



function unfollow(){



  var jsonAuth = getToken();
  var token = jsonAuth.token;
  

  const instance = axios.create({
    baseURL: hostUrl,
    timeout: 10000,
    headers: {'Authorization': 'Bearer '+token}
  });
  
  var workflowId = localStorage.getItem('viewWorkflow');

  instance.get('/workflow-instance/'+workflowId+'/unfollow')
    .then(function (response) { 

     alert("Successfully unfollowed");

    })
    .catch(function (error) {
     
      //show info
      $("#notifyModal").modal();
      setTimeout(function(){ $("#notifyModal").modal('hide'); }, 3000);

    })





}




function upvote(){
var type = "UP_VOTE";
vote(type);
}

function downvote(){
  var type = "DOWN_VOTE";
  vote(type);
}


function vote(type){



  var jsonAuth = getToken();
  var token = jsonAuth.token;
  

  const instance = axios.create({
    baseURL: hostUrl,
    timeout: 10000,
    headers: {'Authorization': 'Bearer '+token}
  });
  
  var workflowId = localStorage.getItem('viewWorkflow');

  instance.post('/workflow/'+workflowId+'/vote',{
    vote: type
  })
    .then(function (response) { 

      $("#successVote").modal();
      setTimeout(function(){ $("#successVote").modal('hide'); }, 3000);

    })
    .catch(function (error) {

      //error could be displayed here.

    })

}







function edit(){


  var jsonAuth = getToken();
  var token = jsonAuth.token;

  const instance = axios.create({
    baseURL: hostUrl,
    timeout: 10000
  });

  instance.get('/match/'+token+'/'+ownertoken)
    .then(function (response) { 

      if(response.data.matched_user === true){
        //redirect to normal edit page
        var workflowId = localStorage.getItem('viewWorkflow');
        var currentWorkflow = { 'workflowname': thisworkflowName, 'workflowid': workflowId };
        localStorage.setItem('currentWorkflow', JSON.stringify(currentWorkflow));
        window.location.href = "./createworkflow.html";
      }
      else{
        //show input name, description, access, location
         //save copy with request body
          //redirect to edit page

          copyWorkflow();
          $("#editModal").modal();

      }

    })
    .catch(function (error) {
      //show input name, description, access, location
         //save copy with request body
          //redirect to edit page

          copyWorkflow();
          $("#editModal").modal();

    })
  }



function copyWorkflow(){

  
  var jsonAuth = getToken();
  var token = jsonAuth.token;

  var workflowId = localStorage.getItem('viewWorkflow');

  const instance = axios.create({
    baseURL: hostUrl,
    timeout: 10000,
    headers: {'Authorization': 'Bearer '+token}
  });

  instance.post('/workflow/'+workflowId+'/copy')
    .then(function (response) { 
      //copy worked - fetch the new workflow id and continue
      newworkflowId = response.data._id;
    })
    .catch(function (error) {
      //oops error
    })


}

  function saveChanges(){


  
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

    var access = $('input[name=radioName]:checked', '#myRadios').val()

    if(access == undefined){
      $("#invalidAccess").text("Please select Public or Private.");  
      return;
    }


    if(isEmpty(workflowname)){
        $("#invalidWorkflowName").text("Please provide a name for the workflow.");  
        return;  
    }
    if(isEmpty(workflowdesc)){
        $("#invalidWorkflowDesc").text("Please provide a description for the workflow.");  
        return;  
    }
    if(isEmpty(workflowlocation)){
      $("#invalidWorkflowLocation").text("Please provide a location for the workflow.");  
      return;  
  }
    


    instance.patch('/workflow/'+newworkflowId+'/edit', {
      "name": workflowname,
      "description": workflowdesc,
      "location": workflowlocation,
      "access": access,
    })
      .then(function (response) { 
        var copiedWorkflow = response.data._id;
        //redirect to edit page with the newworkflowId
        var currentWorkflow = { 'workflowname': workflowname, 'workflowid': response.data._id };
            localStorage.setItem('currentWorkflow', JSON.stringify(currentWorkflow));
            window.location.href = "./createworkflow.html";

      })
      .catch(function (error) {
        //oops error
      })

    }














    function getComments(){


      $(".card").remove(); 
      
      $(".errorEmptyComments").hide(); 
     
    
    
      const instance = axios.create({
          baseURL: hostUrl,
          timeout: 10000,
          //headers: {'Authorization': 'Bearer '+token}
        });
    
        var workflowId = localStorage.getItem('viewWorkflow');
    
        instance.get('/workflow/'+workflowId+'/comments/PUBLIC/all')
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
        })
    
    }
    
    
    
    
    
    
    function writeComment(){
    
    
      var $form = $("#commentsubmitForm");
      var comment = $('textarea#commentInput').val();
    
      if(isEmpty(comment)){
        $("#commentInputinvalid").text("Please enter a comment.");  
        return;  
    }
    
    
    
    var jsonAuth = getToken();
    if(jsonAuth == null || !jsonAuth){
      return;
    }
        var token = jsonAuth.token;
    
    
    $("#commentButton").hide(); 
    $("#commentButtonLoad").show();
    
    
        const instance = axios.create({
            baseURL: hostUrl,
            timeout: 10000,
            headers: {'Authorization': 'Bearer '+token}
          });
          
          var workflowId = localStorage.getItem('viewWorkflow');
    
          instance.post('/comment/post', {
            "workflow": workflowId,
            "comment": comment,
            "comment_type": "PUBLIC"
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




      //for testing
module.exports.writeComment = writeComment;
module.exports.saveChanges = saveChanges;
