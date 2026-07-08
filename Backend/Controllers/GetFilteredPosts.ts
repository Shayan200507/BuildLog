import type { Request, Response } from "express";
import { pool} from "../Database/Connection.ts"


type tagElement = {
    tag_id: number
    tag_title: string
}



export async function getFilteredPosts(req:Request, res: Response){
         const inputData: tagElement[] = req.body
        const tagids = inputData.map((Element) =>Element.tag_id)
     try{
           const  returnData = await pool.query(`
             
           SELECT  posts.post_id,  posts.title, posts.body, posts.imgurl, blogs.name,  
            COALESCE(
             array_agg(tags.tag_title) FILTER (WHERE tags.tag_title is NOT NULL),'{}' 
            ) AS tags
            
            FROM posts

            LEFT JOIN blogs ON
            posts.blog_id = blogs.blog_id 
            LEFT JOIN tags_posts ON
            posts.post_id = tags_posts.post_id
            LEFT JOIN tags ON
            tags.tag_id = tags_posts.tag_id

            WHERE tags.tag_id = ANY($1::int[])

            GROUP BY 
            posts.post_id,  
            posts.title, 
            posts.body, 
            posts.imgurl, 
         
            blogs.name,
            posts.created_at

            HAVING COUNT(tags.tag_id) = $2
            ORDER BY posts.created_at DESC

            
            
            
            `,[tagids,tagids.length])


            res.json(returnData.rows)

     }
     catch(error){
        console.log(error)
        res.status(500).json({message: "Internal server error"})
     }





}