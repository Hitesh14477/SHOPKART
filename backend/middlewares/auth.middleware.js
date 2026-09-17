import jwt from 'jsonwebtoken'

import Customer from '../models/customer.model.js'

const isAuthenticated = async (req,res,next) => {
    try{
        const token = req.cookies.token
        if(!token){
          return  res.status(401).json({message:'No Token Found'})
        }
        const decoded=jwt.verify(token,process.env.jwt_secret)
        const customer=await Customer.findById(decoded.userId).select("_id fullName email phone")
        if(!customer){
         return res.status(404).json({message : 'No customer found'})
        }
        req.customer=customer
        next()
    }
    catch(error){
        console.log(error)
       res.status(500).json({message : 'Internal server crashed'}) 
    }
}

export default isAuthenticated 