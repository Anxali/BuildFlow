import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Workspaces from './pages/Workspaces'
import Login from './pages/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/workspaces" element={<Workspaces/>} />
      </Routes>              
    </BrowserRouter>
  )
}

export default App