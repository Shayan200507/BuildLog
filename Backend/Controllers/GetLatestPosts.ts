
import type { Request, Response } from "express";
import {pool} from "../Database/Connection.ts"

export async function getLatestPost(req:Request, res:Response){

    try{ 

         const latestPosts =  await pool.query(`
            
        SELECT  posts.post_id,  posts.title, posts.body, posts.imgurl, users.username, users.email, users.first_name,  users.last_name, blogs.name,  
            COALESCE(
             array_agg(tags.tag_title) FILTER (WHERE tags.tag_title is NOT NULL),'{}' 
            ) AS tags
            
            FROM posts
            LEFT JOIN blogs ON
            blogs.blog_id = posts.blog_id
            LEFT JOIN users ON
            users.id = blogs.user_id

            LEFT JOIN tags_posts ON
            tags_posts.post_id = posts.post_id
              LEFT JOIN tags ON 
              tags.tag_id = tags_posts.tag_id





            GROUP BY
            posts.title, 
            posts.body,
            posts.post_id, 
            posts.imgurl, 
            users.username, 
            users.email, 
            users.first_name,  
            users.last_name, blogs.name,posts.created_at


            
            ORDER BY posts.created_at DESC
            LIMIT 5
            
            
            
            
            `)


            res.json(latestPosts.rows)



    }
    catch(error){
        console.error(error)
    }

}