import { useState } from "react";
import type React from "react";
import { useEffect } from "react";



type responseType = {

    first_name: string,
    last_name: string,
    email: string,
    username: string




}



export function HomePageBody():React.JSX.Element{
    const [userDetails,setUserDetails] = useState<responseType>()
    const [greeting,SetGreeting] = useState<string>("Guest")
    

   

    useEffect(() =>{
          fetch("http://localhost:8000/api/auth/me", {
        method: "GET",
         credentials: "include",
        }).then((res:Response) => {

             if(res.ok){console.log("thinks lloggedin"); return res.json()}
             else{ throw new Error("Not logged in");}



        }).then((data:responseType) => {setUserDetails(data);SetGreeting(data.first_name)})
        .catch((error) => {SetGreeting("Guest");console.log(error)})

        


    },[])


    const outString:string = `Welcome ${greeting}!`





 
return(



  <>
  <div className="Greeting">
    <h1>{outString}</h1>
  </div>
  
  
  
  
  
  </>



)



}