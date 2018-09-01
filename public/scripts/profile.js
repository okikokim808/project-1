//get location

var locationEndpoint = "https://api.meetup.com/2/cities?&photo-host=public&query=13413&page=20&sign=true"

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
    let maxLen = meetupJSONResponse.length;
    //calculate random numbers
        function randomNum(min,max,interval)
        {
            interval = 1;
            let random = Math.floor(Math.random()*(max-0+interval)/interval);
            return random*interval+min;
        }
            var num1 = randomNum(0,maxLen);
            var num2 = randomNum(0,maxLen); 
            var num3 = randomNum(0,maxLen);  
             //rule out
            if(num1 === num2 || num1 === num3 && num1 != maxLen){
                num1++
            }
            else if(num2 === num3 && num2 != maxLen){
                num2++ 
            }
            else if(num1 === num2 || num1 === num3 && num1=== maxLen){
                num1--
            }
            else if(num2 === num3 && num2 === maxLen){
                num2--
            }

            console.log(num1,num2,num3)

    //generate HTML
   console.log(num1,num2,num3)
  
    $("#list").append("<li>"+"<h2>Meetup 1" + " "+"</h2>"+meetupJSONResponse[num1].description+"<button name = `add` class = `addBtn` value =`add`>Add</button>" +"</li")

    $("#list").append("<li>"+"<h2>Meetup 2" + " "+"</h2>"+meetupJSONResponse[num2].description+"<button name = `add` class = `addBtn` value =`add`>Add</button>" +"</li")

    $("#list").append("<li>"+"<h2>Meetup 3" + " "+"</h2>"+meetupJSONResponse[num3].description+"<button name = `add` class = `addBtn` value =`add`>Add</button>" +"</li")
    console.log('success ', meetupJSONResponse)
}

//add button functionality