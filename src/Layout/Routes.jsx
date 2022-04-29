import * as React from 'react'
// import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'

//Routes.jsx replaces App.jsx as the central hub of this the Application.

//Core Components
import Home from '../Core/Home'
import NotFound from './NotFound'

const Layout = () => {
  return (
    <div className="layout">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default Layout
