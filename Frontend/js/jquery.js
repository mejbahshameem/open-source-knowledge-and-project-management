
$(document).ready(function(){

  var hostUrl = getHostUrl();


  var wrongForm = "Something went wrong. Please verify your data.";


  /* The navbar tabs will be shown on click event  */
  $(".nav-tabs a").click(function(){
      $(this).tab('show');
    });



  //remove 'invalid text notification' on key events
    $("#user").keyup(function() {
    $("#userinvalid").text("");
    $("#user").css('border', '1px solid #ced4da');
    $("#forminvalid").text("");
    });
    $("#email").keyup(function() {
    $("#emailinvalid").text("");
    $("#email").css('border', '1px solid #ced4da');
    $("#forminvalid").text("");
    });
    $("#pwd").keyup(function() {
    $("#pwdinvalid").text("");
    $("#pwd").css('border', '1px solid #ced4da');
    $("#forminvalid").text("");
    });
    $("#pwd2").keyup(function() {
    $("#pwdinvalid2").text("");
    $("#pwd2").css('border', '1px solid #ced4da');
    $("#forminvalid").text("");
    });
    $("#workflowname1").keyup(function() {
    $("#invalidWorkflowName").text("");
    });
    $("#workflowdesc1").keyup(function() {
      $("#invalidWorkflowDesc").text("");
    });
    $("#taskstep").keyup(function() {
      $("#taskstepinvalid").text("");
    });
    $("#taskname").keyup(function() {
      $("#tasknameinvalid").text("");
    });
    $("#taskdesc").keyup(function() {
      $("#taskdescinvalid").text("");
    });
    $("#taskdays").keyup(function() {
      $("#taskdaysinvalid").text("");
    });




    $("#createWorkflowModal").click(function(){
      $("#workflowModal").modal();
    });


    $("#editTaskModal").click(function(){
        var taskid = localStorage.getItem('temporaryTask');
        var $form = $("#editTaskForm");
        var step = $form.find( "input[name='taskstep1']" ).val();
      var name = $form.find( "input[name='taskname1']" ).val();
      var description = $form.find( "input[name='taskdesc1']" ).val();
      var daysrequired = $form.find( "input[name='daysrequired1']" ).val();
      
      if(step < 1){
        alert("Please enter a valid task step");
        return;
      }
      if(daysrequired < 0){
        alert("Please enter a valid day");
        return;
      }

      $("#editModal").modal('hide');
      editTask(taskid,step,name,description, daysrequired);
    });


    $("#createWorkflow").click(function(){

      var $form = $("#nameWorkflowForm");
      var workflowname = $form.find( "input[name='workflowname1']" ).val();
      var workflowdesc = $form.find( "input[name='workflowdesc1']" ).val();
      var workflowlocation = $form.find( "input[name='workflowloc1']" ).val();
      
      var access = $('input[name=radioName]:checked', '#myRadios').val()

      if(access === undefined){
         access = "PUBLIC";
      }
    
      if(isEmpty(workflowname)){
          $("#invalidWorkflowName").text("Please provide a name for the workflow.");  
          return;  
      }
      if(isEmpty(workflowdesc)){
          $("#invalidWorkflowDesc").text("Please provide a description for the workflow.");  
          return;  
      }
      

      var jsonAuth = getToken();
      var token = jsonAuth.token;


      const instance = axios.create({
          baseURL: hostUrl,
          timeout: 10000,
          headers: {'Authorization': 'Bearer '+token}
        });
        
        instance.post('/workflow/create', {
          name: workflowname,
          description: workflowdesc,
          location: workflowlocation,
          access: access
        })
        .then(function (response) { 
            //response.data_id;
            //save workflow id in localstorage
            var currentWorkflow = { 'workflowname': workflowname, 'workflowid': response.data._id };
            localStorage.setItem('currentWorkflow', JSON.stringify(currentWorkflow));
            window.location.href = "./createworkflow.html";
            

        }).catch(err => console.log(err))


    });






    $("#editSubmit").click(function(){


      var $form = $("#editSubmitForm"),
      edituser = $form.find( "input[name='edituser']" ).val();
      editpass = $form.find( "input[name='editpass']" ).val();
      editpass2 = $form.find( "input[name='editpass2']" ).val();
      var editArray = {};
      
      if(edituser !== ""){
      editArray.name = edituser;
      }
      
      if(isEmpty(editpass) && !isEmpty(editpass2)){
          alert("Please enter both passwords.");
          return;
      }
      else if(!isEmpty(editpass) && isEmpty(editpass2)){
          alert("Please enter both passwords.");
          return;
      }
      if(!isEmpty(editpass) && !isEmpty(editpass2)){
      if(editpass !== editpass2){
          alert("Passwords do not match!");
          return;
      }
      if(editpass.length < 7 || editpass2.length < 7){
          alert("Password is too short.");
          return;
      }
      editArray.password = editpass;
      editArray.confirmPassword = editpass2;
      }
      
      $(".successUsernameMessage").hide(); 
      $(".errorUsernameMessage").hide(); 

      $("#editSubmit").hide(); 
      $("#loadingEditSubmit").show(); 

      var jsonAuth = getToken();

      var token = jsonAuth.token;

      const instance = axios.create({
          baseURL: hostUrl,
          timeout: 10000,
          headers: {'Authorization': 'Bearer '+token}
        });
        

        instance.patch('/users/me', editArray)
        .then(function (response) { 
          //show success
          $(".successUsernameMessage").show(); 

          $("#editSubmit").show(); 
          $("#loadingEditSubmit").hide(); 

          //save the name
          if(edituser){
            //change display name
          document.getElementById('myname').innerHTML = edituser;
          var jsonAuth = { 'name': edituser, 'token': token };
          localStorage.setItem('jsonAuth', JSON.stringify(jsonAuth));
          }

        }).catch(function (error) {
          //show error
          $(".errorUsernameMessage").show(); 

          $("#editSubmit").show(); 
          $("#loadingEditSubmit").hide(); 
        })
        

    })



            $("#registersubmit").click(function(){

             //get the values of our input fields (email,user and pasword)
                  var $form = $("#registersubmitForm"),
                    email = $form.find( "input[name='email']" ).val();
                    user = $form.find( "input[name='user']" ).val();
                    pass = $form.find( "input[name='pass']" ).val();
                    pass2 = $form.find( "input[name='pass2']" ).val();
        

                    //check the values for validity (empty etc..)

                    if(isEmpty(user) && isEmpty(email) && isEmpty(pass) && isEmpty(pass2)){
                      $("#user").css('border', '1px solid red');
                      $("#email").css('border', '1px solid red');
                      $("#pwd").css('border', '1px solid red');
                      $("#pwd2").css('border', '1px solid red');
                      $("#forminvalid").text("Please fill all the fields.");
                      return;
                    }

                    var regexUser = /^([a-zA-Z0-9])+/;
                    if(isEmpty(user)){
                    $("#userinvalid").text("Please fill out this field.");
                    $("#user").css('border', '1px solid red');
                    return;
                    }
                    else if(user.length < 2){
                    $("#userinvalid").text("Your username is too short.");
                    $("#user").css('border', '1px solid red');
                    return;
                    }
                    else if(!regexUser.test(user)){
                    $("#userinvalid").text("Only use alphanumeric values (A-Z and 0-9)");
                    $("#user").css('border', '1px solid red');
                    return;
                    }
                    
                    if(isEmpty(email)){
                    $("#emailinvalid").text("Please fill out this field.");
                    $("#email").css('border', '1px solid red');
                    return;
                    }
                    else if(!isEmailCorrect(email)){
                    $("#emailinvalid").text("Please check your email address.");
                    $("#email").css('border', '1px solid red');
                    return;
                    }
                    else if(email.length < 6){
                    $("#emailinvalid").text("Your email address is too short.");
                    $("#email").css('border', '1px solid red');
                    return;
                    }

                    if(isEmpty(pass)){
                    $("#pwdinvalid").text("Please fill out this field.");
                    $("#pwd").css('border', '1px solid red');
                    return;
                    }
                    else if(pass.length <= 6){
                    $("#pwdinvalid").text("Your password is too short.");
                    $("#pwd").css('border', '1px solid red');
                    return;
                    }

                    if(isEmpty(pass2)){
                    $("#pwdinvalid2").text("Please fill out this field.");
                    $("#pwd2").css('border', '1px solid red');
                    return;
                    }
                    else if(pass2.length <= 6){
                    $("#pwdinvalid2").text("Your password is too short.");
                    $("#pwd2").css('border', '1px solid red');
                    return;
                    }

                    if(pass2 != pass){
                      $("#pwdinvalid2").text("Passwords do not match.");
                      $("#pwd").css('border', '1px solid red');
                      $("#pwd2").css('border', '1px solid red');
                      return;
                    }


                //submit has been clicked. Now show a load button until we get a response from server
                $("#registersubmit").hide();
                $("#loading").show();


               axios.post(hostUrl+'/users/create', {
                  name: user, password: pass, confirmPassword: pass, email: email
                })
                .then(function (response) {
                  $(".successwrapper").show();
                    $(".container").hide();
                })
                .catch(function (error) {
                    //SHOW ERROR MESSAGE
                    alert("ero");
                    $("#forminvalid").text(wrongForm);
                    
                    $("#registersubmit").show();
                    $("#loading").hide();
                });
                
                

            });



            
            $("#loginsubmit").click(function(){

             var $form = $("#loginsubmitForm"),
             email = $form.find( "input[name='email']" ).val();
             pass = $form.find( "input[name='pass']" ).val();
 
             
             if(isEmpty(email) && isEmpty(pass)){
              $("#emailinvalid").text("Please fill out this field.");
              $("#pwdinvalid").text("Please fill out this field.");
              $("#email").css('border', '1px solid red');
              $("#pwd").css('border', '1px solid red');
              return;
              }

             if(isEmpty(email)){
              $("#emailinvalid").text("Please fill out this field.");
              $("#email").css('border', '1px solid red');
              return;
              }
             else if(!isEmailCorrect(email)){
             $("#emailinvalid").text("Please check your email address.");
             $("#email").css('border', '1px solid red');
             return;
             }

             if(isEmpty(pass)){
             $("#pwdinvalid").text("Please fill out this field.");
             $("#pwd").css('border', '1px solid red');
             return;
             }


             //submit has been clicked. Now show a load button until we get a response from server
             $("#loginsubmit").hide();
             $("#loading").show();



             axios.post(hostUrl+'/users/login', {
             email: email, password:pass
             })
             .then(function (response) {
              var token = response.data.token;
              var uname = response.data.user.name;

              //save token in localstorage
              var jsonAuth = { 'name': uname, 'token': token };
              localStorage.setItem('jsonAuth', JSON.stringify(jsonAuth));

              window.location.href = "./member.html";

              })
              .catch(function (error) {
              //SHOW ERROR MESSAGE
              $("#forminvalid").text(wrongForm);

              $("#loginsubmit").show();
              $("#loading").hide();
        });

  


     });



        });