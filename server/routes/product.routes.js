const router=require('express').Router()
const authentication=require('../middlewares/auth.middleware')
const isAdmin=require('../middlewares/isadmin.middleware')
const upload=require('../middlewares/upload.middleware')
const {addProduct,findById,allProducts,productBySubCategory,updateProduct,deleteProduct,getProductUnder}=require('../controllers/product.controller')

router.post('/',authentication,isAdmin,upload.single('prodImage'),addProduct)
router.get('/list',allProducts)
router.get('/subcategory/:id',productBySubCategory)
router.get('/under/:price',getProductUnder)
// router.get('/category/:id')
router.get('/:id',findById)
router.put('/:id',authentication,isAdmin,upload.single('prodImage'),updateProduct)
router.delete('/:id',authentication,isAdmin,deleteProduct)

module.exports=router