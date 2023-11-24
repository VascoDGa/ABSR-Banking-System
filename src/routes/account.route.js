import { Router } from "express";
import { createAccount, getAccountDetails , newDeposit , newWithdrawal } from "../controllers/account.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const route = Router()

// route.get('/createaccount' , createAccount)
// route.post('/getacc', isLoggedIn ,  getAccountDetails)
route.post('/deposit', isLoggedIn ,  newDeposit)
route.post('/withdraw', isLoggedIn , newWithdrawal)

export default route