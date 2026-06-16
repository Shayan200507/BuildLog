
import type React from "react";

import {NavBar} from "../Universal_Containers/NavBar"
import {HomePageBody} from "./HomePageComponents/HomePageBody"
import type {responseType} from "../Universal_Types/responseType"
import { useState } from "react";
import { useEffect } from "react";

import "./HomePage.css"


export  function HomePage():React.JSX.Element{


     const [userDetails,setUserDetails] = useState<responseType>()
   
    

   

    useEffect(() =>{
          fetch("http://localhost:8000/api/auth/me", {
        method: "GET",
         credentials: "include",
        }).then((res:Response) => {

             if(res.ok){console.log("thinks lloggedin"); return res.json()}
             else{ throw new Error("Not logged in");}



        }).then((data:responseType) => {setUserDetails(data);})
        .catch((error) => {console.log(error)})

        


    },[])




return(

<>



<div className="HomePageContainer">

    
<NavBar   userInfo = {userDetails} page = "Home"/>
<HomePageBody   userInfo = {userDetails}/>


</div>





</>




)





}
