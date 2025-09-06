const Order=require('../models/order.model')
const Product=require('../models/product.model')
const Cart=require('../models/cart.model')

const placeOrder=async (req,res) => {
    const {userId}=req.user
    const {address,orderItem}=req.body

    if(orderItem.length==0){
        return res.status(404).json({message:"No product found"})
    }

    try {
        let totalAmount=0
        const items=[]

        // 5rs kurkure-1 10rs icecream-1 1rs choclate-2
        for (let item of orderItem){
            const product=await Product.findById(item.productId) 
            //1. kurkure 2. ice cream 3.choclate
            if(!product){
                continue
            }
            let price=parseInt(product.price) //5 10 1
            let qty=parseInt(item.quantity) //1 1 2
            if (product.stock < qty) {
                return res.status(400).json({ message: `Insufficient stock for ${product.prodName}` });
            }

            let totalPrice=price*qty //5*1=5 10*1=10 1*2=2
            totalAmount=totalAmount+totalPrice //0+5=5 5+10=15 15+2=17
            
            items.push({
                productId:product._id,
                quantity:qty,
                totalPrice:totalPrice
            })

            product.prodStock-=qty
            await product.save()
        }

        if(items.length==0){
            return res.status(400).json({message:"Invalid Product Item"})
        }

        const order=new Order({
            userId:userId,
            address:address,
            orderItem:items,
            totalAmount:totalAmount,
            orderStatus:"Placed"
        })
       await order.save()
      const cart= await Cart.findOne({userId:userId})
      await Cart.findByIdAndDelete(cart._id)

      return res.status(200).json({message:"Order Placed Successfully"})

    } catch (err) {
        return res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const getUserOrder=async (req,res) => {
    const {userId}=req.user
    try {
        const result=await Order.findOne({userId:userId}).populate('userId','username').populate('orderItem.productId','prodName prodImage price')
        if(result){
            return res.status(200).json({message:"Order Found",data:result})
        }
        else{
            return res.status(404).json({message:"No Order Found"})
        }
    } catch (err) {
        return res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const cancelOrder=async(req,res)=>{
    const orderId=req.params.id
    try {
        const result=await Order.findByIdAndUpdate(orderId,{orderStatus:'Cancelled'},{new:true})
        if(result){
            for(let item of result.orderItem){
                const product=await Product.findById(item.productId)
                if(product){
                    product.prodStock+=item.quantity
                    await product.save()
                }
            }
            return res.status(200).json({message:"Order Cancelled"})
        }
        else{
            return res.status(404).json({message:"No Order Found"})
        }
    } catch (err) {
        return res.status(500).json({message:"Something went wrong",error:err.message})
    }
}

const allOrder=async (req,res) => {
    try {
        const result=await Order.find({}).populate('userId','username').populate('orderItem.productId','prodName prodImage price')
        if(result){
            return res.status(200).json({message:"Order list",data:result})
        }
        else{
            return res.status(404).json({message:"No Order Found"})
        }
    } catch (err) {
        return res.status(500).json({message:"Something went wrong",error:err.message})
        
    }
}

module.exports={placeOrder,getUserOrder,cancelOrder,allOrder}