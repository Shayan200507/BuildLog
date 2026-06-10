import {json, type Request,type Response} from "express"
import type { NextFunction } from "express";

export function LoggedInCheck(req:Request, res: Response,next: NextFunction ){


    if(!req.session.userID){ res.status(401).json({error: 'Unauthorized' });return}
    else{ next()}

}