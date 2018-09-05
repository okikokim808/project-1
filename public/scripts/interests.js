// require('app.env').config()
// console.log(localStorage.token);
// const signupSuccess = (json) => {
//     // console.log(json)
//     let tokenJson = {token: json.token, user: json.result[0]}
//     // console.log(tokenJson)
//     saveStuff(tokenJson)
// }
 

// var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"

    // let loggedIn;
    // let user;

    checkForLogin();
    // console.log("cookie", Cookies.get('username')); // => 'value')

    // console.log(user);

    $('#location').on('submit',function(e){
        e.preventDefault();
        var zipCodeData = $(this).serialize()
        console.log(zipCodeData)
        Cookies.set("zipCode", zipCodeData);
        console.log("cookie", Cookies.get('zipCode')); // => 'value') 


    // $.ajax({
    //     dataType: 'json',
    //     type: 'GET',
    //     url: meetupEndpoint,
    //     success: onSuccess,
    //     error: function(response){
    //         console.log('Error:', response)
    //     }
    // })
})//end doc.ready

// function onSuccess(response){
//     var meetupJSONResponse = JSON.stringify(response)
//     // console.log('success ' + meetupJSONResponse)
// }

var allInterests = [
    "tech",
    "family",
    "hw",
    "sf",
    "learning",
    "photo",
    "fd",
    "writing",
    "lc",
    "music",
    "move",
    "lgbtq",
    "film",
    "sfg",
    "beliefs",
    "art",
    "bc",
    "dance",
    "pets",
    "hc",
    "fb",
    "cb",
    "social"
]

var userInterests = [];

for(let i = 0; i < allInterests.length; i++){
    let interest = allInterests[i]
    document.getElementById(interest).onclick = function(){
    if ( this.checked ) {
        userInterests.push($(this).attr("data-id") );
    }// else {
    //     let index =  userInterests.indexOf($(this).attr("data-id") )
    //     userInterests.splice(index,1)
    // }
};
}

$('form').submit(function(e) {
    e.preventDefault()
    // console.log()
    // console.log("cookie", Cookies.get('username')); // => 'value')
    // var username = Cookies.get('username') 
    // var id = $("data-id").val()
    // console.log("userInterests "+ userInterests)
    $.ajax({
        type: "PUT",
        url: "/interests",
        data: {
            _id: user._id,
            interests: userInterests
        },
        success: function(results){
            console.log(results);
            window.location.replace('/');
        },
        error: function(err){
            console.log(err);
        }
    })
    console.log(item);
    // $.ajax({
    //     method: "put",
    //     url: "http://localhost:3000/interests",
    //     data: {
    //         username: username, //pass user in from index.html, may use email instead
    //         interests: userInterests //get from intrests.html
    //     }
    // })     
})
var item;
function checkForLogin(){
    if(localStorage.length > 0){
      let jwt = localStorage.token
      $.ajax({
        type: "POST", //GET, POST, PUT
        url: '/verify',  
        beforeSend: function (xhr) {   
            xhr.setRequestHeader("Authorization", 'Bearer '+ jwt);
        }
      }).done(function (response) {
        // console.log(response)
        user = { email: response.users.email, _id: response.users._id, interests: response.users.interests}
        item = response;
        // console.log(response);
        // console.log(user);
        
        $('#message').text(`Welcome, ${ response.users.email || response.result.email } `)
      }).fail(function (err) {
          console.log(err);
      });
      $('#yesToken').toggleClass('show');
    } else {
      $('#noToken').toggleClass('show');
    }
}