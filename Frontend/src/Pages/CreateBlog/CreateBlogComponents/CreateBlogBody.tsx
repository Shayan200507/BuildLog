import { useNavigate } from "react-router"

export function CreateBlogBody(){
    const Navigate = useNavigate()

async function handleSubmit(data: FormData){
    console.log(data)
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
