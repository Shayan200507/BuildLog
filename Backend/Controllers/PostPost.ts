

import type { Request, Response } from "express";
import { pool } from "../Database/Connection.ts";
import sanitizeHtml from "sanitize-html";


const DEFAULT_POST_IMAGE_URL = "http://localhost:8000/uploads/post-images/default-post.png";


type tagElement = {
    tag_id: number
    tag_title: string
}

type createPostInputs = {
  blog_id: string
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
    const dataBody:createPostInputs = {blog_id: req.body.blog_id,
        title: req.body.Title, body: req.body.Body, tags: JSON.parse(req.body.tags)

    }
    
    
    const client = await pool.connect()

    try{
        
        let inputData:databaseInput
        if(req.file){
            inputData = {
                blog_id: Number(dataBody.blog_id),
                title: dataBody.title,
                body: dataBody.body,
                imageUrl:imgUrlPrefix +req.file.path,
                tags: dataBody.tags.map((Element)=>{return Element.tag_id})
            }
        }
        else{
              inputData = {
                blog_id: Number(dataBody.blog_id),
                title: dataBody.title,
                body: dataBody.body,
                imageUrl:defaultImgUrl,
                tags: dataBody.tags.map((Element)=>{return Element.tag_id})
            }

        }
    

          await client.query("BEGIN")

        const returnData = await pool.query(`
            
            INSERT INTO posts(blog_id,title,body,imgurl)
            SELECT $1,$2,$3,$4

            RETURNING posts.post_id

            
            `,[inputData.blog_id,inputData.title,inputData.body,inputData.imageUrl])


        const currentID:number = returnData.rows[0].post_id
        
        const tags_postsReturnData = await pool.query(`
             
            INSERT INTO tags_posts(post_id,tag_id)  SELECT
            $1,tagID FROM UNNEST($2::int[]) as tagID
            
            
            
            `,[currentID,inputData.tags])


        await client.query("COMMIT")

        res.json({ post_id: currentID })

    }
    catch(error){
          await client.query("ROLLBACK")
        console.error(error)
        res.status(500).json({message:"Internal Server error"})
    }
    finally{
        client.release()
    }
   




}
