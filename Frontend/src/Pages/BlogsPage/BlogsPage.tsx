
import "./BlogsPage.css"
import {NavBar} from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Body, type BlogType } from "./BlogsPageComponents/Body";



type ResponseBlogsType = BlogType[]



export function BlogsPage(){
    const navigate = useNavigate()

      const [userDetails,setUserDetails] = useState<responseType>()
      const [userBlogs,setUserBlogs] = useState<ResponseBlogsType>([])
       
        
    
       
    
        useEffect(() =>{
              fetch("http://localhost:8000/api/auth/me", {
            method: "GET",
             credentials: "include",
            }).then((res:Response) => {
    
                 if(res.ok){ return res.json()}
                 else{ throw new Error("Not logged in");}
    
    
    
            }).then((data:responseType) => {setUserDetails(data);})
            .catch((error) => {console.log(error);navigate("/signup")})
    
            
    
    
        },[navigate])


        useEffect(() =>{
              fetch("http://localhost:8000/api/content/blogs", {
            method: "GET",
             credentials: "include",
            }).then((res:Response) => {
    
                 if(res.ok){ return res.json()}
                 else{ throw new Error("Not logged in");}
    
    
    
            }).then((data:ResponseBlogsType) => {setUserBlogs(data);})
            .catch((error) => {console.log(error);navigate("/signup")})
    
            
    
    
        },[navigate])




    return(

<div className="BlogsPageContainer">
    <NavBar  userInfo={userDetails} page="Blogs"/>
    <Body userBlogs={userBlogs} />


</div>
    )




}
