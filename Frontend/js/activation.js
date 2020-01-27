window.onload = init;
function init() { 

  var urlParams = new URLSearchParams(window.location.search);
  var activationToken = urlParams.get('token');
  activate(activationToken);


}


function activate(activationToken){

  //show activating profile loading

  var hostUrl = getHostUrl();


  const instance = axios.create({
    baseURL: hostUrl,
  });

  instance.get('/user/'+activationToken)
  .then(function (response) { 

    $(".wrapper").hide();
    $(".successwrapper").show();

    window.setTimeout(function(){
      // Move to a new location after 2 seconds
      window.location.href = "./login.html";
    }, 2000);


  }).catch(function (error) {

    $(".wrapper").hide();
    $(".errorwrapper").show();

  })


}
