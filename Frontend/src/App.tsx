

import './App.css'
import {SingupPage} from "./Pages/SignupPage/SignupPage"
import {HomePage} from "./Pages/HomePage/HomePage"
import {BlogsPage} from "./Pages/BlogsPage/BlogsPage"
import {LikedPage} from "./Pages/LikedPage/LikedPage"
import {TagsPage} from "./Pages/TagsPage/TagsPage"
import {ProfilePage} from "./Pages/ProfilePage/ProfilePage"
import { BrowserRouter, Routes, Route } from "react-router";

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
       <Route path="*" element={<h1>404 - Page Not Found</h1>} />

    </Routes> 
    </BrowserRouter>



   </>
  )
}

export default App
