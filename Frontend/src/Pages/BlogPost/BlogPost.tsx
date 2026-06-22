
import { useState,useEffect } from "react";
import "./BlogPost.css"
import type { responseType } from "../Universal_Types/responseType";
import  { useNavigate } from "react-router";
import { NavBar } from "../Universal_Containers/NavBar";
import { useParams } from "react-router";


export  function BlogPost(){

const [userDetails,setUserDetails] = useState<responseType>()
const navigate = useNavigate()
const {blogid} = useParams()




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



            <div className="BlogPostContainer">
                <NavBar userInfo={userDetails} page="Blogs" />
                <div className="buttonContainer">
                    <button onClick={() => navigate("/blogs")}>Exit</button>
                </div>
            </div>
        )



}
