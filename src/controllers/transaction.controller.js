import Transaction from '../models/transaction.schema.js'
import asyncHandler from '../services/asyncHandler.js'

export const newTransactionDetails = asyncHandler(async(req, res) => {
    const {amount, accId} = req.body
    let transactionId = ""
    for(let i = 0 ; i < 10 ; i++) {
        transactionId = transactionId + num.toString(Math.floor(Math.random() * 10))
    }
    const newTransaction = await Transaction.create({
        accId,
        amount
    })
    res.status(200).json({
        success : true,
        newTransaction
    })
})

export const getAllTransaction = asyncHandler(async(req, res) => {
    const {accId} = req.body
    const getTransactionDetails = await Transaction.find({accId})
})

