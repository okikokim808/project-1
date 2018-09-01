var date = new Date();
$("#date").append(date)


var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"

$(document).ready(function(){
    console.log('in profile.js')
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