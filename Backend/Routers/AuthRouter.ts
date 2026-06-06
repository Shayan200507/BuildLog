import express from "express"
import type  { Express,Router} from "express"
import { getRegistered } from "../Controllers/GetRegistered"



export const AuthHandler: Router = express.Router()


AuthHandler.post("/register",getRegistered)


