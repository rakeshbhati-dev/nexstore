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
                categoryId: categoryId,
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
        const subCategory=await SubCategory.find({categoryId:categoryId})
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




module.exports={addSubCatg,findByCategory}