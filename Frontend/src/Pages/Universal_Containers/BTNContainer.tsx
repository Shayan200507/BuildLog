import home from "../../assets/icons/home.svg"
import liked from "../../assets/icons/liked.svg"
import blogs from "../../assets/icons/posts.svg"
import tags from "../../assets/icons/tags.svg"
import "./BTNContainer.css"
import { useNavigate } from "react-router"




export  function BTNContainer({page, loggedin}: {page:string, loggedin:boolean}){
  const Navigator = useNavigate();

  console.log(page)

    const options = [
    { icon: home, label: "Home" },
    { icon: liked, label: "Liked" },
    { icon: blogs, label: "Blogs" },
    { icon: tags, label: "Tags" },
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
