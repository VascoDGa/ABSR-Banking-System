import { Router } from "express";
import {logIn, signUp } from "../controllers/auth.controller";

const route = Router();

route.get('/signup', signUp)
route.post('/login', logIn)

export default route

