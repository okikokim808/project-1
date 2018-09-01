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
    console.log('success ', meetupJSONResponse)
}