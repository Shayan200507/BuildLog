

import type React from "react"

type Data = {

   dob: Date
   email: string
   password: string
   username: string
}



export function SignupForm():React.JSX.Element{


   async function  handleSubmit(data: FormData){
          const obj: Data = {

             dob: new Date(data.get("dob") as string),
             email: data.get("email") as string,
            password: data.get("password") as string,
            username: data.get("username") as string

          }


          console.log(obj)



          const res:Response  =  await fetch("http://localhost:8000/api/auth/register",{

            method:"POST",
            headers: {
              'Content-Type': 'application/json'
              },
            body: JSON.stringify(obj)  

          })

        const resObj = await res.json()
          if(res.ok){
            
            console.log(resObj)
          }
          else{
              console.log(resObj)
          }


          

        






      


          
         

        
    }






    return(

<>

<div className="FormWrapper">

    <h1>Signup Today!</h1>

    <form action={handleSubmit}>


        <label htmlFor="dob">Date of birth:</label>
        <input id="dob" type="date" name="dob" className="dob" required/>


        <label htmlFor="email">Email address:</label>
        <input type="email" name="email" className= "emailBox" placeholder="...@email.com" required />


        <label htmlFor="email">Username:</label>

        <input type="text" name="username" placeholder="Username"  pattern="^[a-zA-Z0-9_\-]{1,20}$" 
        title="Username must be 1–20 characters and can only include letters, numbers, underscores (_), or hyphens (-)."  required />



        <label htmlFor="password">Password:</label>

        <input type="password" name="password" placeholder="password" pattern="^\S+$" title="no spaces allowed"  required />


    


         <button type="submit">Submit</button>



    </form>




</div>






</>




)



}