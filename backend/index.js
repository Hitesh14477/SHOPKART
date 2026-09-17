import express from 'express'
import mongoose from 'mongoose'
import router from './routes/customer.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import proudctRoutes from './routes/product.route.js'
dotenv.config();


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use('/customers',router)
app.use('/products',proudctRoutes)

mongoose.connect(process.env.url).then(() => {
    console.log('Shopkart DB connected')
}).catch((error) => {
    console.log(error)
})
const port=8001
app.listen(port, () => {
    console.log(`Server started at ${port}`)
})
