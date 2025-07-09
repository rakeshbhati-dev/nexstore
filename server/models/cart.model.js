const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    cartItem:[{
        productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
        quantity:{type:Number,min:1,default:1,required:true},
        totalAmount:{type:Number,required:true}
    }]
})

module.exports=mongoose.model("Cart",cartSchema)