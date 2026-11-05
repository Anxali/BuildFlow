import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Applayout from './layouts/AppLayout'
import Workspaces from './pages/Workspaces'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import WorkspaceDetails from './pages/WorkspaceDetails'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<Applayout/>}>
          <Route element={<ProtectedRoute/>}>
            <Route path="/workspaces" element={<Workspaces/>} />
            <Route path="/workspace/:id" element={<WorkspaceDetails/>} />
          </Route>
        </Route>
        
      </Routes>              
    </BrowserRouter>
  )
}

export default App