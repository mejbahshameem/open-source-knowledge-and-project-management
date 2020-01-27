var hostUrl = getHostUrl();

window.onload = recoverPass;

function recoverPass() {


  var urlParams = new URLSearchParams(window.location.search);
  var token = urlParams.get('token');
  var password = urlParams.get('password');


  const instance = axios.create({
    baseURL: hostUrl,
  });

  instance.get('/user/account/reset', {
    params: {
      "token": token,
      "password": password,
    }
    })
  .then(function (response) { 

    logoutAll(token);


  }).catch(function (error) {

    $(".wrapper").hide();
    $(".errorwrapper").show();

  })


}




function logoutAll(token) {


  const instance = axios.create({
    baseURL: hostUrl,
  });

  instance.post('/users/logoutAll/'+token)
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

