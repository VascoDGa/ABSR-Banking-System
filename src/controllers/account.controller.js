import Account from '../models/account.schema'
import asyncHandler from '../services/asyncHandler'

export const createAccount = asyncHandler(async(req , res) => {
    let {phno} = req.body
    let accNo = ""
    for(let i = 0 ; i < 4 ; i++) {
        let randNo = Math.floor(Math.random() * 26)
        accNo = accNo + String.fromCharCode(65 + randNo)
    }
    for(let i = 0 ; i < 8 ; i++) {
        let randNo = Math.floor(Math.random() * 10)
        accNo = accNo +  Number.toString(randNo)
    }
    const newAcc = await Account.create({
        accNum : accNo,
    })
    res.status(200).json({
        success : true,
        message : "Account created successfully",
        newAcc
    })
})

export const getAccountDetails = asyncHandler(async(req, res) => {
    const {phno} = req.body
    if(!phno) {
        throw new Error("Please enter a valid phone number")
    }

    const user = await Account.findOne({phno})
    if(!user) {
        throw new Error("User not found")
    }

    res.status(200).json({
        user
    })
})