

import './App.css'
import {SingupPage} from "./Pages/SignupPage/SignupPage"
import {HomePage} from "./Pages/HomePage/HomePage"
import {BlogsPage} from "./Pages/BlogsPage/BlogsPage"
import {LikedPage} from "./Pages/LikedPage/LikedPage"
import {TagsPage} from "./Pages/TagsPage/TagsPage"
import {ProfilePage} from "./Pages/ProfilePage/ProfilePage"
import { BrowserRouter, Routes, Route } from "react-router";
import {CreateBlog} from "./Pages/CreateBlog/CreateBlog"
import {BlogPost} from "./Pages/BlogPost/BlogPost"
import {ReadPostPage} from "./Pages/ReadPostPage/ReadPostPage"
import {CreatePost} from "./Pages/CreatePost/CreatePost"




function App() {


  return (
   <>
     


    <BrowserRouter>
    <Routes>
       <Route path = "/" element={<HomePage />} />
       <Route path = "/home" element={<HomePage />} />
       <Route path = "/signup" element={<SingupPage />} />
       <Route path ="/blogs" element={<BlogsPage />} />
       <Route path ="/liked" element={<LikedPage />} />
       <Route path ="/tags" element={<TagsPage />} />
       <Route path ="/profile" element={<ProfilePage />} />
       <Route path ="/createBlog" element={<CreateBlog />} />
       <Route path ="/blogPosts/:blog_id" element={<BlogPost />} />
       <Route path ="/readPost/:blog_id/:post_id" element={<ReadPostPage />} />
       <Route path = "/createPost/:blog_id" element={<CreatePost/>}/>
       <Route path="*" element={<h1>404 - Page Not Found</h1>} />

    </Routes> 
    </BrowserRouter>



   </>
  )
}

export default App
