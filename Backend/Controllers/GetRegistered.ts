
import {json, type Request,type Response} from "express"
import validator from "validator"
import bcrypt from "bcrypt"
import { pool} from "../Database/Connection.ts"


type Data = {

   dob: Date
   email: string
   password: string
   username: string
First_Name: string
   Last_Name: string

}

const usernameRegex = /^[a-zA-Z0-9_\-]{1,20}$/
const passwordRegex = /^\S{8,}$/

export async function getRegistered(req:Request,res:Response){

     
    try{

        const data:Data = req.body

        data.password = data.password.trim()
        data.email = data.email.trim()
        data.username = data.username.trim()
        data.First_Name = data.First_Name.trim()
        data.Last_Name = data.Last_Name.trim()

       const keys:(keyof Data)[] = Object.keys(data) as (keyof Data)[]

        for (let key of keys ){
            if(data[key] == ""){ res.status(400).json({message: "please fill in all fields"})}

            
            
            if (key == "username"){
                if (!usernameRegex.test(data[key])){
                    res.status(400).json({message: "Username must be 1–20 characters and can only include letters, numbers, underscores (_), or hyphens (-)."});return

                }
            }

            
            
            
            if (key == "password"){
                if(!passwordRegex.test(data[key])){ 

                    res.status(400).json({message: "no spaces allowed in the password and length must be 8 characters"});return

                }
            }


             

            if(key == "email"){

                 if(!validator.isEmail(data[key])){ res.status(400).json({
                 error: 'Invalid email'
                });return

            }

        }


    }




      await writeData(req,data)



        
        res.json({message: `data recieved`})
        

    }
    catch(error){

         console.log(error)
         res.status(400).json({message: `error:${error}`})

    }


   

}



 async function writeData(req: Request,userData:Data){




    try{
  const hashedPass =await  bcrypt.hash(userData.password,10)
    
  
  
     const insertData = await pool.query(`
        
        INSERT INTO users (first_name,last_name,email,username,password,dob)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id

        `,[userData.First_Name,userData.Last_Name,userData.email,userData.username,hashedPass,userData.dob])


        //console.log("insertData:")
        //console.log(insertData)
        req.session.userID = insertData.rows[0].id
        //console.log(req.session.userID)

        


     }


     catch(error){
        console.log(error)
     }
   

}



