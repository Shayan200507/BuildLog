import "./TagsPage.css"
import {NavBar} from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type {PostCardData} from "../Universal_Types/postCardData"
import {PostCard} from "../Universal_Containers/PostCard"


type tagElement = {
    tag_id: number
    tag_title: string
}



export function TagsPage(){
    const navigate = useNavigate()

      const [userDetails,setUserDetails] = useState<responseType>()
     const [tagsList,setTagsList] = useState<tagElement[]>() 
     const [selectedTagsList,setSelectedTagsList] = useState<tagElement[]>() 
     const [filteredPosts,setFilteredPosts] = useState<PostCardData[]>([])
       
     
     
 const renderFilteredPosts = filteredPosts.map((Element)=>{ return <PostCard post={Element}  />
  })





    async function addSelection(element: tagElement){


        const bodyList = [...(selectedTagsList ?? []),element]

        setSelectedTagsList((selectedTagsList) => [...(selectedTagsList ?? []),element])
        setTagsList((tagsList) => {
            const outList:tagElement[] = []
        for(const e  of tagsList ?? []){
             
            if(!(e.tag_title === element.tag_title)){outList.push(e)}
            

        }
        return outList
       
    })

    const response =await  fetch("http://localhost:8000/api/content/getFilteredPosts",{
      
       credentials: "include",
       method: "POST",
         headers: {
    "Content-Type": "application/json",
     },
     body: JSON.stringify(bodyList ?? [])




    })

    

    if(!response.ok){const data = await response.json(); console.log(data.message)}
    else{
        const filteredList: PostCardData[] = await response.json()
        setFilteredPosts(filteredList)

        


    }

      



    }


    async function removeSelection(element: tagElement) {

          const bodyList = selectedTagsList?.filter((e)=>{return element.tag_id !== e.tag_id})

        setTagsList((TagsList) =>[...(TagsList ?? []),element])

        setSelectedTagsList((selectedtagsList) => {
            const outList:tagElement[] = []
        for(const e  of selectedtagsList?? []){
             
            if(!(e.tag_title === element.tag_title)){outList.push(e)}
            

        }
        return outList
       
    })

     
    const response =await  fetch("http://localhost:8000/api/content/getFilteredPosts",{
      
       credentials: "include",
       method: "POST",
         headers: {
    "Content-Type": "application/json",
     },
     body: JSON.stringify(bodyList ?? [])




    })

    

    if(!response.ok){const data = await response.json(); console.log(data.message)}
    else{
        const filteredList: PostCardData[] = await response.json()
        setFilteredPosts(filteredList)

        


    }








        
    }



       
    
        useEffect(() =>{
              fetch("http://localhost:8000/api/auth/me", {
            method: "GET",
             credentials: "include",
            }).then((res:Response) => {
    
                 if(res.ok){console.log("thinks lloggedin"); return res.json()}
                 else{ throw new Error("Not logged in");}
    
    
    
            }).then((data:responseType) => {setUserDetails(data);})
            .catch((error) => {console.log(error);navigate("/signup")})
    
            
    
    
        },[])


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



    return(

<div className="TagsPageContainer">
    <NavBar  userInfo={userDetails} page="Tags"/>
   
   <div className="tagsPageListContainer">
    <div className="TagTableHeadingContainer"><h1>Available Tags</h1></div>
    <ul className="tagsPageList">{renderTagList}</ul>
    </div>  

     <div className="tagsPageListContainer">

    <div className="TagTableHeadingContainer"><h1>Selected Tags</h1></div>
    <ul className="tagsPageList">{renderSelectedTagList}</ul>
    </div>  


    <div className="filteredPostsContainer">
<ul className="filteredPostsList">
    {renderFilteredPosts}

</ul>
    </div>


</div>
    )




}
