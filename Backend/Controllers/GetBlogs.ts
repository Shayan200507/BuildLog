
import type { Request, Response } from "express";
import { pool} from "../Database/Connection.ts"

export async function getBlogs(req:Request, res:Response){

   const uid:number = req.session.userID as number



   try{
   const blogsData = await pool.query(`
    SELECT blog_id,
    name,
    description,
    to_char(created_at, 'YYYY-MM-DD') AS date_created,
    to_char(created_at, 'HH24:MI:SS') AS time_created
    
    
    
    FROM blogs WHERE 
    user_id = $1
    
    
    
    
    
    
    `,[uid])

    res.json(blogsData.rows)

   }
   catch(error){
    console.log(error)
   }






}
