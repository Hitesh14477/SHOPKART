import express from 'express'
import { registerCustomer ,loginCustomer, getCustomer, logoutCustomer} from '../controllers/customer.controller.js'
import isAuthenticated from '../middlewares/auth.middleware.js'


const router=express.Router()

router.post('/register',registerCustomer)
router.post('/login',loginCustomer)
router.get('/me',isAuthenticated,getCustomer)
router.post('/logout',logoutCustomer)



export default router
