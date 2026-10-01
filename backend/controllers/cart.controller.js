import mongoose from "mongoose"
import Customer from "../models/customer.model.js"
import Product from "../models/product.model.js"

export const addToCart = async (req, res) => {
    try {
        const userId = req.customer._id
        const productId = req.params.productId
        const user = await Customer.findById(userId)
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID" })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }

        const alreadyInCart = user.cart.find((item) => item.product.toString() === productId);

        if (alreadyInCart) {
            if (alreadyInCart.quantity >= product.stock) {
                return res.status(409).json({ message: "Not enough stock" })
            }
            alreadyInCart.quantity++;
        } else {
            if (product.stock < 1) {
                return res.status(409).json({
                    message: "Product is out of stock"
                });
            }
            user.cart.push({
                product: productId,
                quantity: 1
            });
        }
        await user.save()
        res.status(201).json({ success: true, message: "Added to Cart ", cart: user.cart })
    } catch (error) {
        res.status(500).json({ message: 'Internal server crash' })
    }
}


export const getCart = async (req, res) => {

    try {
        const userId = req.customer._id
        const user = await Customer.findById(userId).populate('cart.product', 'name price image stock')
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        res.status(200).json({ success: true, cart: user.cart })

    } catch (error) {
        res.status(500).json({ message: 'Internal server crash' })
    }

}

export const updateCart = async (req, res) => {
    try {
        const { quantity } = req.body
        if (typeof (quantity) !== 'number') {
            return res.status(400).json({ message: "Quantity must a number" })
        }
        const userId = req.customer._id
        const productId = req.params.productId
        const user = await Customer.findById(userId).populate("cart.product", "name price image stock")
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID" })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }
        const alreadyInCart = user.cart.find((item) => item.product._id.toString() === productId)
        if (!alreadyInCart) {
            return res.status(404).json({ message: 'Product not in cart' })
        }
        if (quantity < 1) {
            return res.status(400).json({ message: 'Quantity must be at least 1' })
        }
        if (quantity > product.stock) {
            return res.status(400).json({ message: 'Not Enough Stock' })
        }
        alreadyInCart.quantity = quantity
        await user.save()

        res.status(200).json({ success: true, message: "Cart Updated", cart: user.cart })

    } catch (error) {
        res.status(500).json({ message: 'Internal server crash' })
    }
}


export const removeFromCart = async (req, res) => {
    try {
        const userId = req.customer._id
        const productId = req.params.productId
        const user = await Customer.findById(userId).populate("cart.product", "name price image stock")
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID" })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }
        const alreadyInCart = user.cart.find((item) => item.product._id.toString() === productId)
        if (!alreadyInCart) {
            return res.status(404).json({ message: 'Product not in cart' })
        }
        user.cart.pull({ product: productId })
        await user.save()
        const updatedUser= await Customer.findById(userId).populate("cart.product", "name price image stock")
        res.status(200).json({ success: true, message: "Cart Updated", cart: updatedUser.cart })

    } catch (error) {
        res.status(500).json({ message: 'Internal server crash' })
    }
}