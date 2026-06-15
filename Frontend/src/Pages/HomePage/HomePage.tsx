
import type React from "react";

import {HomePageHeader} from "./HomePageComponents/HomePageHeader"
import {HomePageBody} from "./HomePageComponents/HomePageBody"
import { useState } from "react";
import { useEffect } from "react";

import "./HomePage.css"


export type responseType = {

    first_name: string,
    last_name: string,
    email: string,
    username: string




}



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

    
<HomePageHeader   userInfo = {userDetails}/>
<HomePageBody   userInfo = {userDetails}/>


</div>





</>




)





}
