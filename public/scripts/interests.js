// require('app.env').config()
console.log('francisco');
const signupSuccess = (json) => {
    // console.log(json)
    let tokenJson = {token: json.token, user: json.result[0]}
    // console.log(tokenJson)
    saveStuff(tokenJson)
}
let loggedIn;
let user; 

// var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"

$(document).ready(function(){
    console.log("cookie", Cookies.get('username')); // => 'value')

    

    $('#location').on('submit',function(e){
        e.preventDefault();
        var zipCodeData = $(this).serialize()
        console.log(zipCodeData)
        Cookies.set("zipCode", zipCodeData);
        console.log("cookie", Cookies.get('zipCode')); // => 'value') 
    })

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

<<<<<<< HEAD
function onSuccess(response){
    var meetupJSONResponse = response
    console.log('success ' + meetupJSONResponse)
}
=======
// function onSuccess(response){
//     var meetupJSONResponse = JSON.stringify(response)
//     // console.log('success ' + meetupJSONResponse)
// }
>>>>>>> 59778e7726ca5b23590aa9ec156fe90c349765bb

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
    } else {
       let index =  userInterests.indexOf($(this).attr("data-id") )
        userInterests.splice(index,1)
    }
};
}

$('form').submit(function(e) {
    e.preventDefault()
    console.log("cookie", Cookies.get('username')); // => 'value')
    var username = Cookies.get('username') 
    var id = $("data-id").val()
    console.log("userInterests "+ userInterests)
    $.ajax({
        method: "put",
        url: "http://localhost:3000/interests",
        data: {
            username: username, //pass user in from index.html, may use email instead
            interests: userInterests //get from intrests.html
        }
    })     
})
