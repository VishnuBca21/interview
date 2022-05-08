import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors'

const app = express();
app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/userDB')
const userSchema = new mongoose.Schema({
    fName:{
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        min: 8,
        required: true
    },
    imgUrl:{
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

app.get('/',(req, res)=>{
    res.send("hello")
})

app.post('/login',(req, res)=>{
    let inputArray = Object.keys(req.body)
    let inputJson = inputArray[0]
    let inputParse = JSON.parse(inputJson)
    
    const email = inputParse.email;
    const password = inputParse.password;

    User.find({email: email, password:password},(err, foundOne)=>{
        
        if(!err){
                  if(foundOne.length === 0) res.send(false)
                  else res.send(true)  
        }
    })
    
})


app.post("/createuser", (req, res)=>{
    
    let inputArray = Object.keys(req.body)
    let inputJson = inputArray[0]
    
    let inputParse = JSON.parse(inputJson)
    
    const fName = inputParse.fName;
    const lName = inputParse.lName;
    const email = inputParse.email;
    const password = inputParse.password;
    const dob = inputParse.dob;
    const imgUrl = inputParse.imgUrl;
    const status = inputParse.status;
    
    User.find({email:email}, (err, foundOne)=>{
        if(!err) {
            if(foundOne.length != 0){
                console.log("Email id already exist")
                res.send("Email id already exist")
            }
            else{
                console.log("new")
                const user = new User({
                    fName: fName,
                    lName: lName,
                    email: email,
                    password: password,
                    dob:dob,
                    imgUrl: imgUrl,
                    status: status
                })
                user.save()
                res.send("User saved")
            }
        }
    })

})

app.get("/users", (req, res)=>{


    User.find((err, foundItems)=>{
        if(!err){
            res.send(foundItems)
        }
        else(
            res.send(err)
        )
    })
})


app.listen(3001,()=>{
    console.log("server is running at port 3001")
})

