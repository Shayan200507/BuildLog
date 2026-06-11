import type React from "react"
import logo from "../../../assets/devblog-logo-transparent.png"
import {HomePageLogout} from "./HomePageLogout"



export function HomePageHeader(): React.JSX.Element{


return(
<header className="HomeHeader">

<div className="Logo_title"> 
<img src={logo}></img>
<h1>DEVBLOG</h1>
</div>  

<HomePageLogout />




    
</header>

)


}