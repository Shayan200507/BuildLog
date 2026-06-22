import { BlogsPageBTN } from "./BlogsPageBTN";
import { useNavigate } from "react-router";

export type BlogType = {
  blog_id: number;
  name: string;
  description: string;
  date_created: Date;
  time_created: string;
}

export function Body({userBlogs}: {userBlogs: BlogType[]}){


  const navigate = useNavigate()



  const blogs = userBlogs.map((Element) => (
    <li key={Element.blog_id} className="BlogItem">
      <button type="button" onClick={()=>{navigate(`/blogPosts/${Element.blog_id}`)}}>
        <h2>{Element.name}</h2>
        <p>{Element.description}</p>
        <div className="date-Time-Container">
        <p>Date Created: {String(Element.date_created)}</p>
        <p>Time Created: {Element.time_created}</p>
        </div>
      </button>
    </li>
  ));

  return(
    <>

    <div className="BlogsBody">
      <div className="blogsListContainer">
        <ul className="blogsList">
          {blogs}
        </ul>
      </div>

      <div className="BlogsPageBTNContainer">
        <BlogsPageBTN />
      </div>
      </div>
    </>
  )
}
