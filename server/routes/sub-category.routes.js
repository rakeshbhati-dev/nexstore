const router=require('express').Router()
const authentication=require('../middlewares/auth.middleware')
const isAdmin=require('../middlewares/isadmin.middleware')
const {addSubCatg,findByCategory}=require('../controllers/sub-categories.controller')

router.get('/list/:categoryId',findByCategory)
// router.get('/:id')
router.post('/:categoryId',authentication,isAdmin,addSubCatg)
// router.delete('/:id',authentication,isAdmin)

module.exports=router