import { createProduct, getProducts, ProductInfo } from '../controllers/product.controller.js'
import express from 'express'

const productRoutes=express.Router()

productRoutes.post('/',createProduct)
productRoutes.get('/',getProducts)
productRoutes.get('/:id',ProductInfo)

export default productRoutes
