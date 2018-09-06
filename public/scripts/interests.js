checkForLogin();

$('#location').on('submit',function(e){
    e.preventDefault();
    var zipCodeData = $(this).serialize()
    console.log(zipCodeData)
    Cookies.set("zipCode", zipCodeData);
    console.log("cookie", Cookies.get('zipCode')); // => 'value') 
})

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
        }
    };
}

$('form').submit(function(e) {
    e.preventDefault()
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
        console.log(response)
        user = { email: response.email, _id: response._id, interests: response.interests}
        item = response;
        
        $('#message').text(`Welcome, ${ response.email || response.result.email } `)
      }).fail(function (err) {
          console.log(err);
      });
      $('#yesToken').toggleClass('show');
    } else {
      $('#noToken').toggleClass('show');
    }
}