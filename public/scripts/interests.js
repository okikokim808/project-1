<<<<<<< HEAD
// require('app.env').config()

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
=======
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
        userInterests.push(interest);
        console.log(userInterests)
    } else {
       let index =  userInterests.indexOf(interest)
        userInterests.splice(index,1)
    }
};
}

$('form').submit(function(e) {
    e.preventDefault()
    console.log(userInterests)
    // app.put({interests: userInterests})  
    $.ajax({
        method: "put",
        url: "localhost:3000/interests",
        data: {
            username: 'jane', //pass user in from index.html
            id: 3 //get from intrests.html
        }
    })     
})
>>>>>>> 741d6294d1cc76b99fc80c799f6cb78cab429c6f
