const SubCategory = require('../models/sub-category.model')
const Category = require('../models/category.model')

const addSubCatg = async (req, res) => {
    const { title} = req.body
    const {categoryId}=req.params
    try {


        const existSubCatg = await SubCategory.findOne({ title: title })
        const existCategory=await Category.findById(categoryId)
        if (existSubCatg) {
            return res.status(409).json({ message: "Sub Category already exist." })
        }
        else if(!existCategory){
            return res.status(404).json({message:"No category exist"})
        }
        else {
            const result = await SubCategory.create({
                category: categoryId,
                title: title
            })
            return res.status(201).json({ message: "Sub Category added", subCategory: result })
        }
    }
    catch (err) {
        return res.status(501).json({ message: "Something went wrong", error: err.message })
    }
}

const findByCategory=async (req,res)=>{
    const {categoryId}=req.params
    try{
        const subCategory=await SubCategory.find({category:categoryId})
        if(subCategory.length===0){
            return res.status(404).json({message:"No sub category found"})
        }
        else{
            return res.status(200).json({message:"Sub Category found",data:subCategory})
        }
    }catch(err){
        res.status(501).json({message:"Something went wrong",error:err.message})
    }
}

const findById=async (req,res)=>{
    const subCatgId=req.params.id
    
    try{
        const subCategory=await SubCategory.findById(subCatgId)
        
        if(subCategory){
            return res.status(200).json({message:"Sub Category Found",data:subCategory})
        }
        else{
            return res.status(404).json({message:"No Sub Category Found."})
        }
    }
    catch(err){
        return res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const deleteSubCategory=async (req,res)=>{
    const subCatgId=req.params.id
    try {
        const result=await SubCategory.findById(subCatgId)
        if(result){
            await result.deleteOne()
            return res.status(200).json({message:"Sub Category Deleted Successfully"})
        }
        else{
            return res.status(404).json({message:"No Sub category found"})
        }
    } catch (err) {
        return res.status(501).json({message:"Something went wrong",error:err.message})
    }
}


module.exports={addSubCatg,findByCategory,deleteSubCategory,findById}