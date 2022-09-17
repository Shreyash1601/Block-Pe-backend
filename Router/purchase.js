//importing all neccessary modules

const express=require('express');
var nodemailer = require('nodemailer');
const twilio = require('twilio');
const cors=require("cors");
const pur=express.Router();
require('../db/conn')
const Purchase=require('../models/Transaction detail.js')
pur.use(cors({
    origin: '*'
}));
//Setting up Whatsapp and Email communication
// for sending bills

const id = 'ACa95ba9947c6361364919e69943aef559';
const token = '4b9d9a501c6056a0f1a0e0f3ed140083';
const client = twilio(id, token);

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'blockpeofficialbill@gmail.com',
      pass: 'dkcqtuicrmaiiznc' //the password is made to be used only for this particular application and not for other Gmail services. Hence it is safe.
    }
  });


//Route to purchase Product

pur.post('/purchase',async (req,res)=>{
    //Validating whether or not all details have been submitted from front-end
    const {StoreName,Invoice,PCategory,ProductName,ProductPrice,DOP, CustomerName,AadharCard, email,phone,MIStoreID,Hash}=req.body;

    if(!StoreName || !Invoice || !ProductName || !ProductPrice || !DOP || !CustomerName || !PCategory||!AadharCard|| !email ||!phone||!MIStoreID||!Hash){
       return res.status(422).json({
            "Error":"Please fill complete data"
        })
    }
    else{
      //recognising details
    const bill2={
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
    }
    const bill=new Purchase({
       ...bill2
    })
    const bill3= `Your Bill for ${bill2.ProductName}\nCustomerName\t${bill2.CustomerName}\n
    Invoice\t${bill2.Invoice}\n
    Hash\t${bill2.Hash}\n
    StoreName\t${bill2.StoreName}\n
    MI Store ID\t${bill2.MIStoreID}\n
    Date of Purchase\t${bill2.DOP}\n
    Price\t${bill2.ProductPrice}\n
      `
    bill.save().then(()=>{
        res.status(200).json({
            message:"Bill made successfully"
    })
    var mailOptions = {
        from: 'blockpeofficialbill@gmail.com',
        to: `${bill2.email}`,
        subject: `Your Bill from Block Pe for ${bill2.ProductName}`,
        text:`${bill3}`
        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      client.messages
 .create({
  
  // Bill to be sent..
  body: `${bill3}`,

  // Senders Number (Twilio Sandbox No.)
  from: 'whatsapp:+14155238886',

  // Number receiving the message
  to: `whatsapp:+91${bill2.phone}`
 })
 .then(message => console.log("Message sent successfully"))
 .done();


}).catch((err)=>{
    console.log(err)
    res.status(500).json({error:"Can't complete the bill"})
})
    }
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