

import './App.css'
import {SingupPage} from "./Pages/SignupPage/SignupPage"
import {HomePage} from "./Pages/HomePage/HomePage"
import { BrowserRouter, Routes, Route } from "react-router";

function App() {


  return (
   <>
     


    <BrowserRouter>
    <Routes>
       <Route path = "/" element={<HomePage />} />
       <Route path = "/signup" element={<SingupPage />} />

    </Routes> 
    </BrowserRouter>



   </>
  )
}

export default App
