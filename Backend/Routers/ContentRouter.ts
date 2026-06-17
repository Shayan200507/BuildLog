import  Express  from "express";
import {getBlogs} from "../Controllers/GetBlogs.ts"
import {LoggedInCheck} from "../Middleware/LoggedInCheck.ts"


export const ContentHandler = Express.Router()



ContentHandler.get("/blogs",LoggedInCheck,getBlogs)


