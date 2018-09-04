checkForLogin();
function createSucc(user){    
    console.log(user.user._id)
    window.location.reload()
}
function commSucc(json){
    allComments = json 
    render()
}
var zipCode = Cookies.get("zipCode")
console.log("zipCode" + zipCode)

var meetupEndpoint = `https://api.meetup.com/find/groups?photo-host=public&key=3b72576a30795b1d47673a2f3f2837&zip=`+zipCode+`&page=100&country=United+States&sig_id=262151934&sig=86081e34bdd1f0a0c4f8a94ffee4526aab30fa4b&callback=?&sign=true`

$(document).ready(function(){
    var username = Cookies.get("username")
    console.log('in profile.js')
    console.log("username"+ username)

// $('#location').on('submit',function(e){
//     e.preventDefault();
//     var zipCodeData = $(this).serialize()
//     zipCode = zipCodeData
//     console.log(zipCodeData)
// })
// for(let i=0; i<interest.length;i++){
//     let interestVals = interest[i]
//     console.log("interest: " +interest[i])
// }

    $.ajax({
        dataType: 'json',
        method:'GET',
        url: '/interests',
        data: {username: username},
        url: "http://localhost:3000/userInterests",
        success:function(response){
            console.log("User Interests Retrieved")
            var userInterests = user.interests
            console.log(userInterests)
            var parseInterests = JSON.parse(userInterests)
                for(let i = 0; i < parseInterests.length; i++){
                    var intID = parseInterests[i] //scoping
                }
            $.ajax({
                dataType: 'json',   
                method: 'GET',
                url: meetupEndpoint,
                success: onSuccess,
                error: function(response){
                    console.log('Error:' + JSON.stringify(response))
                }
            })
        },
        error: function(response){
            console.log('Error:' + JSON.stringify(response))   
        }
    })  
})//end doc.ready

//success calls
const removeSuccess = response =>{
    console.log("Meetup removed")
}
function onSuccess(response){
    var meetupJSONResponse = response.data;
    console.log(meetupJSONResponse) //scoping
    
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

    //generate HTML
    
   console.log(num1,num2,num3)
   //comparison link: 

   //if category id === parsed int

  
   console.log(meetupJSONResponse[num1].category.id)

    //List Meetups
    $("#list").append(
        "<li>" +
        "<h2>Meetup 1" + " " + "</h2>" +
        "<h5>Name: </h5>" + meetupJSONResponse[num1].name + "<br> " +
        "<h5>Link: </h5>" +meetupJSONResponse[num1].link+ "<br> " +
        "<h5>Description: </h5>" +meetupJSONResponse[num1].description+ "<br> " +
        "<button class = addBtn id=btn1 value=add>Add</button>" + "</li>")

    $("#list").append(
        "<li>" +
        "<h2>Meetup 2" + " " + "</h2>" +
        "<h5>Name: </h5>" + meetupJSONResponse[num2].name + "<br> " +
        "<h5>Link: </h5>" +meetupJSONResponse[num2].link+ "<br> " +
        "<h5>Description: </h5>" +meetupJSONResponse[num2].description+ "<br> "+
        "<button class = addBtn id=btn2 value=add>Add</button>" + "</li>") 
        
    "<li>" +
        $("#list").append(
        "<h2>Meetup 3" + " " + "</h2>" +
        "<h5>Name: </h5>" + meetupJSONResponse[num3].name + "<br> " +
        "<h5>Link: </h5>" +meetupJSONResponse[num3].link+ "<br> " +
        "<h5>Description: </h5>" +meetupJSONResponse[num3].description+ "<br> "+
        "<button class = addBtn id=btn3 value=add>Add</button>" + "</li>")    
    
    // console.log('success ', meetupJSONResponse)


function addMeetup(num){
    $("#savedMeetup").append("<li class ="+num+">" + "Name: "+ JSON.stringify(meetupJSONResponse[num].name+
    "</li>"+
    "<li class ="+num+">" + "Link: "+meetupJSONResponse[num].link+"</li>"+
    "<button class=removeBtn value=delete>Remove</button>" +"<hr class =hr>"))

    $('.removeBtn').on('click',function(){
        var username = Cookies.get("username")
       
        console.log("username for meetupID remove: ", username)
        var meetupId = meetupJSONResponse[num].id
        console.log("meetupID",meetupId)
        $.ajax({
            method:"PUT",
            url:"http://localhost:3000/profile/remove",
            data: {
                username: username, 
                meetupId: meetupId 
            },
            success:console.log("Success: "+username+" "+meetupId+ " "+"removed"),
            error: function(response){console.log('Error-Username NOT removed:' + JSON.stringify(response))}
        })
    $("."+num).hide()
    
    
    
    })
}

    //add button to Saved Meetup
    $("#btn1").on('click',function(e){
        var username = Cookies.get("username")
        console.log("username: ", username)
        var meetupId = meetupJSONResponse[num1].id
        console.log("meetupId: " + meetupId)
        e.preventDefault()
        $.ajax({
            method: "put",
            url: "http://localhost:3000/profile",
            data: {
                username: username, 
                meetupId: meetupId 
            },
            success:console.log("Success:"+username+meetupId),
            error: function(response){console.log('Error:' + JSON.stringify(response))}
        })     
        addMeetup(num1)
        $(this).hide()   
    })
    $("#btn2").on('click',function(e){
        e.preventDefault();
        addMeetup(num2)
        $(this).hide()
    })
    $("#btn3").on('click',function(e){
        e.preventDefault();
        addMeetup(num3)
        $(this).hide()
    })
    function createSucc(user){    
        console.log(user.user._id)
        window.location.reload()
    }
    $('.addCommentBtn').on('click',function(e){
        e.preventDefault;
        console.log("commentClicked")
    })
    $('#comments').on('submit',function(e){
        e.preventDefault();
        var data = $(this).serialize();
        console.log(data)
        $.ajax({
            method:'PUT',
            url:"https://localhost:3000/profile/meetupId",
            data:data,
            success: commSucc,
            error: function(response){console.log('Error:' + JSON.stringify(response))}
        })
        var date = new Date();
        $("#date").append(date)
    })
}

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
        user = { email: response.email, interests: response.interests, _id: response._id }
        item = user;
        console.log(user);
        $('#message').text(`Welcome, ${ response.email || response.result.email } `)
      }).fail(function (err) {
          console.log(err);
      });
      $('#yesToken').toggleClass('show');
    } else {
      $('#noToken').toggleClass('show');
    }
}