import Customer from '../models/customer.schema'
import asyncHandler from "../services/asyncHandler";
import Account from '../models/account.schema'

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
    res.status(200).json({
        success : true,
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
    res.send(200).json({
        success : true,
        checkUser
    })
})

