import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignIn, SignUp, Home } from './pages/index'

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/home' element={<Home/>} />
         </Routes>
      </BrowserRouter>
   )
}

export default App
