
function openCreatedWorkflow(elem) {
    var workflowId = elem.getAttribute("dataid");
    var workflowname = elem.getAttribute("dataname");

    var currentWorkflow = { 'workflowname': workflowname, 'workflowid': workflowId };
    localStorage.setItem('currentWorkflow', JSON.stringify(currentWorkflow));
    window.location.href = "./createworkflow.html";
}

function fetchCreatedWorkflows(){

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

      instance.get('/user/me/created-workflows/all')
      .then(function (response) { 
          //loop through the array and build the cards for every workflow
          
for (var i = 0; i < response.data.length; i++) { 
    var name = response.data[i].name;
    var id = response.data[i]._id;
    $("#menu2").append("<div class='card' dataid="+id+" dataname="+name+"><div class='card-body'><b>"+name+"</b><p><small><i class='fa fa-arrow-up' style='color:green;'></i> "+response.data[i].up_votes+" <i class='fa fa-arrow-down' style='color:red;'></i> "+response.data[i].down_votes+" <i class='fa fa-users'></i>  "+response.data[i].followers+"</small></p><button class='btn btn-success btn-xs btn-success' dataid="+id+" onclick='follow(this)'>Follow</button><button class='btn btn-info btn-xs btn-info' dataid="+id+" dataname="+name+" onclick='openCreatedWorkflow(this)'>Edit</button><button class='btn btn-info btn-xs btn-danger' dataid="+id+" onclick='deleteCreatedWorkflow(this)'>Delete</button></div></div>"); 
}

      })
      .catch(function (error){
        $(".errorEmptyMessage").show(); 
      });

}




function deleteCreatedWorkflow(elem){
    
 var workflowId = elem.getAttribute("dataid");

    var jsonAuth = getToken();
    var token = jsonAuth.token;
    
    var hostUrl = getHostUrl();

    const instance = axios.create({
      baseURL: hostUrl,
      timeout: 10000,
      headers: {'Authorization': 'Bearer '+token}
    });
    

    instance.delete('/workflow/'+workflowId+'/delete')
      .then(function (response) { 
  
        location.reload();
  
      })
      .catch(function (error) {
        alert("Unable to delete this workflow.");
      });
  
  
}



function follow(elem){

    var workflowId = elem.getAttribute("dataid");


    var jsonAuth = getToken();
    var token = jsonAuth.token;
    
  
    var hostUrl = getHostUrl();

    const instance = axios.create({
      baseURL: hostUrl,
      timeout: 10000,
      headers: {'Authorization': 'Bearer '+token}
    });
    

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
  
      });
  
  
  
  
  
  }