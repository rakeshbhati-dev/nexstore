const express=require('express')
const router=express.Router()
const authentication=require('../middlewares/auth.middleware')
const {registerUser,login,updateUser}=require('../controllers/user.controller')

// router.get('/')
// router.get('/:id')

router.post('/register',registerUser)
router.post('/login',login)
// router.post('/logout')

router.put('/:id',authentication,updateUser)
// router.delete('/:id')

module.exports=router