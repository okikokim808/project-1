// require('app.env').config()

// var meetupEndpoint = API-URL
//tests with Dalton
// var meetupEndpoint = "https://api.meetup.com/topics/?name=cat&key=3b72576a30795b1d47673a2f3f2837"

var authorizationEndpoint ="https://secure.meetup.com/oauth2/authorize"
var accessTokenEndpoint = "https://secure.meetup.com/oauth2/access"


var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"

// var meetupEndpoint = "https://api.meetup.com/find/groups?&photo-host=public&zip=94568&category=1&page=20&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"

checkForLogin();
//OAUTH

// console.log(localStorage)

function fetchGroups(url, cb, data) {
	if(!data) data = [];
	
	$.ajax({
		dataType:'json',
		method:'GET',
        url:meetupEndpoint,
        contentType: 'application/json',
		success:function(result) {
			console.log('back with ' + result.data.length +' results');
			console.dir(result);
			
		}
	});		
}

$(document).ready(function(){

    $.ajax({
        dataType: 'jsonp',
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
    console.log('success ', meetupJSONResponse)
}

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