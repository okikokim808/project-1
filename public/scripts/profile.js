//get location

// var locationEndpoint = "https://api.meetup.com/2/cities?&photo-host=public&query=13413&page=20&sign=true"

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

// var meetupEndpoint = "https://api.meetup.com/2/concierge?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&callback=?&sign=true"

// var meetupEndpoint ="https://api.meetup.com/find/groups?&photo-host=public&key=3b72576a30795b1d47673a2f3f2837&zip=94158&country=UnitedStates&topic_id=1&page=20&callback=?&sign=true" 

var meetupEndpoint = "https://api.meetup.com/find/groups?photo-host=public&key=3b72576a30795b1d47673a2f3f2837&location=SAN+FRANCISCO+&zip=94158&page=20&country=United+States&sig_id=262151934&sig=86081e34bdd1f0a0c4f8a94ffee4526aab30fa4b&callback=?&sign=true"

$(document).ready(function(){
    console.log('in profile.js')
    $.ajax({
        dataType: 'json',
        method: 'GET',
        url: meetupEndpoint,
        success: onSuccess,
        error: function(response){
            console.log('Error:' + JSON.stringify(response))
        }
    })
})//end doc.ready

function onSuccess(response){


    console.log('success ', response)

    //works with first API link
//     var meetupJSONResponse = response.results;
//     let maxLen = meetupJSONResponse.length;
//     //calculate random numbers
//         function randomNum(min,max,interval)
//         {
//             interval = 1;
//             let random = Math.floor(Math.random()*(max-0+interval)/interval);
//             return random*interval+min;
//         }
//             var num1 = randomNum(0,maxLen);
//             var num2 = randomNum(0,maxLen); 
//             var num3 = randomNum(0,maxLen);  
//              //rule out
//             if(num1 === num2 || num1 === num3 && num1 != maxLen){
//                 num1++
//             }
//                 else if(num2 === num3 && num2 != maxLen){
//                     num2++ 
//                 }
//                 else if(num1 === num2 || num1 === num3 && num1=== maxLen){
//                     num1--
//                 }
//                 else if(num2 === num3 && num2 === maxLen){
//                     num2--
//                 }
//     //generate HTML
//    console.log(num1,num2,num3)

  
//     $("#list").append("<li>"+"<h2>Meetup 1" + " " + "</h2>"+meetupJSONResponse[num1].description+"<button class = addBtn id=btn1 value=add>Add</button>" + "</li")

//     $("#list").append("<li>" + "<h2>Meetup 2" + " " + "</h2>"+meetupJSONResponse[num2].description+"<button class = addBtn id=btn2 value=add>Add</button>" + "</li")

//     $("#list").append("<li>" + "<h2>Meetup 3" + " " + "</h2>"+meetupJSONResponse[num3].description+"<button class = addBtn id=btn3 value=add>Add</button>" +"</li")
//     console.log('success ', meetupJSONResponse)

//     //add button to Saved Meetup
//     $("addBtn").on('click',function(e){
//         e.preventDefault();
//         console.log("hi")
//         $("#savedMeetups").append()
//     })
}

