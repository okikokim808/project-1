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