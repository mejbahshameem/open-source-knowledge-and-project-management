window.onload = init;
function init() { 

  var urlParams = new URLSearchParams(window.location.search);
  var activationToken = urlParams.get('token');
  deactivate(activationToken);


}


function deactivate(activationToken){

  //show activating profile loading

  var hostUrl = getHostUrl();

var token = activationToken;

const instance = axios.create({
  baseURL: hostUrl,

});

  instance.post('/deactivate/'+token)
  .then(function (response) { 

    $(".wrapper").hide();
    $(".successwrapper").show();


  }).catch(function (error) {

    $(".wrapper").hide();
    $(".errorwrapper").show();

  })


}
