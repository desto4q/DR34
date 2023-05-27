import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from '../pages/Home'
import Results from '../pages/Results'
import PostID from '../pages/PostID'
function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/results/:page" element={<Results/>}/>
            <Route path='post/:id' element={<PostID/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Router