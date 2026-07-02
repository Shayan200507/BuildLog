

import type { Request, Response } from "express";
import {pool} from "../Database/Connection.ts"



export async function getLikedPosts( req :Request, res: Response){


    cosnt uid:number = req.session.userID


}
