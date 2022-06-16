
import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import Components

import ShirtIndex from './components/shirts/ShirtIndex'
import ShirtShow from './components/shirts/ShirtShow'
import UserDisplay from './components/auth/Users'
import ShirtList from './components/shirts/ShirtList'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PageNavbar from './components/common/PageNavBar'

const App = () => {

  return (
    <main className='site-wrapper'>

      <BrowserRouter>
        <PageNavbar />

        <Routes>
          <Route path="/shirts" element={<ShirtIndex />} />
        

          <Route path="/shirts/:id/" element={<ShirtShow />} />

          {/* NEED TO CHANGE FAVOURITES BELOW */}

          <Route path="/auth/:id/" element={<UserDisplay />} /> 

          {/* Auth Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />


        </Routes>

      </BrowserRouter>

    </main>
  )
}

export default App
