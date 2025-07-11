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

// Setting up router
const userRouter=require('./routes/user.routes')
const categoryRouter=require('./routes/category.routes')
const subCategoryRouter=require('./routes/sub-category.routes')
const productRouter=require('./routes/product.routes')
const cartRouter=require('./routes/cart.routes')
app.use('/user',userRouter)
app.use('/category',categoryRouter)
app.use('/subcategory',subCategoryRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)

// Listening server on port
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`); 
    
})