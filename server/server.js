// Environment variable configure
const dotenv=require('dotenv')
dotenv.config()

// Connecting to database.
require('./config/db')

// Adding Admin:
const addAdmin=require('./controllers/admin.controller')
addAdmin()

// Invoking express library.
const express=require('express')
const app=express()
app.use(express.json())

// Enabling CORS
const cors=require('cors')
app.use(cors())

app.use(express.static('uploads'))
// Setting up router
const userRouter=require('./routes/user.routes')
const categoryRouter=require('./routes/category.routes')
const subCategoryRouter=require('./routes/sub-category.routes')
const productRouter=require('./routes/product.routes')
const cartRouter=require('./routes/cart.routes')
const orderRouter=require('./routes/order.routes')
const bannerRouter=require('./routes/banner.routes')
const dashboardRouter=require('./routes/dashboard.routes')
const addressRouter=require('./routes/address.routes')

app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/subcategory',subCategoryRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/order',orderRouter)
app.use('/banner',bannerRouter)
app.use('/admin',dashboardRouter)
app.use('/address',addressRouter)

// Listening server on port
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`); 
    
})