

import type { responseType } from "../../Universal_Types/responseType";
import { useNavigate } from "react-router";

export function BlogsPageBTN({userInfo}: {userInfo?: responseType}){
    console.log(userInfo)
const Navigate = useNavigate()

   function handleClick(){
       Navigate("/createBlog")
         


    }

    return(

        <button type="button" className="BlogsPageBTN" onClick={handleClick}>
            Create Blog
        </button>

    )

}
