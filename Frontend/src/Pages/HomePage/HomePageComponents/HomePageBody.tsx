
import type React from "react";
import type {responseType} from "../../Universal_Types/responseType"




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
