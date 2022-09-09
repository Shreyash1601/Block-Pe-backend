const express=require("express");
const cors=require("cors");
const app=express();
const hostname='0.0.0.0';
require("./db/conn")
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(require('./Router/auth'));
app.use(require('./Router/purchase'))
app.get("/",(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed


    res.send("Welcome to block Pe")
})

app.listen(process.env.PORT||5000,hostname,()=>{
    console.log("Server running at port 3000")
})