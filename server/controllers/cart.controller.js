const { default: mongoose } = require('mongoose')
const Cart = require('../models/cart.model')
const Product = require('../models/product.model')

const addToCart = async (req, res) => {
    
    const { productId,quantity } = req.body
    const { userId } = req.user
    
    try {
        const productExist=await Product.findById(productId)
        if(!productExist){
            return res.status(404).json({message:"No Product Found"})
        }
        let totalAmount=productExist.price*quantity
        let cart = await Cart.findOne({ userId: userId })
        if (!cart) {
            cart = new Cart({ userId, cartItem:[{productId,quantity,totalAmount}]})
        }
        else {
            const index = cart.cartItem.findIndex((item) => item.productId.toString() === productId)
            if (index > -1) {
                cart.cartItem[index].quantity += quantity
                cart.cartItem[index].totalAmount+=totalAmount
            }
            else {
                cart.cartItem.push({ productId, quantity,totalAmount })
            }
        }
        await cart.save()
        res.status(201).json({ message: "Cart Updated Successfully", cart: cart })
    } 
    catch (err) {
        res.status(500).json({message:"Something went wrong",error:err.message})
    }

}

const getCart= async (req,res)=>{
    const {userId}=req.user
    try{
        const result=await Cart.findOne({userId:userId}).populate('cartItem.productId','prodName prodImage price')
        if(result){
            res.status(200).json({message:"Cart found",cart:result})
        }
        else{
            return res.status(404).json({message:"No Cart found"})
        }
    }
    catch(err){
        res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const updateCart=async (req,res)=>{
    const {userId}=req.user
    const {productId,quantity}=req.body

    try{
        const productExist=await Product.findById(productId)
        if(!productExist){
           return res.status(404).json({message:"No Product Found"})
        }
        const cartExist=await Cart.findOne({userId:userId})
        if(!cartExist){
            return res.status(404).json({message:"No Cart Exist"})
        }
        const totalAmount=productExist.price*quantity

        const result=await Cart.findOneAndUpdate({userId:userId, "cartItem.productId":new mongoose.Types.ObjectId(String( productId))},{$set:{"cartItem.$.quantity":quantity,"cartItem.$.totalAmount":totalAmount}},{new:true}
    )
    if(!result){
       return res.status(404).json({message:"Unable to update item quantity"})
    }
    return res.status(200).json({message:"Cart Updated Successfully",data:result})
        
    }
    catch(err){
        res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const deleteCartItem= async (req,res)=>{
    const itemId=req.params.id
    const {userId}=req.user

   try {
    const cartExist=await Cart.findOne({userId:userId})
   if(!cartExist){
    return res.status(404).json({message:"No Cart Exist"})
   }
   const updateCartItem=cartExist.cartItem.filter((item)=>item._id.toString()!==itemId)
   const result=await Cart.findOneAndUpdate({userId:userId},{$set:{cartItem:updateCartItem}})
   if(result){
   return res.status(200).json({message:"Cart Item deleted Successfully"})
   }
   return res.status(400).json({message:"Unable to delete Cart Item"})
   } catch (err) {
     res.status(500).json({message:"Something went wrong",error:err.message})
   }
}

const deleteCart=async (req,res)=>{
    const {userId}=req.user

    try{
        const result=await Cart.findOneAndDelete({userId:userId})
        if(result){
          return  res.status(200).json({message:"Cart Deleted Successfully"})
        }
        else{
            return res.status(404).json({message:"No Cart Exist, Unable to delete"})
        }

    }
    catch(err){
        res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

module.exports={addToCart,getCart,updateCart,deleteCartItem,deleteCart}