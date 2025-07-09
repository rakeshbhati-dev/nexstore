const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    prodName:{type:String,required:true},
    prodStock:{type:Number,required:true},
    price:{type:Number,required:true},
    description:{type:String,required:true},
    prodImage:{type:String,required:true},
    subCategory:{type:mongoose.Schema.Types.ObjectId,ref:"SubCategory",required:true}
})

module.exports=mongoose.model("Product",productSchema)