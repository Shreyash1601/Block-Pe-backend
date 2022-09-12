const mongoose=require('mongoose');

const Transaction=new mongoose.Schema({
    StoreName:{
        type:String,
        required:true
    },
    Hash:{
        type:String,
        required:false
    },
    Invoice:{
        type:String,
        required:true
    },
    ProductName:{
        type:String,
        required:true
    },
    PCategory:{
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
    MIStoreID:{
        type:String,
        required:true
    }
})


const Purchase=mongoose.model('Purchase',Transaction);
module.exports=Purchase;