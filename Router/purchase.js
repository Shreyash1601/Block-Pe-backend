const express=require('express');
const cors=require("cors");
const pur=express.Router();
require('../db/conn')
const Purchase=require('../models/Transaction detail.js')
pur.use(cors({
    origin: '*'
}));
pur.post('/purchase',(req,res)=>{
    const {StoreName,Invoice,PCategory,ProductName,ProductPrice,DOP, CustomerName,AadharCard, email,phone,MIStoreID,Hash}=req.body;

    if(!StoreName || !Invoice || !ProductName || !ProductPrice || !DOP || !CustomerName || !PCategory||!AadharCard|| !email ||!phone||!MIStoreID ||!Hash){
        res.status(422).json({
            "Error":"Please fill complete data"
        })
    }

    const bill=new Purchase({
        Hash:Hash,
        StoreName:StoreName,
        Invoice:Invoice,
        PCategory:PCategory,
        ProductName:ProductName,
        ProductPrice:ProductPrice,
        DOP:DOP,
        CustomerName:CustomerName,
        AadharCard:AadharCard,
        email:email,
        phone:phone,
        MIStoreID:MIStoreID
    })

    bill.save().then(()=>{
        res.status(200).json({
            message:"Bill made successfully"
    })
}).catch((err)=>{
    console.log(err)
    res.status(500).json({error:"Can't complete the bill"})
})

})

pur.post("/records/all",async (req,res)=>{
    try{
   const result=await Purchase.find().sort({$natural:-1});
   if(!result) res.status(422).json({error:"Could not load"})
   else{
       res.send(result)
   }
    }catch(err){
        res.status(422).json({error:"Could not load"})
    }
})

pur.post("/records",async (req,res)=>{
   const {phone,DOP,Invoice}=req.body;
   let data={};
   try{
   if(DOP && !phone && !Invoice){
       data=await Purchase.find({DOP:DOP});
   }
   else if(!DOP && phone && !Invoice){
    data=await Purchase.find({phone:phone});
   }
    else if(!DOP && !phone && Invoice){
    data=await Purchase.find({Invoice:Invoice})}
    else{
        return res.status(400).json({error:"Incomplete data"});
      }
    res.send(data) 
   }catch{
       res.status(400).json("Some error occured at Server End");
   }
})

module.exports=pur