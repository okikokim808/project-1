// require('app.env').config()
let loggedIn;
let user; 

checkForLogin();

function checkForLogin(){
    if(localStorage.length > 0){
      let jwt = localStorage.token
      $.ajax({
        type: "POST", //GET, POST, PUT
        url: '/verify',  
        beforeSend: function (xhr) {   
            xhr.setRequestHeader("Authorization", 'Bearer '+ localStorage.token);
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




var meetupEndpoint = "https://api.meetup.com/2/categories?offset=0&format=json&photo-host=public&page=20&order=shortname&desc=false&sig_id=246475348&sig=d11081424ef2de73b07a3f59412de8cdca5420ba"

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
    var meetupJSONResponse = JSON.stringify(response)
    console.log('success ' + meetupJSONResponse)
}
