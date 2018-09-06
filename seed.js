const db = require('./models')
const users = 
    {
        name: "Clark Kent",
        email: "clarkKent@superman.com",
        password: "redCape123",  
        username: "cKent",
        interests: "bc, tech",
        meetupIDs: 12,
        comment:[]
    }

const usrComment = {
    name: "Clark Kent",
    comment: "My cape is red"
}

//SERVER
//grab user id (req.body.userId - from AJAX call)
db.User.deleteMany({},(err, removed)=>{
    console.log('deleted')
    db.User.create(users,(err,savedUser)=>{ //findOne
        if(err){console.log(err)}
        db.Comments.deleteMany({},(err,removedComment)=>{ //no delete
            db.Comments.create(usrComment,(err,savedComment)=>{
            console.log(savedComment)
                savedUser.comment.push(savedComment);
                savedUser.save((err,savedUserComm)=>{
                    if(err){
                        console.log(error)
                    }
                    else{
                        console.log(savedUserComm)
                    }
                })
            })
        })  
    })
})

db.User.deleteMany({}, (err, removeUser) =>{
    if(err){
        return console.log('Error')
    }
    return console.log('Remove User from DB.')
})

db.User.create(users,(err, users)=>{
    if(err){
        return console.log("Error:", err);
    }
    console.log("New User Created", users)
    process.exit();
})


