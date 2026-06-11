
import {json, type Request,type Response} from "express"


export function getLogout(req: Request, res:Response){
    req.session.destroy(()=>{res.json({message: "logged out"})})
    return
}