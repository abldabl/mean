const express=require('express');
const router=express.Router();

const User=require('../models/user');

router.get('/',function(req,res){
    User.find({},function(err,users){
        if(err){
            return console.log(err);
        }
        res.send(users);
    });
});

router.post('/',function (req,res){
    if (!req.body){
        res.sendStatus(400);
    }
    const userName=req.body.name;
    const userAge=req.body.age;
    const user=new User({name:userName,age:userAge});
    user.save(function (err){
        if (err){
            return console.log(err);
        }
        res.send(user);
    });
})

router.get('/:id',function (req,res){
    const id=req.params.id;
    User.findById(id,function (err,user){
        if (err){
            return console.log(err);
        }
        res.send(user);
    });
});

router.delete("/:id",function (req,res){
    const id=req.params.id;
    User.findByIdAndDelete(id,function (err,user){
        if (err){
            return console.log(err);
        }
        res.send(user);
    });
});


router.put("/:id",function (req,res){
    if (!req.body) return res.sendStatus(400);
    const userName=req.body.name;
    const userAge=req.body.age;
    const newUser={name:userName,age:userAge};
    User.findByIdAndUpdate(req.params.id, newUser, {new:true}, function (err,user){
        if(err){
            return console.log(err);
        }
        res.send(user);
    });
});



module.exports = router;