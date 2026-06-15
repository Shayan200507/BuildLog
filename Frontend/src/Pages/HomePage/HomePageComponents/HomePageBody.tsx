
import type React from "react";





type responseType = {

    first_name: string,
    last_name: string,
    email: string,
    username: string




}



export function HomePageBody(props: {userInfo: responseType|undefined}):React.JSX.Element{
   



  

  const name:string = props.userInfo?.username ?? "Guest"
   
  const outString = `Welcome ${name}`
  


 
return(



  <>
  <div className="Greeting">
    <h1>{outString}</h1>
  </div>
  
  
  
  
  
  </>



)



}