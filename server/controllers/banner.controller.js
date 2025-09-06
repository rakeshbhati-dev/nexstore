const Banner = require('../models/banner.model')
const fs = require('fs')

const addBanner = async (req, res) => {
    const { title, url } = req.body
    try {
        const { filename } = req.file
        const result = await Banner.create({ title, url, bannerImage: filename })
        return res.status(201).json({ message: "Banner created successfully", banner: result })
    } catch (err) {
        fs.unlink(req.file.path, (fileError) => {
            if (fileError) {
                return (res.status(500).json({ message: fileError.message, error: fileError }))
            }
            else {
                res.status(500).json({ message: err.message, error: err })
            }
        })
    }
}

const getAllBanner=async (req,res)=>{
    try {
        const result=await Banner.find()
        if(result){
            return res.status(200).json({message:"Banner fetch successfully",banner:result})
        }
        else{
           return res.status(404).json({message:"No Banner Found"})
        }
    } catch (err) {
        return res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

module.exports={addBanner,getAllBanner}