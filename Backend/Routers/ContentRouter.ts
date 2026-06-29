import  Express  from "express";
import {getBlogs} from "../Controllers/GetBlogs.ts"
import {LoggedInCheck} from "../Middleware/LoggedInCheck.ts"
import {PostBlog} from "../Controllers/PostBlog.ts"
import {getPosts} from "../Controllers/GetPosts.ts"
import {getPostInfo} from "../Controllers/GetPostInfo.ts"



export const ContentHandler = Express.Router()



ContentHandler.get("/blogs",LoggedInCheck,getBlogs)
ContentHandler.post("/postBlog",LoggedInCheck,PostBlog)
ContentHandler.get("/posts/:blog_id",LoggedInCheck,getPosts)
ContentHandler.get("/postsInfo/:post_id",LoggedInCheck,getPostInfo)


