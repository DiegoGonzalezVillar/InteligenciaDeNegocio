
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React, { useState } from 'react';
import Navbar from './componentes/Navbar'
import Calendario from './componentes/Calendarios'
import Inicio from './Principal'
import Consultas from './comercial/Consultas'
import MontevideoSur from './comercial/MontevideoSur'
import InteriorAC from './comercial/InteriorAC'
import InteriorDR from './comercial/InteriorDR'
import InteriorSZ from './comercial/InteriorSZ'
import MontevideoPeriferia from './comercial/MontevideoPeriferia'
import Footer from './componentes/Footer'
import './App.css'
import ConsulasApp from "./comercial/ConsultasApp";
import Tablero from './comercial/Tablero'
import CurvaS from './comercial/CurvaS'
import InfoDisponible from "./comercial/InfoDisponible";
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
          <Route path='/datosaApp' element={<ConsulasApp />}></Route>
          <Route path='/tablero' element={<Tablero />}></Route>
          <Route path='/curvaS' element={<CurvaS />}></Route>
          <Route path='/getInfoDisponible' element={<InfoDisponible />}></Route>
          <Route path='/calendarios' element={<Calendario />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </userContext.Provider>
  )
}
export default App
