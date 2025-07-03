const router=require('express').Router()
const authentication=require('../middlewares/auth.middleware')
const isAdmin=require('../middlewares/isadmin.middleware')
const upload=require('../middlewares/upload.middleware')
const {addProduct}=require('../controllers/product.controller')

router.post('/',authentication,isAdmin,upload.single('prodImage'),addProduct)

// router.get('/list',)
// router.get('/subcategory/:id')
// router.get('/category/:id')
// router.get('/:id')
// router.put('/:id',authentication,isAdmin,upload)
// router.delete('/:id',authentication,isAdmin)

module.exports=router