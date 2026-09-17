
import Customer from "../models/customer.model.js";
import bcrypt, { hash } from 'bcrypt'
import genToken from "../utils/genToken.js";
const cookieOptions = {
    httpOnly: true,
}

export const registerCustomer = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'All field are mandatory' })
        }

        const emailExist = await Customer.findOne({ email })
        if (password.length < 6 && emailExist) {
            return res.status(400).json({ message: 'password length >= 6 and email already exist' })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password too short: password length should be atleast 6 ' })
        }
        if (emailExist) {
            return res.status(409).json({ message: 'Email already exist' })
        }

        // if (!(/\d/.test(password))) {
        //     return res.status(400).json({ message: 'password should contain atleast 1 number' })
        // }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newCustomer = await Customer.create({ name, email, password: hashedPassword, phone })
        // creating token only after creating customer
        const token = genToken(newCustomer._id)
        res.cookie("token", token, cookieOptions)


        res.status(201).json({
            success: true, message: "Customer registered successfully", customer: {
                _id: newCustomer._id,
                name: newCustomer.name,
                email: newCustomer.email,
                phone: newCustomer.phone
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server crash' })
    }
}

export const loginCustomer = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'All field are mandatory' })
        }
        const customerExist = await Customer.findOne({ email })
        if (!customerExist) {
            return res.status(401).json({ message: 'user email not found' })
        }

        const correctPassword = await bcrypt.compare(password, customerExist.password)

        if (!correctPassword) {
            return res.status(401).json({ message: 'Incorrect Password' })
        }
        const token = genToken(customerExist._id)
        res.cookie("token", token, cookieOptions)
        res.status(200).json({ success: true, message: "Login successful" ,customer:customerExist})

    }
    catch (error) {
        res.status(500).json({ message: 'Internal server crash' })
    }

}


export const getCustomer = (req, res) => {
    res.status(200).json({success:true,customer:req.customer})
}

export const logoutCustomer = (req, res) => {
    res.clearCookie("token", cookieOptions);

    res.status(200).json({
        success: true,
        message: "Logout successful",
    });
}
