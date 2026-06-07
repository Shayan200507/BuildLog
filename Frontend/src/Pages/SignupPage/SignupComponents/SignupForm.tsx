

import type React from "react"



export function SignupForm():React.JSX.Element{


    function handleSubmit(data: FormData){
         console.log(data)
        
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

        <input type="text" name="username" placeholder="Username" required />



        <label htmlFor="password">Password:</label>

        <input type="password" name="password" placeholder="password" required />


    


         <button type="submit">Submit</button>



    </form>




</div>






</>




)



}