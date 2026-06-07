



export function LoginForm(){

  function handleLogin(data:FormData){

       console.log(data)

  }




return(

<>

<div className="loginContainer">

<form action={handleLogin}>

        

        <input type="text" name="username" placeholder="Username" required />




        <input type="password" name="password" placeholder="password" required />

        <button type="submit">Submit</button>



</form>


</div>

</>









)





}