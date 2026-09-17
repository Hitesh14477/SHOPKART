import mongoose from "mongoose"
import Product from "../models/product.model.js"

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body
        if (!name || !description || !price || !category || !image || !stock) {
            return res.status(400).json({ message: "All fields mandatory" })
        }
        if (price <= 0) {
            return res.status(400).json({ message: "price invalid" })
        }
        if (stock < 0) {
            return res.status(400).json({ message: "stock invalid" })
        }
        const newProduct = await Product.create({ name, description, price, category, image, stock, createdAt: new Date() })
        res.status(201).json({ message: 'product created', product: newProduct })

    } catch (error) {
        res.status(500).json({ message: "Internal server crash" })
    }
}


export const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query
        const filter = {}
        if (search) {
            filter.name = {
                $regex: search,
                $options: "i"
            }
        }
        if (category) {
            filter.category = {
                $regex: category,
                $options: "i"
            }
        }
        const allProducts = await Product.find(filter)
        res.status(200).json({ success: true, count: allProducts.length, products: allProducts })

    } catch (error) {
        res.status(500).json({ message: "Internal server crash" })
    }
}

export const ProductInfo = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({
                message: "Invalid Product ID"
            })
        }
        if (!product) {
            return res.status(404).json({ message: "Invalid Product ID" })
        }
        res.status(200).json({ message: 'product found', product: product })
    } catch (error) {
        res.status(500).json({ message: "Internal server crash" })
    }
}