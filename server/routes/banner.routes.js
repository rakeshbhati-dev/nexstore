const router=require('express').Router()
const authentication=require('../middlewares/auth.middleware')
const isAdmin=require('../middlewares/isadmin.middleware')
const upload=require('../middlewares/upload.middleware')
const {addBanner,getAllBanner}=require('../controllers/banner.controller')

router.post('/',authentication,isAdmin,upload.single('bannerImage'),addBanner)
router.get('/list',getAllBanner)

module.exports=router