
const mongoose=require('mongoose');
const DB='mongodb+srv://BlockPe:123_Shreyash@cluster0.365hyo0.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Connection successful")
}).catch((err)=>{
    console.log(err);
});
