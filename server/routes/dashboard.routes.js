const router=require('express').Router()
const authentication=require('../middlewares/auth.middleware')
const isAdmin=require('../middlewares/isadmin.middleware')
const {dashboardStats}=require('../controllers/dashboard.controller')

router.get('/stats',authentication,isAdmin,dashboardStats)

module.exports=router