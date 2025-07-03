const multer=require('multer')
const path=require('path')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,'./uploads')
        
    },
    filename:function(req,file,cb){
        cb(null,`${file.fieldname}${Date.now()}-${file.originalname}`)
    }
})

const fileFilter=(req,file,cb)=>{
    const allowedExtension=/jpeg|jpg|png|/
    const fileExtension=path.extname(file.originalname)
    if(allowedExtension.test(fileExtension)){
        return cb(null,true)
    }
    else{
        return cb(new Error("Upload a valid file"))
    }
}

const upload=multer({storage:storage,fileFilter:fileFilter})
module.exports=upload