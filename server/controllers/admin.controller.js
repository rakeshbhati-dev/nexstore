const User=require('../models/user.model')
const bcrypt=require('bcrypt')

const addAdmin=async (req,res)=>{
    const isAdmin=await User.findOne({role:"admin"})
    if(!isAdmin){
        const hashedPassword=await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
        await User.create({
            username:process.env.ADMIN_NAME,
            email:process.env.ADMIN_EMAIL,
            mobile:process.env.ADMIN_MOBILE,
            role:"admin",
            password:hashedPassword
        })
        console.log("Admin Created Successfully");
    }
    else{
        console.log("Admin is present in database.");
        
    }
}



module.exports=addAdmin