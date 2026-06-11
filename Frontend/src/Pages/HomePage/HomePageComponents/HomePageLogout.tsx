
import { useNavigate } from "react-router"





export function HomePageLogout(){
    const Navigate = useNavigate()


    async function logout(){
          const res:Response = await fetch("http://localhost:8000/api/auth/logout")
          

          if(res.ok){
         
            Navigate("/signup");

          }



    }

     return(
         <>

         <div className="logout-container">
         <button className="LogoutBtn"  onClick={logout}>Logout</button>
           </div>   
         </>




     )
   


}