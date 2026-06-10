
import { pool} from "../Database/Connection.ts"
import {json, type Request,type Response} from "express"

export async  function getMe(req: Request, res:Response){
  
   const uid:number = req.session.userID as number


   try{
   const userObj = await pool.query(`
    SELECT first_name,last_name,email,username FROM users
    WHERE
    id = $1

   `,[uid])

   console.log(userObj)

   }
   catch(error){
    console.log(error)
   }
   finally{ await pool.end()}



}