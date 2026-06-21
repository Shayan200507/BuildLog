
import type { Request, Response } from "express";
import { pool} from "../Database/Connection.ts"
import sanitizeHtml from "sanitize-html";





type BodyType = {
    name: string
    description: string
}

export async  function PostBlog(req:Request ,res:Response){
    console.log("creating blog")

    const uid = req.session.userID as number
    const userData: BodyType= req.body 


    const akeys = Object.keys(userData) as (keyof BodyType)[]

    for(const keys of akeys){
      userData[keys] = sanitizeHtml(userData[keys],{allowedTags: [], allowedAttributes: {}})
    }

    console.log(userData.name,userData.description)



  try{

    
    const writeDate = await pool.query(`
      INSERT INTO blogs(name, description, user_id)
      VALUES($1, $2, $3)
      RETURNING blog_id, name, description, created_at
      `,[userData.name,userData.description, uid])

    res.status(201).json(writeDate.rows[0])
  }
  catch(error){
    console.log(error)
      res.status(500).json({ message: "Something went wrong creating the blog" })
    
  }


}
