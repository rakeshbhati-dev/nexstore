const express=require('express')
const router=express.Router()
const authentication=require('../middlewares/auth.middleware')
const isadmin=require('../middlewares/isadmin.middleware')
const {registerUser,login,updateUser,deleteUser,updatePassword,userProfile,getAllUser}=require('../controllers/user.controller')

router.get('/',authentication,isadmin,getAllUser)
router.get('/:id',authentication,userProfile)

router.post('/register',registerUser)
router.post('/login',login)
// router.post('/logout')

router.put('/password',authentication,updatePassword)
router.put('/:id',authentication,updateUser)
router.delete('/:id',authentication,deleteUser)


module.exports=router