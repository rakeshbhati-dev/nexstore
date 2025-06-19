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
                const token=jwt.sign({email:user.email,userId:user._id,role:user.role},process.env.SECRET_KEY)
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

const updateUser=async (req,res)=>{
    try{
        const userId=req.params.id
        const {username,email,mobile}=req.body
        const updatedData={}
        if(username) updatedData.username=username
        if(email) updatedData.email=email
        if(mobile) updatedData.mobile=mobile

        const result=await User.findByIdAndUpdate(userId,updatedData,{new:true})
        
        if(!result){
            return res.status(400).json({message:"User not found"})
        }
        else{
            return res.status(200).json({message:"User updated successfully",user:result})
        }

    }
    catch(err){
        return res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const deleteUser=async (req,res)=>{
    try{
        const userId=req.params.id
        const result=await User.findByIdAndDelete(userId)
        if(!result){
            return res.status(400).json({message:"User not found"})
        }
        else{
            return res.status(200).json({message:"User account deleted successfully."})
        }
    }
    catch(err){
        return res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const updatePassword= async (req,res)=>{
   try{
    const userId=req.user.userId
    const {oldPassword,newPassword}=req.body
    const existingUser=await User.findById(userId)

    if(!oldPassword) return res.status(400).json({message:"Provide current password"})
    if(!newPassword) return res.status(400).json({message:"Provide new password"})

    if(existingUser){
        const validPassword=await bcrypt.compare(oldPassword,existingUser.password)
        if(validPassword){
            const hashedPassword=await bcrypt.hash(newPassword,10)
            existingUser.password=hashedPassword
            const result=await User.findByIdAndUpdate(userId,existingUser,{new:true})
            return res.status(200).json({message:"Password Updated Successfully",user:result})
        }
        else{
            return res.status(401).json({message:"Invalid Password"})
        }
    }
    else{
        return res.status(404).json({message:"User not found."})
    }
    
   }
   catch(err){
    return res.status(500).json({message:"Something went wrong.",error:err.message})
   }
}

const userProfile=async (req,res)=>{
    const userId=req.params.id
    try{
         const result=await User.findById(userId)
        if(result){
            return res.status(200).json({message:"User Found",user:result})
        }
        else{
            return res.status(404).json({message:"User not found"})
        }
    }
    catch(err){
        res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const getAllUser= async(req,res)=>{
    try{
        const allUser=await User.find({role:"user"})
        if(allUser){
            return res.status(200).json({message:"User list..",user:allUser})
        }
        else{
            return res.status(404).json({message:"No user available"})
        }
    }
    catch(err){
        res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

module.exports={registerUser,login,updateUser,deleteUser,updatePassword,userProfile,getAllUser}