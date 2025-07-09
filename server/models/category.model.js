const mongoose=require('mongoose')
const SubCategory=require('../models/sub-category.model')


const categorySchema=new mongoose.Schema({
    title:{type:String,required:true,unique:true}
})

categorySchema.pre('deleteOne',{ document: true },async function(){
    await SubCategory.deleteMany({category:this._id})
})
module.exports=mongoose.model("Category",categorySchema)