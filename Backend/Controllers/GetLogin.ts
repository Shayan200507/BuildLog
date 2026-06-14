import type { Request, Response } from "express";
import {pool} from "../Database/Connection.ts"
import bcrypt from "bcrypt"



type LoginType = {
    username: string
    password: string

}



export async function getLogin(req: Request, res: Response){
   const data:LoginType = req.body
   data.password = data.password.trim()
   data.username = data.username.trim()

 
   try{

        const userData = await pool.query(`
            
            Select id, username, password  FROM users WHERE 
            username =  $1 
            OR
            email = $1
            
            
            
            
            
            `,[data.username])


        if((userData.rowCount ?? 0) == 0) { throw "username or password is incorrect"}


        if(! await bcrypt.compare(data.password,userData.rows[0].password)){
            throw "username or password is incorrect"
        }



        req.session.userID = userData.rows[0].id



        res.status(200).json({message: `Login Successful`})





        
        











   }
   catch(error){
    res.status(401).json({message: `${error}`})
   }







}