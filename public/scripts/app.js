$('#signUpBtn').on('click',function(){ 
    let data = {
        username: $('#subName').val(),
        email: $('#subEmail').val(),
        password:$('#subPass').val(),
        interests:[]
    }
    
    Cookies.set("username", $('#subName').val());
    console.log("cookie", Cookies.get('username')); // => 'value') 

    $.ajax({
        method: "POST",
        url: "/signup",
        data: data,
        success: function(response){
            console.log(JSON.stringify(response))
        },
        error: function(response){
            console.log("error", JSON.stringify(response))
        },
    })
    window.location.replace('/interests');
})