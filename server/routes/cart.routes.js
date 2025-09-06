const authentication=require('../middlewares/auth.middleware')
const router=require('express').Router()
const {addToCart,getCart,updateCart,deleteCartItem,deleteCart}=require('../controllers/cart.controller')

 router.post('/',authentication,addToCart)
 router.get('/',authentication,getCart)
 router.put('/',authentication,updateCart)
 router.delete('/item/:id',authentication,deleteCartItem)
 router.delete('/',authentication,deleteCart)


module.exports=router