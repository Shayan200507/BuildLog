import { useNavigate } from "react-router"
import { useState } from "react"

export function CreateBlogBody(){
    const Navigate = useNavigate()
    const [error,setError] = useState<string>()
 

type CreateBlogResponse = {
  blog_id: number
  name: string
  description: string
  created_at: string
}

type ErrorResponse = {
  message: string
}






async function handleSubmit(data: FormData){

  



   const res= await  fetch("http://localhost:8000/api/content/postBlog",{
        credentials: "include",
        method: "post",
        body: JSON.stringify({
            name: data.get("name") as string,
            description: data.get("description") as string

        }),
        headers: {
              'Content-Type': 'application/json'
              },

    })

    if(res.ok){
        
        const data:CreateBlogResponse = await res.json()
        Navigate(`/blogPosts/${data.blog_id}`)
        console.log(data)
    }
    else{
        const err:ErrorResponse = await res.json()
        setError(err.message)

    }







}

return(

<div className="CreateBlogBodyContainer">

    

<div className="buttonContainer">  
<button  onClick={()=>Navigate("/blogs")}>Exit</button>
</div>  


<div className="formContainer">
    <h1>{error}</h1>
    <h1>Create Your Blog!</h1>
<form action={handleSubmit}>


<label htmlFor="Title" >Title:</label>
<input type="text" placeholder="Title" name="name" required></input> 


<label htmlFor="description">Description:</label>
<textarea name="description" placeholder="Describe your Blog" required></textarea>

<button type="submit">Create Blog</button>







</form>
</div>



</div>

)



}
