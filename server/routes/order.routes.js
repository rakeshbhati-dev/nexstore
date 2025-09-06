const router=require('express').Router()
const authentication=require('../middlewares/auth.middleware')
const isAdmin=require('../middlewares/isadmin.middleware')
const {placeOrder,getUserOrder, cancelOrder,allOrder}=require('../controllers/order.controller')

router.get('/',authentication,getUserOrder)
router.get('/list',authentication,isAdmin,allOrder)
router.post('/',authentication,placeOrder)
router.put('/:id',authentication,cancelOrder)
module.exports=router