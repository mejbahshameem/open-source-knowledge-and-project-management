window.onload = init;
function init() { 

deactivate();


}


function deactivate(){

  //show activating profile loading

  
var hostUrl = getHostUrl();

var token = getToken().token;

const instance = axios.create({
  baseURL: hostUrl,
  timeout: 10000,
  headers: {'Authorization': 'Bearer '+token}
});

  instance.post('/users/deactivate/'+token)
  .then(function (response) { 

    $(".wrapper").hide();
    $(".successwrapper").show();


  }).catch(function (error) {

    $(".wrapper").hide();
    $(".errorwrapper").show();

  })


}
