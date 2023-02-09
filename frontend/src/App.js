
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState } from 'react';
import Navbar from './componentes/Navbar'
import Calendario from './componentes/Calendarios'
import Inicio from './Principal'
import Consultas from './actividad/Consultas'
import MontevideoSur from './actividad/MontevideoSur'
import InteriorAC from './actividad/InteriorAC'
import InteriorDR from './actividad/InteriorDR'
import InteriorSZ from './actividad/InteriorSZ'
import MontevideoPeriferia from './actividad/MontevideoPeriferia'
import Footer from './componentes/Footer'
import './App.css'
//import { AuthProvider } from '../src/componentes/Context';

export const userContext = React.createContext();

const App = () => {
  const[user,setUser] = useState(false)
  return (
    <userContext.Provider value={{setUser, user}}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Inicio />}></Route>
          <Route path='/consultas' element={<Consultas />}></Route>
          <Route path='/montevideoPeriferia' element={<MontevideoPeriferia />}></Route>
          <Route path='/montevideoSur' element={<MontevideoSur />}></Route>
          <Route path='/interiorAC' element={<InteriorAC />}></Route>
          <Route path='/interiorDR' element={<InteriorDR />}></Route>
          <Route path='/interiorSZ' element={<InteriorSZ />}></Route>
          <Route path='/calendarios' element={<Calendario />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </userContext.Provider>
  )
}
export default App
