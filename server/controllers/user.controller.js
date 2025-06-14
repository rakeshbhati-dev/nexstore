const User=require('../models/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const registerUser=async(req,res)=>{
    try{const {username,email,password,mobile,role}=req.body
    const existingUser=await User.findOne({email:email})
    if(existingUser){ 
        return res.status(400).json({message:"User already exist"})
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser=await User.create({username,email,password:hashedPassword,mobile,role})
    res.status(201).json({message:"User registered successfully",user:newUser})}
    catch(err){
        res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email:email})
        if(user){
            const isValid=await bcrypt.compare(password,user.password)
            if(!isValid){
                return res.status(401).json({message:"Incorrect Password"})
            }
            else{
                const token=jwt.sign({email:user.email,userId:user._id},process.env.SECRET_KEY)
                res.status(200).json({message:"Login Successful",user:user,token:token})
            }
        }
        else{
            return res.status(401).json({message:"Invalid Email ID"})
            }
    }
    catch(err){
            return res.status(500).json({message:"Something went wrong",error:err.message})
        
    }
}

module.exports={registerUser,login}