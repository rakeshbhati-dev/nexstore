const Category = require('../models/category.model')

const addCategory = async (req, res) => {
    const { title } = req.body
    try {
        const existingCategory = await Category.findOne({ title: title })
        
        if (!existingCategory) {
            const newCategory = await Category.create({ title })
            res.status(201).json({ message: "Category added successfully", catg: newCategory })
        }
        else {
            res.status(409).json({ message: "Category already exist." })
        }
    } catch (err) {
        res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const allCategory= async (req,res)=>{
    try {
        const categories=await Category.find({})
        if(categories.length>0){
            res.status(200).json({message:"Category List",catg:categories})
        }
        else{
            res.status(404).json({message:"No category found."})
        }
    } catch (err) {
        res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const findById= async (req,res)=>{
    const categoryId=req.params.id
    try {
        const category=await Category.findById(categoryId)
        if(category){
            res.status(200).json({message:"Category Found",catg:category})
        }
        else{
            res.status(404).json({message:"No category found."})
        }
    } catch (err) {
        res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const updateCategory= async (req,res)=>{
    const categoryId=req.params.id
    const {title}=req.body
    try {
         const result= await Category.findByIdAndUpdate(categoryId,{title},{new:true})
         if(result){
            res.status(200).json({message:"Category Updated",catg:result})
         }
         else{
            res.status(404).json({message:"No category found."})
         }
    } catch (err) {
        res.status(500).json({message:"Something went wrong",error:err.message})
        
    }
}

const deleteCategory = async (req,res)=>{
    const categoryId=req.params.id
    try {
        const result=await Category.findById(categoryId)
        if(result){
           await result.deleteOne()
            res.status(201).json({message:"Category Delete Successfully"})
         }
         else{
            res.status(404).json({message:"No category found."})
         }
    } catch (err) {
        res.status(501).json({message:"Something went wrong",error:err.message})
    }
}

module.exports={addCategory,allCategory,findById,updateCategory,deleteCategory}