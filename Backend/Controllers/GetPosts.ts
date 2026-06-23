

import type { Request,Response } from "express";
import {pool} from "../Database/Connection.ts"


export async function getPosts(req:Request, res:Response){
    const blogdata = req.params 
   
   
    const blogid:number = Number(blogdata.blog_id)
    if(Number.isNaN(blogid)){
        throw "Blog id is invalid"
    }

    try{


    const data = await pool.query(`
        
        SELECT blogs.name,posts.post_id,posts.title,posts.created_at,posts.imgurl,tags.tag_title FROM posts 
        LEFT JOIN blogs ON
        blogs.blog_id = posts.blog_id
        LEFT JOIN tags_post ON
        tags_post.post_id = posts.post_id
        LEFT JOIN tags ON 
        tags.tag_id = tags_post.tag_id

        WHERE posts.blog_id = $1;

    
        `,[blogid])

        res.json(data.rows)


    }
    catch(error){
    
    }



}