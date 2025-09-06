const router=require('express').Router()
const authentication=require('../middlewares/auth.middleware')
const isAdmin=require('../middlewares/isadmin.middleware')
const {addSubCatg,findByCategory,deleteSubCategory,findById,allSubCategory}=require('../controllers/sub-categories.controller')


router.get('/',allSubCategory)
router.get('/list/:categoryId',findByCategory)
router.get('/:id',findById)
router.post('/:categoryId',authentication,isAdmin,addSubCatg)
router.delete('/:id',authentication,isAdmin,deleteSubCategory)


module.exports=router