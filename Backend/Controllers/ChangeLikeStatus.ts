


import type { Request, Response } from "express";
import {pool} from "../Database/Connection.ts"


export async function changeLikeStatus(req: Request, res:Response){
 const {post_id} = req.params

try{
    
     const currentStatus = await pool.query(`
        
        SELECT EXISTS(SELECT * FROM like_table
            WHERE
            post_id = $1  AND
            user_id = $2
            
            ) AS "likedByUser";


       
        
        
        `,[post_id,req.session.userID])




    if(currentStatus.rows[0].likedByUser){
        await pool.query(`
            DELETE FROM like_table WHERE
            post_id = $1  AND
            user_id = $2
            
            
            
            `,[post_id,req.session.userID])
    }
    
    else{
        await pool.query(`
            
            INSERT  INTO like_table (post_id,user_id)  VALUES($1,$2)
            
            
            `,[post_id,req.session.userID])



    }


    return res.status(200).json({
  likedByUser: !currentStatus.rows[0].likedByUser
});


        



}
catch(error){
    console.error(error)
   res.status(500).json({message: "internal server error"})
}


}
