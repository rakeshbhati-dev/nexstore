const mongoose = require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    address:{type:String,required:true},
    orderStatus:{type:String,required:true,default:"Pending"},
    orderItem:[{
        productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
        quantity:{type:Number,required:true},
        productPrice:{type:Number,required:true}
    }],
    totalAmount:{type:Number,required:true}
})

module.exports=mongoose.model("Order",orderSchema)