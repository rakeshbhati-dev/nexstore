const express=require('express')
const router=express.Router()
const {registerUser,login}=require('../controllers/user.controller')

// router.get('/')
// router.get('/:id')

router.post('/register',registerUser)
router.post('/login',login)
// router.post('/logout')

// router.put('/:id')
// router.delete('/:id')

module.exports=router