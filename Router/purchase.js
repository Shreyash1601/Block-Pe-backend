const express=require('express');
const pur=express.Router();
require('../db/conn')
const Purchase=require('../models/Transaction detail.js')

pur.post('/purchase',(req,res)=>{
    const {StoreName,Invoice,PCategory,ProductName,ProductPrice,DOP, CustomerName,AadharCard, email,phone,MIStoreID}=req.body;

    if(!StoreName || !Invoice || !ProductName || !ProductPrice || !DOP || !CustomerName || !PCategory||!AadharCard|| !email ||!phone||!MIStoreID){
        res.status(422).json({
            "Error":"Please fill complete data"
        })
    }

    const bill=new Purchase({
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

module.exports=pur