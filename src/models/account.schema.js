import mongoose from "mongoose";

const accountDetails = new mongoose.Schema({
    accId : {
        type : Number
    },
    custId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Customer"
    },
    accType : {
        type : String
    },
    accNum : {
        type : String
    },
    balance : {
        type : Number
    }
} , {timestamps : true})

export default mongoose.model("Account" , accountDetails)