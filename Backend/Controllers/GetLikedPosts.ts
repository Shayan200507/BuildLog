

import type { Request, Response } from "express";
import {pool} from "../Database/Connection.ts"



export async function getLikedPosts( req :Request, res: Response){


    const uid:number = req.session.userID as number



    try{
    const responseData= await pool.query(`
        
        select 
        
        blogs.name,posts.post_id,posts.title,posts.created_at,posts.imgurl,
        COALESCE(
        array_agg(tags.tag_title) FILTER (WHERE tags.tag_title is NOT NULL),'{}' 
        ) AS tags
        
        FROM like_table

        LEFT JOIN posts ON
        posts.post_id = like_table.post_id
        
        LEFT  JOIN blogs ON
        blogs.blog_id = posts.blog_id
        
        LEFT JOIN tags_posts  ON 
        tags_posts.post_id = posts.post_id

        LEFT JOIN tags ON 
        tags.tag_id = tags_posts.tag_id 


        WHERE like_table.user_id = $1
        
        

        GROUP BY
          blogs.name,
          posts.post_id,
          posts.title,
          posts.created_at,
          posts.imgurl,like_table.created_at



        ORDER BY like_table.created_at DESC  
        
        
        `,[uid])


        res.json(responseData.rows)


    }
    catch(error){
        console.error(error)
        res.status(500).json({message: "Internal Server error"})
    }


}
