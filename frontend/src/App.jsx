import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import About from './pages/About'
import Contactpage from './pages/Contactpage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/register' element={<Signup />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/contact' element={<Contactpage />} ></Route>
'
      </Routes>
    </BrowserRouter>
  )
}

export default App
