
import {json, type Request,type Response} from "express"

export function getRegistered(req:Request,res:Response){

       console.log("in the backend")
    try{

        const data = req.body
        res.json({message: `data recieved`})
        console.log(data)






    }
    catch(error){

         console.log(error)
         res.status(400).json({message: `error:${error}`})

    }


    console.log("registering")

}