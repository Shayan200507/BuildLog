import "./TagsPage.css"
import {NavBar} from "../Universal_Containers/NavBar"
import type { responseType } from "../Universal_Types/responseType";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";


type tagElement = {
    tag_id: number
    tag_title: string
}



export function TagsPage(){
    const navigate = useNavigate()

      const [userDetails,setUserDetails] = useState<responseType>()
     const [tagsList,setTagsList] = useState<tagElement[]>() 
     const [selectedTagsList,setSelectedTagsList] = useState<tagElement[]>() 
       
        
    async function addSelection(element: tagElement){
        setSelectedTagsList((selectedTagsList) => [...(selectedTagsList ?? []),element])
        setTagsList((tagsList) => {
            const outList:tagElement[] = []
        for(const e  of tagsList ?? []){
             
            if(!(e.tag_title === element.tag_title)){outList.push(e)}
            

        }
        return outList
       
    })
    }


    async function removeSelection(element: tagElement) {

        setTagsList((TagsList) =>[...(TagsList ?? []),element])

        setSelectedTagsList((selectedtagsList) => {
            const outList:tagElement[] = []
        for(const e  of selectedtagsList?? []){
             
            if(!(e.tag_title === element.tag_title)){outList.push(e)}
            

        }
        return outList
       
    })
        
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


</div>
    )




}
