const authentication=require('../middlewares/auth.middleware')
const isAdmin=require('../middlewares/isadmin.middleware')
const router=require('express').Router()
const {addCategory,allCategory,findById,updateCategory,deleteCategory}=require('../controllers/category.controller')

router.get('/',allCategory) 
router.get('/:id',findById) 

router.post('/',authentication,isAdmin,addCategory)

router.put('/:id',authentication,isAdmin,updateCategory)
router.delete('/:id',authentication,isAdmin,deleteCategory)

module.exports=router 