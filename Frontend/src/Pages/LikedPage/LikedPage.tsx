import "./LikedPage.css"
import {NavBar} from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import {PostCard} from "../Universal_Containers/PostCard"


import type {PostCardData} from "../Universal_Types/postCardData"




export function LikedPage(){
    const navigate = useNavigate()

      const [userDetails,setUserDetails] = useState<responseType>()
      const [likedPostsList,setLikedPostsList] =  useState<PostCardData[]>()
        
    
       
    
        useEffect(() =>{
              fetch("http://localhost:8000/api/auth/me", {
            method: "GET",
             credentials: "include",
            }).then((res:Response) => {
    
                 if(res.ok){console.log("thinks lloggedin"); return res.json()}
                 else{ throw new Error("Not logged in");}
    
    
    
            }).then((data:responseType) => {setUserDetails(data);})
            .catch((error) => {console.log(error);navigate("/signup")})
    
            
    
    
        },[])


        useEffect(()=>{
             fetch("http://localhost:8000/api/content/getLikedPosts", {
  method: "GET",
  credentials: "include",
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch liked posts");
    }

    return res.json();
  })
  .then((data:PostCardData[]) => {
     setLikedPostsList(data)
  })
  .catch((error) => {
    console.error(error);
  });





        },[likedPostsList])





const renderLikedPostsList = likedPostsList?.map((Element)=>{return <PostCard post={Element}/>})







    return(

<div className="LikedPageContainer">
    <NavBar  userInfo={userDetails} page="Liked"/>


    <div className="likedPostsListContainer">
        
           <ul  className="likedPostsList">{renderLikedPostsList}</ul>


    </div>


</div>
    )




}
