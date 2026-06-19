import "./CreateBlog.css"
import { NavBar } from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function CreateBlog(){
  const navigate = useNavigate()
  const [userDetails,setUserDetails] = useState<responseType>()

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
    <div className="CreateBlogContainer">
      <NavBar userInfo={userDetails} page="Blogs" />
    </div>
  )
}
