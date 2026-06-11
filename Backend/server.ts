import express from "express"
import session from "express-session";
import dotenv from "dotenv"
import type  { Express} from "express"
import {AuthHandler } from "./Routers/AuthRouter.ts"
import cors from "cors";



const server: Express = express()
const PORT:number = 8000

dotenv.config()
server.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
server.use(express.json())
server.use(session({
    secret: process.env.SPIRAL_SESSION_SECRET|| 'dev-secret' ,
    resave: false,
    saveUninitialized: false,
    cookie: {

      httpOnly: true,
      secure: false,
      sameSite: "lax"
    }

}))


//Auth Route
server.use("/api/auth",AuthHandler)


//error handling
server.use((req,res)=>{

  res.status(404).json({

     error: "request not found"

  })

})




server.listen(PORT,()=>{console.log(`connected to port: ${PORT}` )}).on('error', (err) => {
  console.error('Failed to start server:', err)
}) 


