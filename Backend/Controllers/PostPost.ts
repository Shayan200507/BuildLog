

import type { Request, Response } from "express";
import { pool } from "../Database/Connection.ts";
import sanitizeHtml from "sanitize-html";


const DEFAULT_POST_IMAGE_URL = "http://localhost:8000/uploads/post-images/default-post.png";


type tagElement = {
    tag_id: number
    tag_title: string
}

type createPostInputs = {
  blog_id: number
  title: string
  body: string
  image?: string | null
  tags: tagElement[]
}

type  databaseInput = {
  blog_id: number
  title: string
  body: string
  imageUrl: string
  tags: number[]
}

const defaultImgUrl = `http://localhost:8000/uploads/post-images/default-post.png`
const imgUrlPrefix = `http://localhost:8000/`

export async function PostPost(req:Request, res:Response){

    const dataBody:createPostInputs = req.body
    const client = await pool.connect()

    try{
        
        let inputData:databaseInput
        if(req.file){
            inputData = {
                blog_id: dataBody.blog_id,
                title: dataBody.title,
                body: dataBody.body,
                imageUrl:imgUrlPrefix +req.file.path,
                tags: dataBody.tags.map((Element)=>{return Element.tag_id})
            }
        }
        else{
              inputData = {
                blog_id: dataBody.blog_id,
                title: dataBody.title,
                body: dataBody.body,
                imageUrl:defaultImgUrl,
                tags: dataBody.tags.map((Element)=>{return Element.tag_id})
            }

        }
    

          await client.query("BEGIN")

        const returnData = await pool.query(`
            
            INSERT INTO posts(blog_id,title,body,imgurl)
            SELECT $1,$2,$3,$4,tag_id FROM UNNEST($5::int[]) AS tag_id

            RETURNING posts.post_id

            
            `,[inputData.blog_id,inputData.title,inputData.body,inputData.imageUrl,inputData.tags])


        await client.query("BEGIN")

    }
    catch(error){
          await client.query("BEGIN")
        console.log(error)
        res.status(500).json({message:"Internal Server error"})
    }
    finally{
        client.release()
    }
   




}
