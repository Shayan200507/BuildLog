

import './App.css'
import {SingupPage} from "./Pages/SignupPage/SignupPage"
import {HomePage} from "./Pages/HomePage/HomePage"
import {PostsPage} from "./Pages/PostsPage/PostsPage"
import { BrowserRouter, Routes, Route } from "react-router";

function App() {


  return (
   <>
     


    <BrowserRouter>
    <Routes>
       <Route path = "/" element={<HomePage />} />
       <Route path = "/home" element={<HomePage />} />
       <Route path = "/signup" element={<SingupPage />} />
       <Route path ="/posts" element={<PostsPage />} />
       <Route path="*" element={<h1>404 - Page Not Found</h1>} />

    </Routes> 
    </BrowserRouter>



   </>
  )
}

export default App
