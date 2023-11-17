import { Router } from "express";
import { createAccount, getAccountDetails } from "../controllers/account.controller";

const route = Router()

route.get('/createaccount' , createAccount)
route.post('getacc', getAccountDetails)

export default route