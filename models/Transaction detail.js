const mongoose=require('mongoose');

const Transaction=new mongoose.Schema({
    StoreName:{
        type:String,
        required:true
    },
    Invoice:{
        type:String,
        required:true
    },
    ProductName:{
        type:String,
        required:true
    },
    ProductPrice:{
        type:Number,
        required:true
    },
    DOP:{
        type:String,
        required:true
    },
    CustomerName:{
        type:String,
        required:true
    },
    AadharCard:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    MIstoreId:{
        type:String,
        required:true
    }
})


const User=mongoose.model('USER',userSchema);
module.exports=User;