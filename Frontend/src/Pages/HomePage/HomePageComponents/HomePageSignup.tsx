import { useNavigate } from "react-router"


export function HomePageSignup(){

    const Navigate = useNavigate()

    function Signup(){
        Navigate("/signup")

    }

      return(
         <>

         <div className="Signup-container">
         <button className="SignupBtn"  onClick={Signup}>Signup</button>
           </div>   
         </>




     )

}