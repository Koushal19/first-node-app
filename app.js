
const server = require('express');
const fs = require("fs");
const mongoose = require("mongoose");
// const users = require('./MOCK_DATA.json');


mongoose.connect("mongodb://127.0.0.1:27017/node-db")
.then(()=>console.log("Mongo DB is connected"))
.catch((err)=>console.log("Error connecting to the DB", err));


const app = server();


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    jobTitle:{
        type:String,
    },
    gender:{
        type:String,
    },
    
},{
    timestamps : true
});

const User = new mongoose.model("user",userSchema); 


//express middleware
app.use(server.urlencoded({extended : false}));

app.get('/',(req,res)=>{
    res.send("Hello world");
});

app.get('/api/users',async (req,res)=>{
    const usersDB = await User.find({});
    return res.json(usersDB);
});

app.get('/api/users/:id',async (req,res)=>{
    const user = await User.findById(req.params.id);
    return res.json(user);
});

app.patch('/api/users/:id',async (req,res)=>{
    await User.findByIdAndUpdate(req.params.id, {lastName: "Changed"});
    console.log("patch request");
    return res.json("user updated");
});


// app.post('/api/users/',(req,res)=>{
//     console.log("function called");
//     const body = req.body;
//     users.push({...body, id: users.length+1});
//     fs.writeFile("./MOCK_DATA.json",JSON.stringify(users), (err, data)=>{
//         return res.send("user added");
//     });   
// });

app.post('/api/users/',async (req,res)=>{
    console.log("function called");
    const body = req.body;

    const result = await User.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        jobTitle:body.job_title,
    });

    console.log(result);

    return res.status(201).json({msg:"user created successfully"});
       
});


app.listen(8000,()=>{
    console.log("server is listening at port 8000");
}

);