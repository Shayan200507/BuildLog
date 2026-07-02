
import type React from "react";
import type {responseType} from "../../Universal_Types/responseType"
import { useState, useEffect } from "react";
import likeLogo from "../../../assets/like-icons/heart-outline.svg"
import likedLogo from "../../../assets/like-icons/heart-filled.svg"

import { useNavigate } from "react-router";


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

const navigate = useNavigate()

useEffect(()=>{
   fetch("http://localhost:8000/api/content/latestPosts",{
    credentials: "include",
     method: "GET"
   }).then((res) =>{
    if(res.ok){ return res.json()}
    throw "internal error"
   }).then((data:GetPostsResponse) => {setPostsData(data)})



},[])

const renderedPostsData=postsData.map((Element)=>{return <li className="postsListElement" key={Element.post_id}><button className="navigateBtn" onClick={() => navigate(`/readPost/${Element.post_id}`)}>
        
        

         <img src={Element.imgurl as string} alt={Element.title} />
        <div className="elementDetails">
        <h1>{Element.title}</h1>    
        <p>{Element.name}</p>
        <div className="subrowContainer">
        <ul className="tagsList">{Element.tags.map((tagElement)=>{return <li className="tagElement" key={tagElement}>{tagElement}</li>})}</ul>
        <img className="likeimg"  src={likeLogo}/>
        </div>
        
        </div>
        
       
        
        
        </button></li> })

  

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
