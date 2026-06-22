

import type { Request,Response } from "express";
import {pool} from "../Database/Connection"


export async function getPosts(req:Request, res:Response){
    console.log("getting posts")
}