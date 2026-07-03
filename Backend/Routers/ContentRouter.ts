import  Express  from "express";
import {getBlogs} from "../Controllers/GetBlogs.ts"
import {LoggedInCheck} from "../Middleware/LoggedInCheck.ts"
import {PostBlog} from "../Controllers/PostBlog.ts"
import {getPosts} from "../Controllers/GetPosts.ts"
import {getPostInfo} from "../Controllers/GetPostInfo.ts"
import { getLatestPost } from "../Controllers/GetLatestPosts.ts";
import {getLikeStatus} from "../Controllers/GetLikeStatus.ts"
import {changeLikeStatus} from "../Controllers/ChangeLikeStatus.ts"
import {getLikedPosts} from "../Controllers/GetLikedPosts.ts"
import {getTags} from "../Controllers/GetTags.ts"


export const ContentHandler = Express.Router()



ContentHandler.get("/blogs",LoggedInCheck,getBlogs)
ContentHandler.post("/postBlog",LoggedInCheck,PostBlog)
ContentHandler.get("/posts/:blog_id",LoggedInCheck,getPosts)
ContentHandler.get("/postsInfo/:post_id",LoggedInCheck,getPostInfo)
ContentHandler.get("/latestPosts", getLatestPost)
ContentHandler.get("/postsLikeInfo/:post_id",getLikeStatus)
ContentHandler.post("/updateLikeStatus/:post_id",LoggedInCheck,changeLikeStatus)
 ContentHandler.get("/getLikedPosts",LoggedInCheck,getLikedPosts)
 ContentHandler.get("/getTags",getTags)