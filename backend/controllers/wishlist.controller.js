import mongoose from "mongoose"
import Customer from "../models/customer.model.js"
import Product from "../models/product.model.js"

export const addToWishList = async (req, res) => {
    try {
        const currentUserId = req.customer._id
        const productId = req.params.productId

        const currentUser = await Customer.findById(currentUserId)
        if (!currentUser) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID" })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: " Product Not Found" })
        }
        const alreadyinList = currentUser.wishlist.some((id) => (id.toString() === productId))
        if (alreadyinList) {
            return res.status(409).json({ message: "Already in WishList" })
        }
        currentUser.wishlist.push(productId)
        await currentUser.save()
        res.status(201).json({ success: true, message: "Product added to wishlist" })
    } catch (error) {
        res.status(500).json({ message: 'Internal server crash' })
    }
}


export const getWishList = async (req, res) => {
    try {
        const currentUserId = req.customer._id
        const currentUser = await Customer.findById(currentUserId).populate({
            path: "wishlist",
            select: "name price category image stock"
        })
        if (!currentUser) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        res.status(201).json({ success: true, count: currentUser.wishlist.length, wishlist: currentUser.wishlist })
    } catch (error) {
        res.status(500).json({ message: 'Internal server crash' })
    }
}

export const removeFromWishList = async (req, res) => {
    try {
        const userId = req.customer._id
        const productId = req.params.productId
        const currentUser = await Customer.findById(userId)
        if (!currentUser) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID" })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: " Product Not Found" })
        }
        const inWishList = currentUser.wishlist.some((id) => id.toString() === productId)
        if (!inWishList) {
            return res.status(404).json({ message: "Product Not in WishList" })
        }
        currentUser.wishlist.pull(productId)
        await currentUser.save()
        res.status(201).json({ success: true, message: "Product removed from wishlist" })
    } catch (error) {
        res.status(500).json({ message: 'Internal server crash' })
    }

}

export const toggleWishList = async (req, res) => {
    try {
        const userId = req.customer._id
        const productId = req.params.productId
        const currentUser = await Customer.findById(userId)
        if (!currentUser) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid Product ID" })
        }
        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({ message: " Product Not Found" })
        }
        const alreadyInWishList = currentUser.wishlist.some((id) => id.toString() === productId)
        if (alreadyInWishList) {
            currentUser.wishlist.pull(productId)
            await currentUser.save()
            return res.status(200).json({
                success: true,
                message: "Product removed from wishlist",
                wishlisted: false
            });

        }
        else {
            currentUser.wishlist.push(productId)
            await currentUser.save()
            return res.status(200).json({
                success: true,
                message: "Product added to wishlist",
                wishlisted: true
            });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server crash' })
    }

}