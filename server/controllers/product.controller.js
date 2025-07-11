const Product = require('../models/product.model')
const Category = require('../models/category.model')
const SubCategory = require('../models/sub-category.model')
const fs = require('fs')

const addProduct = async (req, res) => {
    const { prodName, prodStock, description, subCategory,price } = req.body

    try {
        const { filename } = req.file
        const subCatgExist = await SubCategory.findById(subCategory)
        if (!subCatgExist) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.log(err.message);
                }
            })
            return res.status(404).json({ message: "Sub Category do not exist." })
        }
        const result = await Product.create({ prodName, prodStock,price, description, subCategory, prodImage: filename })
        res.status(201).json({ message: "Product Added Successfully", data: result })
    }
    catch (errs) {
        fs.unlink(req.file.path, (err) => {
            if (err) {
                return (res.status(500).json({ message: err.message, error: err }))
            }
            else {
                res.status(500).json({ message: errs.message, error: errs })
            }
        })

    }
}

const findById = async (req, res) => {
    const productId = req.params.id
    try {
        const result = await Product.findById(productId).populate({ path: 'subCategory', populate: { path: 'category' } })
        // console.log(result.subCategoryId.categoryId._id);

        if (result) {
            return res.status(200).json({ message: "Product Found", data: result })
        }
        else {
            return res.status(404).json({ message: "No product found." })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", error: err.message })
    }
}

const allProducts = async (req, res) => {
    try {
        const result = await Product.find().populate({ path: 'subCategory', populate: { path: 'category', select: { title: 1, _id: 0 } }, select: { title: 1, _id: 0 } })
        if (result) {
            return res.status(200).json({ message: "Products Found", data: result })
        }
        else {
            return res.status(404).json({ message: "No product found." })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", error: err.message })
    }
}

const productBySubCategory = async (req, res) => {
    const subCategoryId = req.params.id
    try {
        const result = await Product.find({ subCategory: subCategoryId }).populate({ path: 'subCategory', select: { title: 1, _id: 0 } })
        if (result) {
            return res.status(200).json({ message: "Product Found", data: result })
        }
        else {
            return res.status(404).json({ message: "No Product Found" })
        }
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", error: err.message })
    }
}



const updateProduct = async (req, res) => {
    const productId = req.params.id
    const { prodName, prodStock, subCategory, description,price } = req.body
    // prodImage1751646823734-Samsung M21.jpg
    try {
        const existingProduct = await Product.findById(productId)
        const prodImage = req.file.filename
        const fileExist = fs.existsSync(`uploads/${existingProduct.prodImage}`)
        if (fileExist) {

            fs.unlinkSync(`uploads/${existingProduct.prodImage}`)
        }
        const result = await Product.findByIdAndUpdate(productId, { prodName, prodStock, subCategory,price, description, prodImage: prodImage }, { new: true })
        if (result) {
            return res.status(200).json({ message: "Product update successfully", data: result })
        }
        else {
            return res.status(400).json({ message: "Unable to update product" })
        }

    } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message })
    }

}

const deleteProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const existedProduct = await Product.findById(productId)
        if (existedProduct) {
            const fileExist = fs.existsSync(`uploads/${existedProduct.prodImage}`)
            if (fileExist) {
                fs.unlinkSync(`uploads/${existedProduct.prodImage}`)
            }
            const result=await Product.findByIdAndDelete(productId)
            if(result){
                res.status(200).json({message:"Product Deleted Successfully"})
            }
            else{
                res.status(400).json({message:"Unable to delete product"})
                
            }
        }
        else{
            res.status(404).json({message:"Product do not exist."})

        }
    } catch (err) {
            res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

module.exports = { addProduct, findById, allProducts, productBySubCategory, updateProduct,deleteProduct }