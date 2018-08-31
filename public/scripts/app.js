// require('app.env').config()

// var meetupEndpoint = API-URL
//tests with Dalton
// var meetupEndpoint = "https://api.meetup.com/topics/?name=cat&key=3b72576a30795b1d47673a2f3f2837"

var authorizationEndpoint ="https://secure.meetup.com/oauth2/authorize"
var accessTokenEndpoint = "https://secure.meetup.com/oauth2/access"


var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"

// var meetupEndpoint = "https://api.meetup.com/find/groups?&photo-host=public&zip=94568&category=1&page=20&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"


//OAUTH


// console.log(localStorage)


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
