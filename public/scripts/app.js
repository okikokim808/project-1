// require('app.env').config()

// var meetupEndpoint = API-URL
//tests with Dalton
// var meetupEndpoint = "https://api.meetup.com/topics/?name=cat&key=3b72576a30795b1d47673a2f3f2837"

var authorizationEndpoint ="https://secure.meetup.com/oauth2/authorize"
var accessTokenEndpoint = "https://secure.meetup.com/oauth2/access"


var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"


//OAUTH


function fetchGroups(url, cb, data) {
	if(!data) data = [];
	
	$.ajax({
		dataType:'jsonp',
		method:'get',
		url:meetupEndpoint,
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
            console.log('Error:' + JSON.stringify(
                response))
        }
    })
})//end doc.ready

function onSuccess(response){
    var meetupJSONResponse = JSON.stringify(response);
    
    console.log('success ' + meetupJSONResponse)
}
