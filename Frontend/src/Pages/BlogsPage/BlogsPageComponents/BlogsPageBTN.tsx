

import type { responseType } from "../../Universal_Types/responseType";

export function BlogsPageBTN({userInfo}: {userInfo?: responseType}){
console.log(userInfo)

    async function handleClick(){
        console.log("handling")
         


    }

    return(

        <button type="button" className="BlogsPageBTN" onClick={handleClick}>
            Create Blog
        </button>

    )

}
