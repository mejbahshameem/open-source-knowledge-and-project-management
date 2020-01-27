function submitPass() {

  var $form = $("#forgotForm");
  var email = $form.find( "input[name='email']" ).val();
  var pass = $form.find( "input[name='pass']" ).val();
  var pass2 = $form.find( "input[name='pass2']" ).val();

  if(isEmpty(email)){
      $("#invalidemail").text("Please provide a name for the workflow.");  
      return;  
  }
  if(!isEmailCorrect(email)){
      $("#invalidemail").text("Please provide a valid email address.");  
      return;  
  }
  if(isEmpty(pass)){
      $("#invalidpass").text("Please provide a description for the workflow.");  
      return;  
  }
  if(isEmpty(pass2)){
    $("#invalidpass2").text("Please provide a description for the workflow.");  
    return;  
}
  
$("#loading").show();
$("#submitpass").hide();

  var hostUrl = getHostUrl();

  const instance = axios.create({
      baseURL: hostUrl,
      timeout: 10000,
    });
    
    instance.post('/user/account/forget/password', {
      email: email,
      password: pass,
      confirmPassword: pass2
    })
    .then(function (response) { 
        
      $("#emailpassBox").hide();
      $(".successwrapper").show();
        

    }).catch(function (error) {

      $("#loading").hide();
      $("#submitpass").show();
      
  
    });




}

//for testing purposes
module.exports.submitPass = submitPass;