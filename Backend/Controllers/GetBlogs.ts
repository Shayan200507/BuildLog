
import type { Request, Response } from "express";
import { pool} from "../Database/Connection.ts"

export async function getBlogs(req:Request, res:Response){

   const uid:number = req.session.userID as number



   try{
   const blogsData = await pool.query(`
    SELECT *  FROM blogs WHERE 
    user_id = $1
    
    
    
    
    
    
    `,[uid])

    res.json(blogsData.rows)

   }
   catch(error){
    console.log(error)
   }






}
