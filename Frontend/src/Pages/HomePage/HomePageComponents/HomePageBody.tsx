import { useState } from "react";
import type React from "react";




export function HomePageBody():React.JSX.Element{

   




    const [greeting,SetGreeting] = useState<string>("Welcome Guest!")
 
return(



  <>
  <div className="Greeting">
    <h1>{greeting}</h1>
  </div>
  
  
  
  
  
  </>



)



}