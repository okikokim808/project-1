let loggedIn;
let user; 
let long = 0;
let lat = 0; 

const signupSuccess = (json) => {
    let tokenJson = {token: json.token, user: json.result[0]}
    saveStuff(tokenJson)
}

function onSuccess(response){
    var googleMapRes = JSON.stringify(response)
    var parsed = JSON.parse(googleMapRes)
        console.log('success ', googleMapRes)
    
    //get longitude and latitude
    var lat = parsed.results[0].geometry.bounds.northeast.lat
    var lng = parsed.results[0].geometry.bounds.northeast.lng
    Cookies.set("lng", lng)
    Cookies.set("lat", lat)
}

$(document).ready(function(){
    console.log("cookie", Cookies.get('username')); // => 'value')
    $('#location').on('submit',function(e){
        e.preventDefault();
         let zipCodeData = $('#zipCode').val()
         console.log(zipCodeData) 
         console.log(zipCode)
        
        Cookies.set("zipCode", zipCodeData);
        console.log("cookie", Cookies.get('zipCode')); // => 'value') 

        let endpoint = `http://maps.googleapis.com/maps/api/geocode/json?address=13413&sensor=false&key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg`
        
        $.ajax({
            dataType: 'json',   
            method: 'GET',
            url: endpoint,
            success: onSuccess,
            error: function(response){
                console.log('Error:' + JSON.stringify(response))
            }
        })
    })
})//end doc.ready

var allInterests = [
    "tech","family","hw","sf", "learning","photo","fd","writing","lc","music","move","lgbtq","film","sfg","beliefs","art","bc","dance","pets","hc","fb","cb","social"
]
var userInterests = [];

for(let i = 0; i < allInterests.length; i++){
    let interest = allInterests[i]
    document.getElementById(interest).onclick = function(){
        if ( this.checked ) {
            userInterests.push($(this).attr("data-id") );
        } else {
        let index = userInterests.indexOf($(this).attr("data-id") )
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
        method: "PUT",
        url: "http://localhost:3000/interests",
        data: {
            username: username, //pass user in from index.html, may use email instead
            interests: userInterests //get from intrests.html
        },
        success: ()=>{
           $('#submitBtn').on('click',()=>{
               window.location.replace('/profile')
            }) 
        },
        error: console.log('Error - interests not submitted')
    }) 
})
