import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FirstPage from './components/FirstPage'
import Directions from './components/Directions'
import Product from './components/Product'
import Contact from './components/Contact'
import GeneralData from './components/GeneralData'
import LevelsData from './components/LevelsData'
import PointsAndMark from './components/PointsAndMark'
import Resault from './components/Resault'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FirstPage />} />
        <Route path='directions' element={<Directions />} />
        <Route path='product' element={<Product />} />
        <Route path='contact' element={<Contact />} />
        <Route path='generalData' element={<GeneralData />} />
        <Route path='levels' element={<LevelsData />} />
        <Route path='pointsandmark' element={<PointsAndMark />} />
        <Route path='resault' element={<Resault />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
