import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'

import * as React from 'react'
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout/Routes';
import './App.css'

function App() {
  return (
      <Routes>
        <Route path="*"  element={<Layout />} />
      </Routes>
  );
}

export default App;
