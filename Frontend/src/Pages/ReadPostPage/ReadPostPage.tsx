import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import "./ReadPostPage.css"
import { NavBar } from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType"
import { ReadPostBody } from "./ReadPostPageComponents/ReadPostBody"

export function ReadPostPage() {
  const navigate = useNavigate()
  const { post_id } = useParams()
  const [userDetails, setUserDetails] = useState<responseType>()

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

  return (
    <div className="ReadPostPageContainer">
      <NavBar userInfo={userDetails} page="Blogs" />
      <ReadPostBody postId={post_id} />
    </div>
  )
}
