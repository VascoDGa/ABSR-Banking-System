import JWT from 'jsonwebtoken'
import Customer from '../models/customer.schema.js'
import asyncHandler from '../services/asyncHandler.js'
import config from '../config/index.js'
import { getProfile } from '../controllers/auth.controller.js'

export const isLoggedIn = asyncHandler(async(req, res, next) => {
    let token
    if(req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer "))) {
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if(!token) {
        return res.status(404).json({
            success : "false",
            message : "Sorry, could not enter"
        })
    }

    try {
        const decodeToken = JWT.decode(token , config.JWT_SECRET)
        req.user = await Customer.findById(decodeToken._id, "accno pin")
        next()
    } catch(err) {
        console.error("Sorry, could not enter")
    }
    
})
