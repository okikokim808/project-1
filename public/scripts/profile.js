//get location

// var locationEndpoint = "https://api.meetup.com/2/cities?&photo-host=public&query=13413&page=20&sign=true"

function createSucc(user){    
    console.log(user.user._id)
    window.location.reload()
}

function commSucc(json){
    allComments = json 
    render()
}


//come back - will need to pass this 
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

var meetupEndpoint = "https://api.meetup.com/find/groups?photo-host=public&key=3b72576a30795b1d47673a2f3f2837&location=SAN+FRANCISCO+&zip=94158&page=20&country=United+States&sig_id=262151934&sig=86081e34bdd1f0a0c4f8a94ffee4526aab30fa4b&callback=?&sign=true"

$(document).ready(function(){
    var username = Cookies.get("username")
    console.log('in profile.js')
    console.log("username"+ username)
   
    $.ajax({
        dataType: 'json',
        method:'GET',
        data: {username: username},
        url: "http://localhost:3000/userInterests",
        success:function(response){
            console.log("User Interests Retrieved")
            console.log(JSON.stringify(response.interests))
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
    console.log(meetupJSONResponse)
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
    
    console.log('success ', meetupJSONResponse)


function addMeetup(num){
    $("#savedMeetup").append("<li> <h5>Name:</h5>" 
    + meetupJSONResponse[num].name + "<br>" +
    "<h5>Link: </h5>" +
    meetupJSONResponse[num].link+"<br>" +
    "<button class=addComBtn value=attend>Comment</button>"+
    "<button class=removeBtn value=delete>Remove</button>"
    +"</li>")
}

function removeMeetup(){
    $('#removeBtn').on('click', function(e){
        
        e.preventDefault();
        console.log("remove clicked")
        $.ajax({
            method: "PUT",
            url: `/profile/remove/${userId}/${meetupId}`,
            success: removeSuccess,
            error: error
        })

    })
}
    //add button to Saved Meetup
    $("#btn1").on('click',function(e){
        e.preventDefault()
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
            url:"https://localhost:3000/profile",
            data:data,
            success: commSucc,
            error: function(response){console.log('ErrorS:' + JSON.stringify(response))}
        })
        var date = new Date();
        $("#date").append(date)
    })
 

}

