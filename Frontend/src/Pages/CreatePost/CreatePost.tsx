  import "./CreatePost.css"
import { NavBar } from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
type tagElement = {
    tag_id: number
    tag_title: string
}


export function CreatePost() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState<responseType>()
 const [tagsList,setTagsList] = useState<tagElement[]>()
  const [selectedTagsList,setSelectedTagsList] = useState<tagElement[]>() 
  
  
  
  useEffect(() => {
    fetch("http://localhost:8000/api/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res: Response) => {
        if (res.ok) {
          return res.json()
        }

        throw new Error("Not logged in")
      })
      .then((data: responseType) => {
        setUserDetails(data)
      })
      .catch((error) => {
        console.log(error)
        navigate("/signup")
      })
  }, [navigate])





useEffect(()=>{


fetch("http://localhost:8000/api/content/getTags", {
  method: "GET",
  credentials: "include",
})
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch tags");
    }

    return res.json();
  })
  .then((data:tagElement[]) => {
    setTagsList(data);
  })
  .catch((error) => {
    console.error(error);
  });
    },[])








 const renderTagList = tagsList?.map((Element:tagElement) =>{


       return <li key={Element.tag_id} className="tagsListElement"><button  onClick={()=>addSelection(Element)}>{Element.tag_title}</button></li>

    })


    const renderSelectedTagList = selectedTagsList?.map((Element:tagElement) =>{


       return <li key={Element.tag_id} className="tagsListElement"><button  onClick={()=>removeSelection(Element)}>{Element.tag_title}</button></li>})



   











  return (
    <div className="CreatePostContainer">
      <NavBar userInfo={userDetails} page="Blogs" />
      <div className="createPostBody">
      <div className="buttonContainer">  
        <button  onClick={()=>navigate("/blogs")}>Exit</button>
      </div>  

  
  
  
  <div className="formContainer">
    <h1>{}</h1>
    <h1>Create Your Post!</h1>
<form >

     <div className="tagsPageListContainer">
    <div className="TagTableHeadingContainer"><h1>Available Tags</h1></div>
    <ul className="tagsPageList">{renderTagList}</ul>
    </div> 

   

<label htmlFor="Title" >Title:</label>
<input type="text" placeholder="Title" name="name" required></input> 


<label htmlFor="Body">Body:</label>
<textarea name="Body" placeholder="Describe your Blog" required></textarea>

    <div className="tagsPageListContainer">

    <div className="TagTableHeadingContainer"><h1>Selected Tags</h1></div>
    <ul className="tagsPageList">{renderSelectedTagList}</ul>
    </div>  


<button type="submit">Create Blog</button>







</form>
</div>

  </div>
   </div>
  )
}
