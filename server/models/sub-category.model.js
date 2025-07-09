const mongoose=require('mongoose')
const Product=require('../models/product.model')

const subCategorySchema=new mongoose.Schema({
    category:{type:mongoose.Schema.Types.ObjectId,ref:"Category",required:true},
    title:{type:String,required:true,unique:true}
})

subCategorySchema.pre('deleteOne',{document:true},async function(){
    await Product.deleteMany({subCategoryId:this._id})
})

module.exports=mongoose.model("SubCategory",subCategorySchema)