import mongoose from "mongoose";

const customerDetails = new mongoose.Schema({
    name : {
        type : String,
        required : [true , "Username is required"],
        trim : true,
        maxLength : [80 , "Username must not exceed 80 characters"]
    },
    email : {
        type : String,
        required : [true , "Email is required"],
        trim : true,
    },
    phNo : {
        type : Number,
        required : [true , "Phone number is required"]
    },
    address : {
        type : String,
        required : [true, "Address is required"]
    },
    custId : {
        type : Number
    },
    pin : {
        type : Number,
        default : 1234
    }
}, {timestamps : true})

export default mongoose.model("Customer" , customerDetails)