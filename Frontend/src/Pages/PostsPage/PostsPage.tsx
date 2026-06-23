
import "./PostsPage.css"
import {NavBar} from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { PostsPageBTN } from "./PostsPageComponents/PostsPageBTN";


export function PostsPage(){
    const navigate = useNavigate()

      const [userDetails,setUserDetails] = useState<responseType>()
       
        
    
       
    
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


    return(

<div className="PostsPageContainer">
    <NavBar  userInfo={userDetails} page="Posts"/>
    
        <PostsPageBTN  userInfo = {userDetails} />
  


</div>
    )




}
