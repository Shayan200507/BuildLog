import express from "express"
import session from "express-session";
import dotenv from "dotenv"

const server = express()
const PORT = 8000

dotenv.config()

app.use(express.json())
app.use(session({
    secret: process.env.SPIRAL_SESSION_SECRET|| 'dev-secret' ,
    resave: false,
    saveUninitialized: false,
    cookie: {

      httpOnly: true,
      secure: false,
      sameSite: "lax"
    }

}))




server.listen(PORT,()=>{console.log(`connected to port: ${PORT}` )})


