import type React from "react"
import logo from "../../../assets/devblog-logo-transparent.png"
import { useState } from "react"



export function HomePageHeader(): React.JSX.Element{
const [greeting,SetGreeting] = useState<string>("Welcome Guest")

return(
<header className="HomeHeader">

<div className="Logo_title"> 
<img src={logo}></img>
<h1>DEVBLOG</h1>
</div>  

<div className="loggedinContainer">

<h1></h1>

</div>


    
</header>

)


}