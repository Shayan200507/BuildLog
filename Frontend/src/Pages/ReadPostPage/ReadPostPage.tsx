import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import "./ReadPostPage.css"
import { NavBar } from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType"
import heartOutline from "../../assets/like-icons/heart-outline.svg"
import heartFilled from "../../assets/like-icons/heart-filled.svg"


type likeResponse = {
  like_count: number
  likedByUser?: boolean
}

type ReadPostResponse = {
  title: string
  body: string
  imgurl: string | null
  username: string
  email: string
  first_name: string
  last_name: string
  name: string
  tags: string[]
}

export function ReadPostPage() {
  const navigate = useNavigate()
  const { post_id } = useParams()
  const [userDetails, setUserDetails] = useState<responseType>()
  const [postData, setPostData] = useState<ReadPostResponse>()
  const [likeStatus,setLikeStatus] = useState<string>(heartOutline)
  const[likeCount,setLikeCount] = useState<number>(0)

  
  async function LikeHandle(){



     const res =  await fetch(`http://localhost:8000/api/content/updateLikeStatus/${post_id}`, {
  method: "POST",
  credentials: "include"
}); 

 if(res.ok){
           if (likeStatus === heartFilled) {
    setLikeStatus(heartOutline);
   
     } else {
      setLikeStatus(heartFilled);
   
      }

 }
 else{
    console.log("something went wrong")
 }




      
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
     

  fetch(`http://localhost:8000/api/content/postsInfo/${post_id}`,{

         method: "GET",
      credentials: "include",


  }).then((res)=>{

            if(res.ok){ return res.json()}
              throw new Error("internal error")

            }).then((data: ReadPostResponse)=>{setPostData(data)})

},[])



useEffect(()=>{
fetch(`http://localhost:8000/api/content/postsLikeInfo/${post_id}`, {
  method: "GET",
  credentials: "include",
}).then((res)=>{

  if(res.ok){
    return res.json()
  }
  throw new Error("internal error")


}).then((data:likeResponse) =>{setLikeStatus(data.likedByUser ? heartFilled : heartOutline);setLikeCount(data.like_count)})



},[likeStatus])




const tagsList = postData?.tags.map((Element) =>{ return <li>
{Element}
</li>})


  return (
    <div className="ReadPostPageContainer">
      <NavBar userInfo={userDetails} page="Blogs" />
      <div className="ReadPostButtonContainer">
        <button type="button" onClick={() => navigate(-1)}>
          Exit
        </button>
      </div>

      <div className="postInfoContainer">
      
      
       

       <div className="titleContainer">
        <p>{postData?.name}</p>
        <h1>{postData?.title}</h1>
        <img src={postData?.imgurl as string} />
        <ul className="tagsList">

          {tagsList}
        </ul>

      <div className="postMetaContainer">
        <p>by: {postData?.first_name} {postData?.last_name}</p>   
      <div className="likeBtnContainer"><button  onClick={()=>LikeHandle()} ><img src={likeStatus}/><p>{likeCount}</p></button></div>
      </div>
       
       </div>

      <div className="postBody" >
           {postData?.body}
           
      </div>

      



      </div>
    </div>
  )
}
