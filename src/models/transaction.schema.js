import mongoose from "mongoose";

const transactionDetails = new mongoose.Schema({
    transactionId : Number,
    accId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Account"
    },
    transactionType : String,
    amount : Number
} , {timestamps : true})

export default mongoose.model("Transaction" , transactionDetails)