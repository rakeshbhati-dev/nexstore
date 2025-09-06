const Product=require('../models/product.model')
const Order=require('../models/order.model')
const User=require('../models/user.model')

const dashboardStats=async (req,res)=>{
    try {
        const productCount=await Product.countDocuments()
        const userCount=await User.countDocuments()
        const orderCount=await Order.countDocuments()

       return res.status(200).json({totalProduct:productCount,totalUser:userCount,totalOrder:orderCount})
    } catch (err) {
        res.status(500).json({message:err.message,error:err})
    }
}

module.exports={dashboardStats}