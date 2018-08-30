// require('app.env').config()

// var meetupEndpoint = API-URL
//tests with Dalton
// var meetupEndpoint = "https://api.meetup.com/topics/?name=cat&key=3b72576a30795b1d47673a2f3f2837"

var authorizationEndpoint ="https://secure.meetup.com/oauth2/authorize"
var accessTokenEndpoint = "https://secure.meetup.com/oauth2/access"


var meetupEndpoint = "https://api.meetup.com/2/concierge?&sign=true&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?"



//OAUTH
// const logIN = "https://authorization-server.com/auth?response_type=code&client_id=CLIENT_ID&redirect_uri=https://www.meetup.com/"

// const authorizationURL = "https://secure.meetup.com/oauth2/authorize"

// const accessTokensURL = "https://secure.meetup.com/oauth2/access"

// const callback = "https://floating-escarpment-62979.herokuapp.com/"

function fetchGroups(url, cb, data) {
	if(!data) data = [];
	
	$.ajax({
		dataType:'jsonp',
		method:'get',
		url:meetupEndpoint,
		success:function(result) {
			console.log('back with ' + result.data.length +' results');
			console.dir(result);
			//add to data
			// data.push.apply(data, result.data);
			// if(result.meta.next_link) {
			// 	var nextUrl = result.meta.next_link;
			// 	fetchGroups(nextUrl, cb, data);
			// } else {
			// 	cb(data);	
			// }
		}
	});		
}

$(document).ready(function(){
    var $results = $("#results");

	$results.html("<p>Finding meetups based on User Selection.</p>");

	fetchGroups("https://api.meetup.com/find/groups?&photo-host=public&page=50&text=ionic&sig_id=2109318&radius=global&order=newest&sig=ad335a79ccce2b1bb65b27fe10ea6836305e5533&callback=?", function(res) {
		console.log("totally done");
		console.dir(res);	

		// var s = "";
		// for(var i=0;i<res.length; i++) {
		// 	var group = res[i];
		// 	s += "<h2>"+(i+1)+" <a href='"+group.link+"'>"+group.name+"</a></h2>";
		// 	if(group.group_photo && group.group_photo.thumb_link) {
		// 		s += "<img src=\"" + group.group_photo.thumb_link + "\" align=\"left\">";
		// 	}
		// 	s += "<p>Location: "+group.city + ", " + group.state + " " + group.country + "</p><br clear=\"left\">";
		// }
		// $results.html(s);
	});




    $.ajax({
        type: 'GET',
        url: meetupEndpoint,
        success: onSuccess,
        error: function(response){
            console.log('Error:' + response)
        }
    })
})//end doc.ready

function onSuccess(response){
    var meetupJSONResponse = JSON.stringify(response);
    
    console.log('success ' + meetupJSONResponse)
}
