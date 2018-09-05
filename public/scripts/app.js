// require('app.env').config()

var authorizationEndpoint ="https://secure.meetup.com/oauth2/authorize"
var accessTokenEndpoint = "https://secure.meetup.com/oauth2/access"

var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"


checkForLogin();
//OAUTH
function fetchGroups(url, cb, data) {
	if(!data) data = [];
	
	$.ajax({
		dataType:'json',
		method:'get',
        url:meetupEndpoint,
        contentType: 'application/json',
		success:function(result) {
			console.log('back with ' + result.data.length +' results');
			console.dir(result);	
		}
	});		
}

//move to Profile Page

$(document).ready(function(){
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

$('#signUpBtn').on('click',function(e){ 
    //TODO: SEE IF PASSWORDS MATCH 
    e.preventDefault();
    let data = {
        username: $('#subName').val(),
        email: $('#subEmail').val(),
        password:$('#subPass').val(),
        interests:[]
    }
    console.log(data);

    // Cookies.set("username", $('#subName').val());
    // console.log("cookie", Cookies.get('username')); // => 'value') 

    $.ajax({
        method: "POST",
        url: "/signup",
        data: data,
        success: function(response){
            console.log(response)
            localStorage.token = response.token
            checkForLogin();
            window.location.replace('/interests')
        },
        error: console.log(data)
    })
})
$('#loginForm').on('submit',function(e){
    e.preventDefault();
    console.log("LOGIN FORM SUBMITTED")
    let userData = $(this).serialize()
    $.ajax({
      method: "POST",
      url: "/login",
      data: userData,
    }).done(function signupSuccess(json) {
      console.log("LOG IN SUCCESSFUL")
      console.log(json);
      localStorage.token = json.token;
      checkForLogin();
      console.log(localStorage.token);
      console.log(localStorage)
      window.location.replace('/profile');
    }).fail(function signupError(e1,e2,e3) {
      console.log(e2);
    })
})
function checkForLogin(){
    if(localStorage.length > 0){
      let jwt = localStorage.token
      $.ajax({
        type: "POST", //GET, POST, PUT
        url: '/verify',  
        beforeSend: function (xhr) {   
            xhr.setRequestHeader("Authorization", 'Bearer '+ jwt);
        }
      }).done(function (response) {
        // console.log(response)
        user = { email: response.email, _id: response._id }
        $('#message').text(`Welcome, ${ response.users.email || response.result.email } `)
      }).fail(function (err) {
          console.log(err);
      });
      $('#yesToken').toggleClass('show');
    } else {
      $('#noToken').toggleClass('show');
    }
}