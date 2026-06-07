
import type React from "react"
import "./SignUp.css"
import {SignupHeader} from "./SignupComponents/SignupHeader"
import {SignupForm} from "./SignupComponents/SignupForm"

export function SingupPage():React.JSX.Element{



      return(
       <>
       
       <div className="signupFormContainer">


               
               <SignupHeader/>
               <SignupForm/>



       </div>
    
       </>



      )



}