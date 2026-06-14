import { useState } from "react"
import { useNavigate } from "react-router"



type LoginType = {
    username: string
    password: string

}



export function LoginForm(){

    const [warning,setWarning] = useState<string>("")
    const Navigate =  useNavigate()


  


   async function handleLogin(data:FormData){

       const loginInfo: LoginType ={
             
        username: data.get("username") as string,
        password : data.get("password") as string



       } 

        const response =  await fetch("http://localhost:8000/api/auth/login",{
            credentials: "include",
            method: "Post",
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
           


        })

        if(!response.ok){
            const res = await response.json()
            setWarning(res.message)
        }
        else{
            Navigate("/")

        }

       

  }


   

return(


<>

<div className="loginContainer">

<form action={handleLogin}>

        
         <div className="login_error" style={{ color: "white"}}>{warning}</div>
        <input type="text" name="username" placeholder="Username" required />

        <input type="password" name="password" placeholder="password" required />

        <button type="submit" >Login</button>



</form>


</div>

</>









)





}