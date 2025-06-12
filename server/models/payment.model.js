const mongoose = require('mongoose')

const paymentSchema= new mongoose.Schema({
    orderId:{type:mongoose.Schema.Types.ObjectId,ref:"Order",required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    amountPaid:{type:Number,required:true},
    paymentStatus:{type:String,required:true},
    paymentDate:{ type: Date, default: Date.now()}
    
})