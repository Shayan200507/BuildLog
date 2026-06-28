
import { useState,useEffect } from "react";
import "./BlogPost.css"
import type { responseType } from "../Universal_Types/responseType";
import  { useNavigate } from "react-router";
import { NavBar } from "../Universal_Containers/NavBar";
import { useParams } from "react-router";

type BlogPostRow = {
    name: string
    post_id: number
    title: string
    created_at: string
    imgurl: string | null
    tags: string[]
}

type GetPostsResponse = BlogPostRow[]


export  function BlogPost(){

const [userDetails,setUserDetails] = useState<responseType>()
const [postsData,setPostsData] = useState<GetPostsResponse>([])
const navigate = useNavigate()
const {blog_id} = useParams()
console.log(`ur blog id is ${blog_id}`)




   useEffect(() =>{
              fetch("http://localhost:8000/api/auth/me", {
            method: "GET",
             credentials: "include",
            }).then((res:Response) => {
    
                 if(res.ok){ return res.json()}
                 else{ throw new Error("Not logged in");}
    
    
    
            }).then((data:responseType) => {setUserDetails(data);})
            .catch((error) => {console.log(error);navigate("/signup")})
    
            
    
    
        },[navigate])


    useEffect(()=>{

           fetch(`http://localhost:8000/api/content/posts/${blog_id}`,{
            method: "GET",
             credentials: "include",
            }).then(res=> res.json()).then(data=>setPostsData(data))




    }, [blog_id])  
    
    
    const renderedPostsData=postsData.map((Element)=>{return <li className="postsListElement" key={Element.post_id}><button onClick={() => navigate(`/readPost/${Element.post_id}`)}>
        
        

         <img src={Element.imgurl as string} alt={Element.title} />
        <div className="elementDetails">
        <h1>{Element.title}</h1>    
        <p>{Element.name}</p>
        <ul className="tagsList">{Element.tags.map((tagElement)=>{return <li className="tagElement" key={tagElement}>{tagElement}</li>})}</ul>
        </div>
        
       
        
        
        </button></li> })



        return(



            <div className="BlogPostContainer">
                <NavBar userInfo={userDetails} page="Blogs" />
                <div className="buttonContainer">
                    <button onClick={() => navigate("/blogs")}>Exit</button>
                </div>
                <div className="postsListContainer">
                 <ul className="postsList">
                    {renderedPostsData}

                 </ul>
                </div>
            </div>
        )



}
