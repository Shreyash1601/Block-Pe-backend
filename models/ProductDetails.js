const mongoose=require('mongoose');

const Product=new mongoose.Schema({
    StoreName:{
        type:String,
        required:true
    },
    PManufacture:{
        type:String,
        required:true
    },
    ShippedBy:{
        type:String,
        required:true
    }
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
    LTS:{
        type:String,
        required:true
    },
    DOM:{
        type:String,
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


const Pro=mongoose.model('Product',Product);
module.exports=Pro;