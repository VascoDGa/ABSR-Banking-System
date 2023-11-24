import { Router } from "express";
import { newTransactionDetails, getAllTransaction } from "../controllers/transaction.controller.js";

const route = Router()

route.post('/newtrans', newTransactionDetails)
route.post('/gettrans', getAllTransaction)

export default route