  import "./CreatePost.css"
import { NavBar } from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useParams } from "react-router"
const uploadIcon = "/upload-icons/image-upload.svg"


type tagElement = {
    tag_id: number
    tag_title: string
}

type createPostInputs = {
  blog_id: number
  title: string
  body: string
  image: File | null
  tags: tagElement[]
}



export function CreatePost() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState<responseType>()
 const [tagsList,setTagsList] = useState<tagElement[]>()
  const [selectedTagsList,setSelectedTagsList] = useState<tagElement[]>() 
  const[imgElement,setImgElement]= useState<string>()
  const [error,setError]= useState<string>("")
  const {blog_id} = useParams()



  
  
   function HandleUpload(Event:  React.ChangeEvent<HTMLInputElement>){
           
    const uploadImg:File|undefined =  Event.target.files?.[0] 

      if(uploadImg){
          const  objectURL = URL.createObjectURL(uploadImg as File);
          setImgElement(objectURL)
      }
  
  
  
  }
  
  
  
  async function FormSubmit(data: FormData){
    const uploadedImage = data.get("image")
   


  try {
    if(uploadedImage){
      const fileUpload:File = uploadedImage as File
      if(!fileUpload.type.startsWith("image/")){ throw {message: "Incorrect file type"}}
      else{
        const imgUrl = URL.createObjectURL(fileUpload)
        const image = new Image()

        image.onload= ()=>{
          if(image.height > 2048 || image.width >2048){URL.revokeObjectURL(imgUrl); throw {message: "Maximum resolution is 2048 x 2048"}}
          URL.revokeObjectURL(imgUrl);
          return
        }
        image.onerror = ()=>{ URL.revokeObjectURL(imgUrl);throw {message: "Cannot Upload your Image"}}

        image.src = imgUrl;
      
      
      }
    }
  }
  catch(error){
    console.log(error)
    if(typeof error === "object" && error != null &&  "message" in error ){
      setError(error.message as string)

    }

  }

    const inputs: createPostInputs = {
      blog_id: Number(String(blog_id) as string),
      title: String(data.get("Title") ?? ""),
      body: String(data.get("Body") ?? ""),
      image: uploadedImage ? uploadedImage as File : null   ,
      tags: selectedTagsList ?? [],
    }
    data.append("blog_id",String(inputs.blog_id))
    data.append("tags",JSON.stringify(selectedTagsList ?? []))
    const res = await fetch("http://localhost:8000/api/content/createPost",{
      credentials: "include",
      method: "POST",
      body: data
    })

    if(res.ok){
      const data = await res.json()
      navigate(`/readPost/${inputs.blog_id}/${data.post_id}`)
    }
    else{
      const data:{message:string} = await res.json()
      setError(data.message)
    }
  
  
  
  }
  
  
  
  
  
  
  function addSelection(element:tagElement){
            setSelectedTagsList((selectedTagsList) => [...(selectedTagsList ?? []),element])
        setTagsList((tagsList) => {
            const outList:tagElement[] = []
        for(const e  of tagsList ?? []){
             
            if(!(e.tag_title === element.tag_title)){outList.push(e)}
            

        }
        return outList
       
    })
  }


function removeSelection(element: tagElement){
        setTagsList((TagsList) =>[...(TagsList ?? []),element])

        setSelectedTagsList((selectedtagsList) => {
            const outList:tagElement[] = []
        for(const e  of selectedtagsList?? []){
             
            if(!(e.tag_title === element.tag_title)){outList.push(e)}
            

        }
        return outList
       
    })
}

  
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


       return <li key={Element.tag_id} className="tagsListElement"><button type="button" onClick={()=>addSelection(Element)}>{Element.tag_title}</button></li>

    })


    const renderSelectedTagList = selectedTagsList?.map((Element:tagElement) =>{


       return <li key={Element.tag_id} className="tagsListElement"><button type="button" onClick={()=>removeSelection(Element)}>{Element.tag_title}</button></li>})



   











  return (
    <div className="CreatePostContainer">
      <NavBar userInfo={userDetails} page="Blogs" />
      <div className="createPostBody">
      <div className="buttonContainer">  
        <button  onClick={()=>navigate("/blogs")}>Exit</button>
      </div>  

  
  
  
  <div className="formContainer">
    <h1>{error}</h1>
    <h1>Create Your Post!</h1>
<form action={FormSubmit}>

     <div className="tagsPageListContainer">
    <div className="TagTableHeadingContainer"><h1>Available Tags</h1></div>
    <ul className="tagsPageList">{renderTagList}</ul>
    </div> 

   

<label htmlFor="Title" >Title:</label>
<input type="text" placeholder="Title" name="Title" required></input> 


<label htmlFor="Body">Body:</label>
<textarea name="Body" placeholder="Describe your Blog" required></textarea>

    <div className="tagsPageListContainer">

    <div className="TagTableHeadingContainer"><h1>Selected Tags</h1></div>
    <ul className="tagsPageList">{renderSelectedTagList}</ul>
    </div>  

    <div className="FileContainer">
    <label htmlFor="image" className="uploadImageLabel">
   
    <img  className={!imgElement ? "uploading" : "uploadedImg" }  src={imgElement ?? uploadIcon}/>
    {imgElement && <div className="removeImgContainer"><button type="button" onClick={()=>setImgElement(undefined)}  className="removeImg">Delete</button></div>}
    </label>
   

  <input
    id="image"
    accept="image/*"
    name="image"
    type="file"
    className="imgUploader"
    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>HandleUpload(event)}
  />

    </div>


<button type="submit">Create Post</button>







</form>
</div>

  </div>
   </div>
  )
}
