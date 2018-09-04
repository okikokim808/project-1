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
		method:'get',
        url:"meetupEndpoint",
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
