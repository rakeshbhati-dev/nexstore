const mongoose=require('mongoose')

const bannerSchema=new mongoose.Schema({
    title:{type:String,required:true},
    bannerImage:{type:String,required:true},
    url:{type:String},
})

module.exports=mongoose.model('Banner',bannerSchema)