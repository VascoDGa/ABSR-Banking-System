import { Router } from "express";
import {logIn, logOut, signUp, getProfile } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const route = Router();

route.get('/signup', signUp)
route.post('/login', logIn)
route.get('/logout', logOut)

route.get('/profile', isLoggedIn, getProfile)

export default route

