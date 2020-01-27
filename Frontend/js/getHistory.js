
function fetchHistory() {



  $(".card").remove(); 
      
  $(".errorEmptyHistory").hide(); 
 

  var jsonAuth = getToken();
  var token = jsonAuth.token;

  var hostUrl = getHostUrl();

  const instance = axios.create({
      baseURL: hostUrl,
      timeout: 10000,
      headers: {'Authorization': 'Bearer '+token}
    });

    var workflowId = localStorage.getItem('viewWorkflow');

    instance.get('/user/voting/history')
    .then(function (response) { 

      if(response.data.length < 1){
        $(".errorEmptyHistory").show(); 
        return;
      }

for (var i = 0; i < response.data.length; i++) { 
  if(response.data[i].vote == "UP VOTE"){
    var vote = "<i class='fa fa-arrow-up'></i>";
    $("#menu3").append("<div class='card bg-success text-white'><div class='card-body' dataid="+response.data[i]._id+" onclick='openWorkflow(this)'><div style='font-size:18px;font-weight:bold;margin-bottom:10px;'>"+response.data[i].name+"</div><small>"+vote+" "+response.data[i].vote+"</small></div></div>"); 
  }
  else{
    var vote = "<i class='fa fa-arrow-down'></i>";
    $("#menu3").append("<div class='card bg-danger text-white'><div class='card-body' dataid="+response.data[i]._id+" onclick='openWorkflow(this)'><div style='font-size:18px;font-weight:bold;margin-bottom:10px;'>"+response.data[i].name+"</div><small>"+vote+" "+response.data[i].vote+"</small></div></div>"); 
  }
}


    })
    .catch(function (error){
      $(".errorEmptyHistory").show(); 
    })



  
}


function openWorkflow(elem) {
  var workflowId = elem.getAttribute("dataid");
  
  localStorage.setItem('viewWorkflow', workflowId);
  window.location.href = "./workflow.html";

}

