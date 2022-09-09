const express=require("express");
const app=express();
const hostname='0.0.0.0';
require("./db/conn")
app.use(express.json());
app.use(require('./Router/auth'));
app.use(require('./Router/purchase'))
app.get("/",(req,res)=>{
    res.send("Welcome to block Pe")
})

app.listen(process.env.PORT||3000,hostname,()=>{
    console.log("Server running at port 3000")
})