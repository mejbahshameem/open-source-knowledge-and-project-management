function openSavedWorkflow(elem) {
    var workflowId = elem.getAttribute("dataid");
    localStorage.setItem('followedWorkflow', workflowId);
    window.location.href = "./savedworkflow.html";
}

function fetchSavedWorkflows(){
    showFollowedWorkflows();
}

function showFollowedWorkflows(){

    $(".errorEmptyMessage").hide(); 

    //reinitialize if already loaded before
    $(".card").remove();
    
    var jsonAuth = getToken();
    var token = jsonAuth.token;

    var hostUrl = getHostUrl();

    const instance = axios.create({
        baseURL: hostUrl,
        timeout: 10000,
        headers: {'Authorization': 'Bearer '+token}
      });

      instance.get('/users/me/workflowinstance/following/all')
      .then(function (response) { 
          //loop through the array and build the cards for every workflow
for (var i = 0; i < response.data.length; i++) { 
    $("#home").append("<div class='card'><div class='card-body'><p>"+response.data[i].name+"</p><div class='progress'><div class='progress-bar bg-success' style='width:"+response.data[i].percentage.toFixed(0)+"%'>"+response.data[i].percentage.toFixed(0)+"%</div></div><br><button class='btn btn-info btn-xs btn-danger' dataid="+response.data[i].workflow_instance+" onclick='unfollow(this)'>Unfollow</button><button class='btn btn-info btn-xs btn-edit' dataid="+response.data[i].workflow_instance+" onclick='openSavedWorkflow(this)'>Show Workflow</button></div></div>"); 
}


      })
      .catch(function (error){
        $(".errorEmptyMessage").show(); 
      });

}



function unfollow(elem){

var workflowId = elem.getAttribute("dataid");

  var jsonAuth = getToken();
  var token = jsonAuth.token;
  
var hostUrl = getHostUrl();

  const instance = axios.create({
    baseURL: hostUrl,
    timeout: 10000,
    headers: {'Authorization': 'Bearer '+token}
  });
  

  instance.get('/workflow-instance/'+workflowId+'/unfollow')
    .then(function (response) { 

     location.reload();

    })
    .catch(function (error) {
     
     alert("Unable to unfollow at the moment.");

    });





}