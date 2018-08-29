require('app.env').config()

var meetupEndpoint = API-URL

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

}