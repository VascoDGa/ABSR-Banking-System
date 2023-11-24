import Account from '../models/account.schema.js'
import asyncHandler from '../services/asyncHandler.js'

// export const createAccount = asyncHandler(async(req , res) => {
//     let {phno} = req.body
//     let accNo = ""
    
//     const newAcc = await Account.create({
//         accNum : accNo,
//     })
//     res.status(200).json({
//         success : true,
//         message : "Account created successfully",
//         newAcc
//     })
// })

// export const getAccountDetails = asyncHandler(async(req, res) => {
//     const {phno} = req.body
//     if(!phno) {
//         throw new Error("Please enter a valid phone number")
//     }

//     const user = await Account.findOne({phno})
//     if(!user) {
//         throw new Error("User not found")
//     }

//     res.status(200).json({
//         success : true,
//         user
//     })
// })

export const newDeposit = asyncHandler( async ( req, res) => {
    const {accNo , amount} = req.body
    const updateDepositBalance = await Account.findOneAndUpdate({accNum : `${accNo}`} , {balance : `${balance+amount}`})
    if(!updateDepositBalance)
        console.error("Could not find account")
    res.status(200).json({
        success : true,
        updateDepositBalance
    })
})

export const newWithdrawal = asyncHandler(async(req, res) => {
    const {accNo, amount} = req.body
    const findAcc = await Account.findOne({accNum : `${accNo}`})
    const checkBalance = findAcc.balance > amount
    if(!checkBalance) {
        return res.status(400).json({
            success : false,
            message : "Not enough money in account"
        })
    }
    findAcc.balance = findAcc.balance - amount
    res.status(200).json({
        success : true, 
        findAcc
    })
})