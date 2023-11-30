import Customer from '../models/customer.schema.js'
import asyncHandler from "../services/asyncHandler.js";
import Account from '../models/account.schema.js'
import {ObjectId} from 'mongodb'

export const cookieOptions = {
    expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly : true
}

export const signUp = asyncHandler(async(req,res) => {
    const {name, email, phno, address, age} = req.body
    if(!name || !email || !phno) {
        throw new Error("Please enter valid credentials")
    }
    const existingUser = await Customer.findOne({phNo:`${phno}`})
    if(existingUser) {
        throw new Error("User already exists")
    }
    let accNo  = ""
    
    
    for(let i = 0 ; i < 4 ; i++) {
        let randNo = Math.floor(Math.random() * 26)
        accNo = accNo + String.fromCharCode(65 + randNo)
    }
    for(let i = 0 ; i < 8 ; i++) {
        let randNo = Math.floor(Math.random() * 10)
        accNo += Number(randNo);
    }
    const newUser = await Customer.create({
        name,
        email,
        phNo : phno,
        address,
        age,
    })
    const cust = await Customer.findOne({phNo:phno})
    const custId = cust._id

    const newAccount = await Account.create({
        accNum : `${accNo}`,
        custId
    })

    const token = cust.getJWTToken()

    res.cookie("token", token , cookieOptions)

    res.status(200).json({
        success : true,
        token,
        newUser,
        newAccount
    })
})

export const logIn = asyncHandler( async(req , res) => {
    const {accNo , pin} = req.body;
    if(!accNo || !pin)
        throw new Error("Enter valid credentials")
    const checkUser = await Account.findOne({accNum: `${accNo}`})
    //const validCred = checkUser.pin === pin
    if(!checkUser) {
        throw new Error("Could not find user")
    }
    const custId = checkUser.custId
    const customer = await Customer.findById(custId)
    //const checkpin = customer.pin === pin
    if(!(customer.pin == pin)){
        return res.status(400).json({
            success: false,
            message : "User does not exist"
        })
    }
    const token = customer.getJWTToken()
    res.cookie("token", token , cookieOptions)
    res.status(200).json({
        success : true,
        token,
        customer
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
    const {custId} = req.body;
    try {
        if(!custId) {
            return res.status(404).json({
                success : "false",
                message : "Please enter customer ID"
            })
        }
        const user = await Customer.findById(custId)
        if(!user) {
            return res.status(404).json({
                success : "false",
                message : "User does not exist in database"
            })
        }
        const accNo = await Account.findOne({ custId : `${custId}`})
        res.status(200).json({
            success : true,
            user,
            accNo
        })
    }
    catch(err) {
        console.error(err)
    }
})

export const changePassword = asyncHandler(async(req , res) => {
    const {accno, pin, updatedPin} = req.body
    if(!pin) {
        console.error("Please enter valid pin")
    }
    const findUser = await Account.findOne({accNum : `${accno}`})
    if(!findUser.pin === pin || !findUser) {
        return res.status(404).json({
            success : "false",
            message : "Wrong PIN"
        })
    }
    const customerID = findUser.custId
    const checkUser = await Customer.findById(customerID)
    if(!checkUser) {
        return res.status(404).json({
            success : "false",
            message : "Account not found"
        })
    }
    const updatedPIN  = await checkUser.updateOne({ pin : `${updatedPin}`})
    // await findUser.save()
    res.status(200).json({
        success : true
    })
})