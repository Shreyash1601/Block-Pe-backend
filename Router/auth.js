const express=require('express');

const router=express.Router();
require('../db/conn')
const User=require('../models/userSchema')

router.post('/register',(req,res)=>{
    const {name,email,phone,MIStoreID,password,cpassword}=req.body;

    if(!name || !email || !phone || !MIStoreID || !password || !cpassword){
        res.status(422).json({
            "Error":"Please fill complete data"
        })
    }

    User.findOne({email:email}).then((userExist)=>{
        if(userExist){
            return res.status(422).json({
                error:"Email exists"
            })
        }

        const user=new User({
            name:name,
            email:email,
            phone:phone,
            MIStoreID:MIStoreID,
            password:password,
            cpassword:cpassword
        })

        user.save().then(()=>{
            res.status(201).json({
                message:"User registered successfully"
            })
        }).catch((err)=>{
            console.log(err)
            res.status(500).json({error:"Could not register"})
        })
    }).catch((err)=>{
        console.log(err)
    })

})


router.post('/Login',async (req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please fill the data"})
        }

        const UserLogin=await User.findOne({email:email});


        const isCompare=UserLogin.password==password;


        if(!UserLogin|| !isCompare){
            res.status(400).json({error:"Invalid credential"})
        }
        else{
            res.json({message:"User Signed In successfully"});

            console.log(UserLogin)
        }
    }catch(err){
        console.log(err);
        
    }
})








module.exports=router;