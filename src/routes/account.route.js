import { Router } from "express";
import { createAccount, getAccountDetails } from "../controllers/account.controller.js";

const route = Router()

route.get('/createaccount' , createAccount)
route.post('getacc', getAccountDetails)

export default route