
import { useState,useEffect } from "react";
import type { responseType } from "../Universal_Types/responseType";
import  type { useNavigate } from "react-router";


export  function BlogPost(){

const [userDetails,setUserDetails] = useEffect<responseType>()
const navigate = useNavigate()



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



        return(



            <></>
        )



}