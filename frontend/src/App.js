import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Navbar from "./componentes/Navbar";
import Calendario from "./componentes/Calendarios";
import Inicio from "./Principal";
import Footer from "./componentes/Footer";

import Consultas from "./comercial/Consultas";
import MontevideoSur from "./comercial/MontevideoSur";
import InteriorAC from "./comercial/InteriorAC";
import InteriorDR from "./comercial/InteriorDR";
import InteriorSZ from "./comercial/InteriorSZ";
import MontevideoPeriferia from "./comercial/MontevideoPeriferia";
import ConsulasApp from "./comercial/ConsultasApp";
import InfoDisponible from "./comercial/InfoDisponible";
import DatosApp from "./comercial/DatosApp";
import Simulador from "./comercial/Simulador";

import CurvaS from "./cifras/CurvaS";
import AfisPorAsesor from "./cifras/AfisPorAsesor";
import AfisPorDepartamento from "./cifras/AfisPorDepartamento";
import Tableros from "./cifras/Tableros";
import CantidadAfisAsesorActualAnterior from "./cifras/CantidadAfisAsesorActualAnterior";
import Piramide from "./cifras/Piramide";
import CantidadPorMail from "./cifras/MailPorAsesor";
import { Principal2 } from "./Principal2";
import PruebaSlider from "./cifras/PruebaSlider";

export const userContext = React.createContext();

const App = () => {
  const [user, setUser] = useState(false);
  return (
    <userContext.Provider value={{ setUser, user }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/principal" element={<Principal2 />}></Route>
          <Route path="/consultas" element={<Consultas />}></Route>
          <Route
            path="/montevideoPeriferia"
            element={<MontevideoPeriferia />}
          ></Route>
          <Route path="/montevideoSur" element={<MontevideoSur />}></Route>
          <Route path="/interiorAC" element={<InteriorAC />}></Route>
          <Route path="/interiorDR" element={<InteriorDR />}></Route>
          <Route path="/interiorSZ" element={<InteriorSZ />}></Route>
          <Route path="/consultarDatosaApp" element={<ConsulasApp />}></Route>
          <Route path="/getDatosaApp" element={<DatosApp />}></Route>
          <Route path="/afisPorAsesor" element={<AfisPorAsesor />}></Route>
          <Route path="/curvaS" element={<CurvaS />}></Route>
          <Route path="/getInfoDisponible" element={<InfoDisponible />}></Route>
          <Route
            path="/afisPorDepartamento"
            element={<AfisPorDepartamento />}
          ></Route>
          <Route
            path="/afisPorAsesorActualAnterior"
            element={<CantidadAfisAsesorActualAnterior />}
          ></Route>
          <Route path="/simulador" element={<Simulador />}></Route>
          <Route path="/cantidadPorMail" element={<CantidadPorMail />}></Route>
          <Route path="/tableros" element={<Tableros />}></Route>
          <Route path="/cantidadPorEdadyPorSexo" element={<Piramide />}></Route>
          <Route path="/calendarios" element={<Calendario />}></Route>
          <Route path="/pruebaSlider" element={<PruebaSlider />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </userContext.Provider>
  );
};
export default App;
