const Product = require('../models/product.model')
const Category = require('../models/category.model')
const SubCategory = require('../models/sub-category.model')
const fs=require('fs')

const addProduct = async (req, res) => {
    const { prodName, prodStock, description, subCategoryId } = req.body
    
    try {
        const { filename } = req.file
        const subCatgExist= await SubCategory.findById(subCategoryId)
        if(!subCatgExist){
            fs.unlink(req.file.path,(err)=>{
                if(err){
                    console.log(err.message);
                }
                
            })
            return res.status(404).json({message:"Sub Category do not exist."})
        }
        const result = await Product.create({ prodName, prodStock, description, subCategoryId, prodImage: filename })
        res.status(201).json({ message: "Product Added Successfully", data: result })
    } 
    catch (errs) {
        fs.unlink(req.file.path,(err)=>{
            if(err){
                return(res.status(500).json({ message: err.message, error: err }))
            }
            else{
                res.status(500).json({ message: errs.message, error: errs })
            }
        })
        
    }
}

module.exports={addProduct}