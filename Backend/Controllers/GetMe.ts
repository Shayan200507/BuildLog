
import { pool} from "../Database/Connection.ts"
import {json, type Request,type Response} from "express"

export async  function getMe(req: Request, res:Response){
    console.log("get me controller")
  
   const uid:number = req.session.userID as number


   try{
   const userObj = await pool.query(`
    SELECT first_name,last_name,email,username FROM users
    WHERE
    id = $1

   `,[uid])

   res.json(userObj.rows[0])

   }
   catch(error){
    console.log(error)
   }
   



}