const multer=require('multer')
const path=require('path')
const fs=require('fs')

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        let folder='./uploads/others'
        if (file.fieldname === 'bannerImage') {
            folder = './uploads/banner';
        } else if (file.fieldname === 'prodImage') {
            folder = './uploads/product';
        }
        ensureDir(folder)
       cb(null,folder)
        
    },
    filename:function(req,file,cb){
        cb(null,`${file.fieldname}${Date.now()}-${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'));
    }
};

const upload=multer({storage:storage,fileFilter:fileFilter})
module.exports=upload