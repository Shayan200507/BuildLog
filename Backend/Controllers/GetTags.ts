


import type { Request, Response } from "express";
import {pool} from "../Database/Connection.ts"


export async function getTags(req:Request, res:Response){


   try{
       

    const tagsData = await pool.query(`
        
        
        SELECT * FROM tags
        
        
        
        
        
        
        `,[])



        res.json(tagsData.rows)



   }
   catch(error){

    console.error(error)
    res.status(500).json({message: "internal server error"})
   }




}