//initialize page count (for pagination)
var page = 0;
var sortSearch = "";
var hostUrl = getHostUrl();
window.onload = init;
function init() {

checkLoggedin();
getPopularPicks();
  
}


function checkLoggedin(){

  $(".dashboard").hide();

  var jsonAuth = getToken();
  if(jsonAuth === null){
    return;
  }
  var token = jsonAuth.token;


  const inst = axios.create({
      baseURL: hostUrl,
    });

    inst.get('/user/'+token)
    .then(function (response) { 

      $(".dashboard").show();
      $(".loginregister").hide();
    }).catch(function (err) { 

      $(".dashboard").hide();
      $(".loginregister").show();

    });

}



function getPopularPicks(){

  $(".popularPicks").show();

  const instance = axios.create({
      baseURL: hostUrl,
    });
    
    //instance.get('/search?"interest"="Getting visa"&"location"="saarbrucken"')
    instance.get('/workflows/popular')
    .then(function (response) { 

      for (var i = 0; i < response.data.length; i++) { 
        $("#home").append("<div class='card' dataid="+response.data[i].workflow+" onclick='openWorkflow(this)'><div class='card-body'><p>"+response.data[i].name+" <span class='badge badge-success badge-pill' style='float:right;'>"+response.data[i].upvotes+"</span></p></div></div>"); 
    }

  });


}

function loadMore(){
  //removing the load more button
  $(".loadMore").remove();
  
  var $form = $("#searchFormContainer");
  var search = $form.find( "input[name='search']" ).val();
  var location = $form.find( "input[name='location']" ).val();

  const instance = axios.create({
      baseURL: hostUrl,
    });
    
    //instance.get('/search?"interest"="Getting visa"&"location"="saarbrucken"')
    instance.get('/search', {
      params: {
        "interest": search,
        "location": location,
       
        "sortBy":sortSearch,
        "limit":"8",
        "skip":page
        
      }
    })
    .then(function (response) { 


      if(response.data.length < 1){
        $(".searchWrapper").show();
        $(".container").hide();
        $(".emptyResult").show();
        return;
      }

      for (var i = 0; i < response.data.length; i++) { 
        $("#home").append("<div class='card' dataid="+response.data[i]._id+" onclick='openWorkflow(this)'><div class='card-body'><b>"+response.data[i].name+"</b><p style='font-weight:200' >"+response.data[i].description+"</p><p style='color:grey'><i class='fa fa-map-marker'></i> "+response.data[i].location+"</p></div></div>"); 
    }

    //we increment the page by as much as we set the limit. So if limit is 2, the page increment is +2.
    page = +page +8;
    $("#home").append("<div class='loadMore'><div class='col text-center'><button class='btn btn-lg btn-info' onclick='loadMore()' >Load More</button></div></div>");


    $(".searchWrapper").show();
    $(".container").hide();
    


    })
    .catch(function (error){
      //error
      $(".emptyResult").show();
    });



}

function triggerSearch() {



  var $form = $("#searchFormContainer");
  var search = $form.find( "input[name='search']" ).val();
  var location = $form.find( "input[name='location']" ).val();


  if(isEmpty(search)){
    return;
  }


    //collapse search and show results. if click on search again, scroll up and show it

    $(".popularPicks").hide();

    $(".card").remove();

    var checkBox = document.getElementById("sortCheck");

    if (checkBox.checked === true){
      sortSearch = "up_vote";
    }
    else{
      sortSearch = "";
    }


  const instance = axios.create({
      baseURL: hostUrl,
    });
    
    //instance.get('/search?"interest"="Getting visa"&"location"="saarbrucken"')
    instance.get('/search', {
      params: {
        "interest": search,
        "location": location,
       
        "sortBy":sortSearch,
        "limit":"8",
        "skip":page
        
      }
    })
    .then(function (response) { 


      $("#search").val(search);
      $("#collapsedSearch").val(search);

      if(response.data.length < 1){
        $(".searchWrapper").show();
        $(".container").hide();
        $(".emptyResult").show();
        return;
      }

      for (var i = 0; i < response.data.length; i++) { 
        $("#home").append("<div class='card' dataid="+response.data[i]._id+" onclick='openWorkflow(this)'><div class='card-body'><b>"+response.data[i].name+"</b><p style='font-weight:200' >"+response.data[i].description+"</p><p style='color:grey'><i class='fa fa-map-marker'></i> "+response.data[i].location+"</p></div></div>"); 
    }


    //we increment the page by as much as we set the limit. So if limit is 2, the page increment is +2.
    page = +page +8;
    $("#home").append("<div class='loadMore'><div class='col text-center'><button class='btn btn-lg btn-info' onclick='loadMore()' >Load More</button></div></div>");

    $(".searchWrapper").show();
    $(".container").hide();
    


    })
    .catch(function (error){
      //error
      $(".emptyResult").show();
    });


}


function newSearch(){
  $(".searchWrapper").hide();
  $(".container").show();
  $(".card").remove();
  $(".emptyResult").hide();
  $(".loadMore").remove();
  $("#collapsedSearch").val("");

  page = 0;
  $(document).ready(function(){
    $(window).scrollTop(50);
});
}



function openWorkflow(elem) {
  var workflowId = elem.getAttribute("dataid");
  
  localStorage.setItem('viewWorkflow', workflowId);
  window.location.href = "./workflow.html";


}