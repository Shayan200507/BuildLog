import type React from "react"
import logo from "../../../assets/devblog-logo-transparent.png"
import {LoginForm} from "./Login"


export function SignupHeader(): React.JSX.Element{


return(
<header className="SignUpHeader">

<div className="Logo_title"> 
<img src={logo}></img>
<h1>DEVBLOG</h1>
</div>   
<LoginForm/>

    
</header>

)


}