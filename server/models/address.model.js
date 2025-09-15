const mongoose=require('mongoose')

const addressSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"User",required:true},
    addressLine:{type:String, required:true},
    city:{type:String,required:true},
    state:{type:String,required:true},
    landmark:{type:String},
    pincode:{type:String,required:true},
    isPrimary:{type:Boolean,required:true}
})

module.exports=mongoose.model("Address",addressSchema)