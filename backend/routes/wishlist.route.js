import express from "express";
import { addToWishList, getWishList, removeFromWishList, toggleWishList } from "../controllers/wishlist.controller.js";
import isAuthenticated from "../middlewares/auth.middleware.js";

const wishlistRoutes=express.Router()

wishlistRoutes.post('/:productId',isAuthenticated,addToWishList)
wishlistRoutes.get('/',isAuthenticated,getWishList)
wishlistRoutes.delete('/:productId',isAuthenticated,removeFromWishList)
wishlistRoutes.patch('/:productId/toggle',isAuthenticated,toggleWishList)

export default wishlistRoutes

