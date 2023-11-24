import Customer from '../models/customer.schema.js'
import asyncHandler from "../services/asyncHandler.js";
import Account from '../models/account.schema.js'

export const cookieOptions = {
    expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly : true
}

export const signUp = asyncHandler(async(req,res) => {
    const {name, email, phno, address, age} = req.body
    if(!name || !email || !phno) {
        throw new Error("Please enter valid credentials")
    }
    const existingUser = await Customer.findOne({phno})
    if(existingUser) {
        throw new Error("User already exists")
    }
    const newUser = await Customer.create({
        name,
        email,
        phNo : phno,
        address,
        age
    })

    const token = newUser.getJWTtoken()

    res.cookie("token", token , cookieOptions)

    res.status(200).json({
        success : true,
        token,
        newUser
    })
})

export const logIn = asyncHandler( async(req , res) => {
    const {accNo , phno} = req.body;
    if(!name || !phno)
        throw new Error("Enter valid credentials")
    const checkUser = await Customer.findOne({phno})
    if(!checkUser){
        return res.status(400).json({
            success: false,
            message : "User does not exist"
        })
    }
    const token = checkUser.getJWTtoken()
    res.cookie("token", token , cookieOptions)
    res.send(200).json({
        success : true,
        token,
        checkUser
    })
})

export const logOut = asyncHandler(async( req, res) => {
    res.cookie("token", null, {
        expires : new Date(Date.now()),
        httpOnly : true
    })
    res.status(200).json({
        success : true,
        message : "Logged Out"
    })
})

export const getProfile = asyncHandler(async(req , res) => {
    const {user} = req;

    if(!user) {
        console.error("User not found")
    }

    res.status(200).json({
        success : true,
        user
    })
})

