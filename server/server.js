const dotenv=require('dotenv')
const express=require('express')
const app=express()
dotenv.config()
require('./config/db')

app.get("/",(req,res)=>{
    res.send("Hello")
})

const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
    
})