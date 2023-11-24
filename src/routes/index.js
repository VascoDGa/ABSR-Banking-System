import { Router } from "express";
import authRoutes from './auth.router.js'
import accRoute from './account.route.js'
import transRoute from './transaction.route.js'

const route = Router()

route.use('/auth' , authRoutes)
route.use('/account', accRoute)
route.use('/transaction' , transRoute)

export default route