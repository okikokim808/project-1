// require('app.env').config()

var authorizationEndpoint ="https://secure.meetup.com/oauth2/authorize"
var accessTokenEndpoint = "https://secure.meetup.com/oauth2/access"

// var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"


checkForLogin();
//OAUTH
function fetchGroups(url, cb, data) {
	if(!data) data = [];
	
	$.ajax({
		dataType:'json',
<<<<<<< HEAD
		method:'GET',
        url:meetupEndpoint,
=======
		method:'get',
        url:"meetupEndpoint",
>>>>>>> 59778e7726ca5b23590aa9ec156fe90c349765bb
        contentType: 'application/json',
		success:function(result) {
			console.log('back with ' + result.data.length +' results');
			console.dir(result);	
		}
	});		
}

//move to Profile Page

$(document).ready(function(){
    console.log('in app.js')
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: meetupEndpoint,
        success: onSuccess,
        error: function(response){
            console.log('Error:' + response)
        }
    })
})//end doc.ready
function onSuccess(response){
    var meetupJSONResponse = response.results;
    $('#meetupList').append(meetupJSONResponse[0].description);
    // console.log('success ', meetupJSONResponse)
}

<<<<<<< HEAD
$('#signup').on('click', (e) => {
    e.preventDefault();
    console.log('clicked');
    $.ajax({
        method: 'POST',
        data: json = $('signupForm').serialize(),
        success: searchPage(json),
        error: console.log(error)
    })
})

function searchPage(json){
    console.log(json);
    localStorage.setItem('token', json.token);
}

$('#signupForm').on('submit', submitSignup)

// $('#loginForm').on('submit', submitLogin)

function checkForLogin(){
    if(localStorage.length > 0){
      var json = $('signupForm').serialize();
      let jwt = json.token
      console.log(jwt)
      $.ajax({
        type: "POST", //GET, POST, PUT
        url: '/verify',  
        beforeSend: function (xhr) {   
            xhr.setRequestHeader("Authorization", 'Bearer '+ jwt);
        }
      }).done(function (response) {
        console.log(response)
        user = { email: response.email, _id: response._id }
        console.log("you can access variable user: " , user)
      }).fail(function (err) {
          console.log(err);
      })
    } 
  }
  console.log($('signupForm').serialize.token)
  function submitSignup(e){
    e.preventDefault();
    let userData = $(this).serialize()
    $.ajax({
      method: "POST",
      url: "/signup",
      data: userData,
      error: function signupError(e1,e2,e3) {
        console.log(e1);
        console.log(e2);
        console.log(e3);
      },
      success: function signupSuccess(json) {
        console.log(json);
        user = {email: json.result.email, _id: json.result._id}
        localStorage.token = json.signedJwt;
        $('#signupForm').toggleClass('show');
        $('#noToken').toggleClass('show');
        checkForLogin();
  
      }
    })
  }
=======
$('#signUpBtn').on('click',function(){ 
    //TODO: SEE IF PASSWORDS MATCH 
    let data = {
        username: $('#subName').val(),
        email: $('#subEmail').val(),
        password:$('#subPass').val(),
        interests:[]
    }
    
    Cookies.set("username", $('#subName').val());
    console.log("cookie", Cookies.get('username')); // => 'value') 

    $.ajax({
        method: "POST",
        url: "/signup",
        data: data,
        success: function(response){
            console.log(JSON.stringify(response))
        },
        error: function(response){
            console.log("error", JSON.stringify(response))
        },
    })
})
>>>>>>> 59778e7726ca5b23590aa9ec156fe90c349765bb
