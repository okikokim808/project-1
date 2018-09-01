//get location

var locationEndpoint = "https://api.meetup.com/2/cities?offset=0&format=json&lon=-122.419998169&photo-host=public&page=500&radius=25.0&lat=37.7799987793&order=size&desc=false&sig_id=262151934&sig=2dcf462a53e32a4a6eb9a99b106d61daa927dc39"

function createSucc(user){    
    console.log(user.user._id)
    window.location.reload()
}

$('#location').on('submit',function(e){
    e.preventDefault();
    var zipCodeData = $(this).serialize()
    console.log(zipCodeData)

    $.ajax({
        method: 'GET',
        url: locationEndpoint,
        success: createSucc,
        error: function (response) {
            console.log('error', JSON.stringify(response));
          }
    })

})
















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