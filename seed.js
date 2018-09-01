// simply run: `node seed.js` from the root of this project folder.
// const db = require('./models');
const db = require('./models')
const users = 
[
    {
        email: "clarkKent@superman.com",
        password: "redCape123",  
        username: "cKent",
        interests: "bc, tech",
        meetupIDs: "12, 13, 15",
    },
    {
        email: "bruceWayne@batman.com",
        password: "blackBat456",  
        username: "bWayne",
        interests: "fd, dance, film",
        meetupIDs: "11, 14, 15",
    },
    {
        email: "tonyStark@ironman.com",
        password: "redSuit789",  
        username: "tStark",
        interests: "hw, move, hc",
        meetupIDs: "8, 9, 10",
    }
]

db.User.deleteMany({}, (err, removeUser) =>{
    if(err){
        return console.log('Error')
    }
    return console.log('Removed User from DB.')
})

db.User.create(users,(err, users)=>{
    if(err){
        return console.log("Error:", err);
    }
    console.log("New User Created", users._id)
    process.exit();
})


