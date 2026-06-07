import express from "express"
import type  { Express,Router} from "express"
import { getRegistered } from "../Controllers/GetRegistered.ts"



export const AuthHandler: Router = express.Router()


AuthHandler.post("/register",getRegistered)

AuthHandler.use((req,res)=>{res.status(404).json({message: "Endpoint not found"})})
