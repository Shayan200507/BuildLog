import type React from "react"
import logo from "../../../assets/devblog-logo-transparent.png"
import {HomePageLogout} from "./HomePageLogout"
import {HomePageSignup} from "./HomePageSignup"
import {BTNContainer} from "../../Universal_Containers/BTNContainer"
import type {responseType} from "../HomePage"



export function HomePageHeader(props: {userInfo:responseType|undefined}): React.JSX.Element{


return(
<header className="HomeHeader">

<div className="Logo_title"> 
<img src={logo}></img>
<h1>DEVBLOG</h1>
</div>  

<BTNContainer page="home" />

{typeof props.userInfo !=="undefined" ?<HomePageLogout /> :<HomePageSignup /> }






    
</header>

)


}