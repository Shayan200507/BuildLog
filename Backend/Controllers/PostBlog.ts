
import type { Request, Response } from "express";
import { pool} from "../Database/Connection.ts"
import sanitizeHtml from "sanitize-html";





type BodyType = {
    name: string
    description: string
}

export async  function PostBlog(req:Request ,res:Response){
    console.log("creating blog")

    const userDate: BodyType= req.body 



  try{
    const writeDate = await pool.query(` INSERT INTO blogs(name,description) VALUES($1,$2)`,[userDate.name,userDate.description])
  }
  catch(error){
    console.log(error)
  }


}

