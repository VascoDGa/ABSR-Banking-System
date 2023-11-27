import mongoose from "mongoose";

const accountDetails = new mongoose.Schema({
    accId : {
        type : Number
    },
    custId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Customer",
        required : true
    },
    accType : {
        type : String
    },
    accNum : {
        type : String
    },
    balance : {
        type : Number,
        default : 0
    }
} , {timestamps : true})

export default mongoose.model("Account" , accountDetails)