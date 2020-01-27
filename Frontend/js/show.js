function showTasks() {

  //if response is empty => no tasks have been created yet

  var hostUrl = getHostUrl();

  var currentWorkflow = JSON.parse(localStorage.getItem('currentWorkflow'));
  var workflowId = currentWorkflow.workflowid;

  var jsonAuth = getToken();
  var token = jsonAuth.token;

  const instance = axios.create({
      baseURL: hostUrl,
      timeout: 10000,
      headers: {'Authorization': 'Bearer '+token}
    });
    
    instance.get('/workflow/'+workflowId+'/tasks/all')
    .then(function (response) {
        
      if(response.data === ""){
          $("#myTable").hide();
          return;
      }

      document.getElementById('workflowname').innerHTML = response.data.name;
      if(response.data.location !== "" || response.data.location !== undefined){
      document.getElementById('workflowlocation').innerHTML = '<i class="fa fa-map-marker"></i> '+response.data.location;
      }
      if(response.data.description !== "" || response.data.description !== undefined){
      document.getElementById('workflowdescription').innerHTML = '<i class="fa fa-quote-left"></i> '+response.data.description;
      }
      if(response.data.access === "PRIVATE"){
      document.getElementById('workflowaccess').innerHTML = '<i class="fa fa-lock"></i> '+response.data.access;
      }
      else if(response.data.access === "PUBLIC"){
      document.getElementById('workflowaccess').innerHTML = '<i class="fa fa-unlock-alt"></i> '+response.data.access;
      }


        
      for (var i = 0; i < response.data.tasks.length; i++) { 

$(".data-table tbody").append("<tr><td>"+response.data.tasks[i].step_no+"</td><td>"+response.data.tasks[i].name+"</td><td>"+response.data.tasks[i].description+"</td><td>"+response.data.tasks[i].days_required+"</td><td><button class='btn btn-info btn-xs btn-edit' dataid="+response.data.tasks[i]._id+" onclick='editT(this)'>Edit</button><button class='btn btn-danger btn-xs btn-delete' dataid="+response.data.tasks[i]._id+" onclick='deleteT(this)'>Delete</button></td></tr>"); 

      }

      window.scrollTo(0,document.body.scrollHeight);


    }).catch(err => console.log(err));

}