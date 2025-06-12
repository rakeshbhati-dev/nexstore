const mongoose=require('mongoose')

mongoose.connect(process.env.DATABASE_URI).then(()=>{
    console.log("Database Connected");
}).catch(()=>{
    console.log("Failed to Connect to database");
    
})

module.exports=mongoose