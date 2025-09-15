const router=require('express').Router()
const authentication=require('../middlewares/auth.middleware')
const {addAddress,getAddress,getParticularAddress,deleteAddress,updateAddress,getPrimaryAddress}=require('../controllers/address.controller')

router.post('/',authentication,addAddress)
router.get('/',authentication,getAddress)
router.get('/primary',authentication,getPrimaryAddress)
router.get('/:id',authentication,getParticularAddress)
router.delete('/:id',authentication,deleteAddress)
router.put('/:id',authentication,updateAddress)
module.exports=router