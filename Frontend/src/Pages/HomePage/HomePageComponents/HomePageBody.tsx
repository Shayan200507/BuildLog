
import type React from "react";
import type {responseType} from "../../Universal_Types/responseType"
import { useState, useEffect } from "react";
import { PostCard } from "../../Universal_Containers/PostCard";


type BlogPostRow = {
    post_id: number
    title: string
    body: string
    imgurl: string | null
    username: string
    email: string
    first_name: string
    last_name: string
    name: string //blog name
    tags: string[]
}

type GetPostsResponse = BlogPostRow[]

export function HomePageBody(props: {userInfo: responseType|undefined}):React.JSX.Element{
   
const [postsData,setPostsData] = useState<GetPostsResponse>([])


useEffect(()=>{
   fetch("http://localhost:8000/api/content/latestPosts",{
    credentials: "include",
     method: "GET"
   }).then((res) =>{
    if(res.ok){ return res.json()}
    throw "internal error"
   }).then((data:GetPostsResponse) => {setPostsData(data)})



},[])

const renderedPostsData = postsData.map((post) => (
  <PostCard post={post} key={post.post_id} />
))

  

  const name:string = props.userInfo?.username ?? "Guest"
   
  const outString = `Welcome ${name}`
  


 
return(



  <>
  <div className="Greeting">
    <h1>{outString}</h1>
  </div>





   <div className="postsListContainer">
      <ul className="postsList">
        {renderedPostsData}

      </ul>
    </div>
  
  
  
  
  
  </>



)



}
