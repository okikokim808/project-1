// require('app.env').config()

// var meetupEndpoint = API-URL
//tests with Dalton
// var meetupEndpoint = "https://api.meetup.com/topics/?name=cat&key=3b72576a30795b1d47673a2f3f2837"

var authorizationEndpoint ="https://secure.meetup.com/oauth2/authorize"
var accessTokenEndpoint = "https://secure.meetup.com/oauth2/access"


var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"

// var meetupEndpoint = "https://api.meetup.com/find/groups?&photo-host=public&zip=94568&category=1&page=20&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"


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

$(document).ready(function(){
    console.log('andrea!!!...... HI')
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

let loggedIn;
let user; 

checkForLogin();

$('#signupForm').on('submit', submitSignup)

$('#loginForm').on('submit', submitLogin)

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
        console.log(response)
        user = { email: response.email, _id: response._id }
        console.log("you can access variable user: " , user)
      }).fail(function (err) {
          console.log(err);
      }); 
  }
}
