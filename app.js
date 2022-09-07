const express=require("express");
const app=express();
require("./db/conn")
app.use(express.json());
app.use(require('./Router/auth'));

app.get("/",(req,res)=>{
    res.send("Welcome to block Pe")
})

app.listen(process.env.PORT||3000,()=>{
    console.log("Server running at port 3000")
})