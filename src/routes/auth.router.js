import { Router } from "express";
import {logIn, logOut, signUp, getProfile, changePassword } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const route = Router();

route.post('/signup', signUp)
route.post('/login', logIn)
route.get('/logout', logOut)
route.post('/changePIN', changePassword)

route.post('/profile', isLoggedIn ,  getProfile)

export default route

