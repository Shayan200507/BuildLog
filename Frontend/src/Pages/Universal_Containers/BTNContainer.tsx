import home from "../../assets/icons/home.svg"
import liked from "../../assets/icons/liked.svg"
import posts from "../../assets/icons/posts.svg"
import tags from "../../assets/icons/tags.svg"
import profile from "../../assets/icons/profile.svg"
import "./BTNContainer.css"
import { useNavigate } from "react-router"




export  function BTNContainer({page, loggedin}: {page:string, loggedin:boolean}){
  const Navigator = useNavigate();

  console.log(page)

    const options = [
    { icon: home, label: "Home" },
    { icon: liked, label: "Liked" },
    { icon: posts, label: "Posts" },
    { icon: tags, label: "Tags" },
    { icon: profile, label: "Profile" },
  ];
  
  
 const navbar = options.map((Element) => {
  const isActive = Element.label.toLowerCase() === page.toLowerCase();

  return (
    <li
      key={Element.label}
      style={isActive ? { borderBottom: "solid 2px #60A5FA" } : {}}
    >
      <button type="button" onClick={()=> loggedin ? Navigator(`/${Element.label.toLowerCase()}`) : Navigator("/signup")}>
        <img src={Element.icon} alt="" />
        <span>{Element.label}</span>
      </button>
    </li>
  );
});


  return(

  <nav className="HeaderNavigator">
  <ul>
        {navbar}
  </ul>
</nav>


  )



}
