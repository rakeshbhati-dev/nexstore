const mongoose = require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    address:{
        name:{type:String,required:true},
        mobile:{type:Number},
        addressLine:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        landmark:{type:String},
        pincode:{type:Number,required:true}
    },
    orderStatus:{type:String,required:true,default:"Placed"},
    orderItem:[{
        productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product",required:true},
        quantity:{type:Number,required:true},
        totalPrice:{type:Number,required:true}
    }],
    totalAmount:{type:Number,required:true}
})

module.exports=mongoose.model("Order",orderSchema)