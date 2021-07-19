const express=require("express");
const bodyParser=require("body-parser");
const cors=require('cors');
const mongoose=require('mongoose');

const dotenv = require("dotenv");
dotenv.config({path: './config/config.env'});
const port = process.env.PORT;

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userController=require('./controllers/userController');
app.use('/users',userController);

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true , useUnifiedTopology: true ,useFindAndModify: false },(err)=>{
    if (!err){
        console.log("Mongodb connection successful");
        app.listen(port, () => console.log(`Server is running on ${port}`))
    }else{
        console.log('error connection db'+JSON.stringify(err,undefined,2));
    }
});
