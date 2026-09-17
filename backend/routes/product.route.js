import { createProduct, getProducts, ProductInfo } from '../controllers/product.controller.js'
import express from 'express'

const router=express.Router()

router.post('/',createProduct)
router.get('/',getProducts)
router.get('/:id',ProductInfo)

export default router
