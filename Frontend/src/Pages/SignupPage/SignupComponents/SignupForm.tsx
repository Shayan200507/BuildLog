
import {useState} from "react"
import type React from "react"
import { useNavigate } from "react-router"

type Data = {

   dob: Date
   email: string
   password: string
   username: string
    First_Name: string
   Last_Name: string

}

type FormType = {

   dob: string
   email: string
   username: string
   First_Name: string
   Last_Name: string


}





export function SignupForm():React.JSX.Element{

    const Navigate = useNavigate()
    const [warning,setWarning] = useState<string>("")
    const [formData,setformData] = useState<FormType>({

   dob: "",
   email: "",
   username: "",
   First_Name: "",
   Last_Name: ""
})


   async function  handleSubmit(data: FormData){
          
         const pass:string = data.get("password") as string
         const retypedPass:string = data.get("retypedPassword") as string
    
   
     
        if(pass === retypedPass){

          const obj: Data = {

            dob: new Date(data.get("dob") as string),
            email: data.get("email") as string,
            password: data.get("password") as string,
            username: data.get("username") as string,
            First_Name: data.get("First_Name") as string,
            Last_Name: data.get("Last_Name") as string

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
            Navigate("/")
          }
          else{
              setWarning(resObj.message)
          }

        }
        else{
            setWarning("Passwords do not match")
        }
          

        






      


          
         

        
    }






    return(

<>

<div className="FormWrapper">

    <h1>Signup Today!</h1>

    <form action={handleSubmit}>


        <label htmlFor="dob">Date of birth:</label>
        <input id="dob" type="date" name="dob" className="dob" value={formData.dob} onChange={(event) => setformData((prev:FormType) => { return {...prev,dob: event.target.value}} )} required/>

        
        <label htmlFor="First_Name">Name:</label>
        <input type="text" name="First_Name" placeholder="First Name" value={formData.First_Name}  onChange={(event) => setformData((prev:FormType) => { return {...prev, First_Name: event.target.value}} )}      required />
        
        
        <input type="text" name="Last_Name" placeholder="Last Name"  value={formData.Last_Name}  onChange={(event) => setformData((prev:FormType) => { return {...prev, Last_Name: event.target.value}} )}   required />
        


        <label htmlFor="email">Email address:</label>
        <input type="email" name="email" className= "emailBox" placeholder="...@email.com" value={formData.email}  onChange={(event) => setformData((prev:FormType) => { return {...prev, email: event.target.value}} )}       required />


        <label htmlFor="username">Username:</label>

        <input type="text" name="username" placeholder="Username"  pattern="^[a-zA-Z0-9_\-]{1,20}$" 
        title="Username must be 1–20 characters and can only include letters, numbers, underscores (_), or hyphens (-)."  
        
        value={formData.username}
        onChange={(event) => setformData((prev:FormType) => { return {...prev, username: event.target.value}} )}
        
        
        
        
        required />



        <label htmlFor="password">Password:</label>

        <input type="password" name="password" placeholder="password" pattern="^\S{8,}$" title="no spaces allowed in the password and length must be 8 characters"  required />

               
    
        <input type="password" name="retypedPassword" placeholder="Retype Password" pattern="^\S{8,}$" title="no spaces allowed"  required />
    


         <button type="submit">Submit</button>



    </form>

    <div className="warning Box"><h1>{warning}</h1></div>




</div>






</>




)



}
