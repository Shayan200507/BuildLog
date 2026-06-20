import { useNavigate } from "react-router"

export function CreateBlogBody(){
    const Navigate = useNavigate()

async function handleSubmit(data: FormData){
    fetch("http://localhost:8000/api/content/postBlog",{
        credentials: "include",
        method: "post",
        body: JSON.stringify({
            name: data.get("name") as string,
            Description: data.get("description") as string

        }),
        headers: {
              'Content-Type': 'application/json'
              },

    })
}

return(

<div className="CreateBlogBodyContainer">

<div className="buttonContainer">  
<button  onClick={()=>Navigate("/blogs")}>Exit</button>
</div>  


<div className="formContainer">
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
