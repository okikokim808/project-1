// require('app.env').config()

// var meetupEndpoint = API-URL
var meetupEndpoint = "https://api.meetup.com/topics/?name=cat&key=3b72576a30795b1d47673a2f3f2837"

$(document).ready(function(){
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
    console.log(response.results);
    
    // console.log('success ' + meetupJSONResponse)
    
}