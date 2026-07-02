
import type { Request, Response } from "express";
import {pool} from "../Database/Connection.ts"


export async function getLikeStatus( req: Request, res: Response){

    const {post_id} = req.params


    try{

        const likeCount = await pool.query(`
            
            SELECT COUNT(*) AS like_count FROM like_table WHERE
            post_id = $1;

        
            
            
            `,[post_id])



        if(req.session.userID){    

        const likeStatus = await pool.query(`
            
            SELECT EXISTS(
            SELECT * FROM like_table
            WHERE
            post_id = $1  AND
            user_id = $2
            
            ) AS "likedByUser"
                 
            `,[post_id,req.session.userID])


        res.json({
      
            ...likeCount.rows[0],
            ...likeStatus.rows[0] 
        });return



        }
        else{
            res.json(likeCount.rows[0]);return
        }


        
        
     

    }
    catch(error){
        console.error(error)
        res.status(500).json({message: "internal server error"})


    }



}
