import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import About from './pages/About'
import Contactpage from './pages/Contactpage'
import Course from './pages/Course'
import Ourteam from './pages/Ourteam'
import GalleryPage from './pages/GalleryPage'
import BecomeaMember from './pages/BecomeaMember'
import AdminDashboard from "./pages/admin/Dashboard";
import UserDashboard from "./pages/user/Dashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} ></Route>
        <Route path='/register' element={<Signup />} ></Route>
        <Route path='/login' element={<Login />} ></Route>
        <Route path='/about' element={<About />} ></Route>
        <Route path='/contact' element={<Contactpage />} ></Route>
        <Route path='/course' element={<Course />} ></Route>
        <Route path='/gallery' element={<GalleryPage />} ></Route>
        <Route path='/ourteam' element={<Ourteam />} ></Route>
        {/* THIS LINE FIXES THE ERROR */}
        <Route path="/becomeamember" element={<BecomeaMember />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
'
      </Routes>
    </BrowserRouter>
  )
}

export default App
