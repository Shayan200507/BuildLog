

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
        
        SELECT blogs.name,posts.post_id,posts.title,posts.created_at,posts.imgurl,
        COALESCE(
        array_agg(tags.tag_title) FILTER (WHERE tags.tag_title is NOT NULL),'{}' 
        ) AS tags
        
        
        
        FROM posts 
        LEFT JOIN blogs ON
        blogs.blog_id = posts.blog_id
        LEFT JOIN tags_posts ON
        tags_posts.post_id = posts.post_id
        LEFT JOIN tags ON 
        tags.tag_id = tags_posts.tag_id

        WHERE posts.blog_id = $1

        GROUP BY
          blogs.name,
          posts.post_id,
          posts.title,
          posts.created_at,
          posts.imgurl


    
        `,[blogid])


        res.json(data.rows)


    }
    catch(error){
    console.error(error)
    }



}
