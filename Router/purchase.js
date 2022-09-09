const express=require('express');
const axios=require('axios');
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

    const fn=()=>{
        axios.post('https://block-pe-ipfs.herokuapp.com/ipfs',{
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
        }).then((response)=>{return(response.data["CID"])}).catch((err)=>{
            console.log(err)
            return null;
        })
    }

    const bill=new Purchase({
        StoreName:StoreName,
        Invoice:Invoice,
        Hash:fn(),
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

    console.log(bill.Hash)
    if(bill.Hash==null) return res.status(422).json({"error":"An error occurred while storing data on IPFS"}
    )
    bill.save().then(()=>{
        res.status(201).json({
            message:"Bill made successfully"
    })
}).catch((err)=>{
    console.log(err)
    res.status(500).json({error:"Can't complete the bill"})
})

})

module.exports=pur