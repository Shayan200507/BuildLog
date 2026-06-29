import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import "./ReadPostPage.css"
import { NavBar } from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType"

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
        <p>by: {postData?.first_name} {postData?.last_name}</p>

       </div>

      <div className="postBody" >
           {postData?.body}
           ext to copy apste



4:09 AM






Building a project is rarely a straight path. Each feature introduces new ideas, unexpected problems, and opportunities to improve. The important part is to keep experimenting, learning from mistakes, and making steady progress.
      </div>



      </div>
    </div>
  )
}
