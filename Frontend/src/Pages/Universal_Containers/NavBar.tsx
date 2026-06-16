import type React from "react"
import logo from "../../assets/devblog-logo-transparent.png"
import {HomePageLogout} from "../HomePage/HomePageComponents/HomePageLogout"
import {HomePageSignup} from "../HomePage/HomePageComponents/HomePageSignup"
import {BTNContainer} from "./BTNContainer"
import type {responseType} from "../Universal_Types/responseType"
import "./NavBar.css"



export function NavBar(props: {userInfo:responseType|undefined, page: string}): React.JSX.Element{


return(
<header className="NavBar">

<div className="NavBar_logo_title"> 
<img src={logo}></img>
<h1>DEVBLOG</h1>
</div>  

<BTNContainer page={props.page} loggedin = {typeof props.userInfo !=="undefined"} />

{typeof props.userInfo !=="undefined" ?<HomePageLogout /> :<HomePageSignup /> }






    
</header>

)


}
