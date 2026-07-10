
import { pool} from "../Database/Connection.ts"
import {json, type Request,type Response} from "express"



export async function getPostInfo(req: Request, res :Response){

    const {post_id}= req.params


    try{

        const postData = await pool.query(`
            
            SELECT blogs.blog_id,posts.title, posts.body, posts.imgurl, users.username, users.email, users.first_name,  users.last_name, blogs.name,  
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

             WHERE posts.post_id = $1

            GROUP BY
            blogs.blog_id,
            posts.title, posts.body, 
            posts.imgurl, 
            users.username, 
            users.email, 
            users.first_name,  
            users.last_name, blogs.name



            
            
            
            
           
            
            
            
            `,[post_id])


        res.json(postData.rows[0])    


    }
    catch(error){
          console.error(error)
        res.status(500).json({ message: "internal server error"})

    }

}