import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Navbar from "./componentes/Navbar";
import Calendario from "./componentes/Calendarios";
import Inicio from "./Principal";
import Principal2 from "./Principal2";
import Footer from "./componentes/Footer";
import Consultas from "./comercial/Consultas";
import MontevideoSur from "./comercial/MontevideoSur";
import InteriorAC from "./comercial/InteriorAC";
import InteriorDR from "./comercial/InteriorDR";
import InteriorSZ from "./comercial/InteriorSZ";
import MontevideoPeriferia from "./comercial/MontevideoPeriferia";
import InfoDisponible from "./comercial/InfoDisponible";
import DatosApp from "./comercial/DatosApp";
import ConsultasApp from "./comercial/ConsultasApp";
import Simulador from "./comercial/Simulador";
import CurvaS from "./cifras/CurvaS";
import AfisPorAsesor from "./cifras/AfisPorAsesor";
import AfisPorDepartamento from "./cifras/AfisPorDepartamento";
import Tableros from "./cifras/Tableros";
import CantidadAfisAsesorActualAnterior from "./cifras/CantidadAfisAsesorActualAnterior";
import Piramide from "./cifras/Piramide";
import CantidadPorMail from "./cifras/MailPorAsesor";
import PruebaSlider from "./cifras/PruebaSlider";
import MenuPrestaciones from "./prestaciones/MenuPrestaciones";
import GenerarArchivoBpc from "./prestaciones/GenerarArchivoBpc";
import Limites from "./inversiones/Limites";
import Administracion from "./administracion/Administracion";
import GeneracionTxt from "./administracion/GeneracionTxt";
import LetrasRM from "./administracion/LetrasRM";
import MenuOperaciones from "./operaciones/MenuOperaciones";
import EncontrarFoto from "./operaciones/EncontrarFoto";
import PagosBpc from "./operaciones/PagosBpc";
import AfisPorAsesorPorAño from "./cifras/AfisPorAsesorPorAño";
import AfisPorAfapBps from "./cifras/AfisPorAfapBps";
import ValoresRentaBruta from "./administracion/ValoresRentaBruta";
import MenuAdministracion from "./administracion/MenuAdministracion";
import TxtBpc from "./administracion/TxtBpc";
import RatificacionesPorAsesorPoraño from "./cifras/RatificacionesPorAsesorPorAño";
import DetalleOficios from "./cifras/DetalleOficios";
import CantidadPorAsesor from "./cifras/CantidadPorAsesor";
import PagosAnr from "./operaciones/PagosAnr";
import PreguntasFrecuentes from "./atencionAlCliente/preguntasFrecuentes";
import TodasAfisPorAsesor from "./cifras/TodasAfisPorAsesor";
import MenuAtencionAlCliente from "./atencionAlCliente/MenuAtencionAlCliente";
import CurvaSPorFecha from "./cifras/CurvaSPorFecha";
import CurvaS16713 from "./cifras/CurvaS16713";
import GenerarArchivoAnr from "./prestaciones/GenerarArchivoAnr";

export const userContext = React.createContext();

const App = () => {
  const [user, setUser] = useState(false);
  return (
    <userContext.Provider value={{ setUser, user }}>
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
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
            <Route
              path="/consultarDatosaApp"
              element={<ConsultasApp />}
            ></Route>
            <Route path="/getDatosaApp" element={<DatosApp />}></Route>
            <Route path="/afisPorAsesor" element={<AfisPorAsesor />}></Route>
            <Route
              path="/afisPorAsesorPorAnio"
              element={<AfisPorAsesorPorAño />}
            ></Route>
            <Route
              path="/ratificacionesPorAsesorPorAnio"
              element={<RatificacionesPorAsesorPoraño />}
            ></Route>
            <Route path="/curvaS" element={<CurvaS />}></Route>
            <Route
              path="/getInfoDisponible"
              element={<InfoDisponible />}
            ></Route>
            <Route
              path="/afisPorDepartamento"
              element={<AfisPorDepartamento />}
            ></Route>
            <Route
              path="/afisPorAsesorActualAnterior"
              element={<CantidadAfisAsesorActualAnterior />}
            ></Route>
            <Route path="/simulador" element={<Simulador />}></Route>
            <Route
              path="/cantidadPorMail"
              element={<CantidadPorMail />}
            ></Route>
            <Route path="/tableros" element={<Tableros />}></Route>
            <Route
              path="/cantidadPorEdadyPorSexo"
              element={<Piramide />}
            ></Route>
            <Route path="/calendarios" element={<Calendario />}></Route>
            <Route path="/pruebaSlider" element={<PruebaSlider />}></Route>
            <Route path="/prestaciones" element={<MenuPrestaciones />}></Route>
            <Route
              path="/generarArchivoBpc"
              element={<GenerarArchivoBpc />}
            ></Route>
            <Route path="/inversiones" element={<Limites />}></Route>
            <Route path="/administracion" element={<Administracion />}></Route>
            <Route path="/operaciones" element={<MenuOperaciones />}></Route>
            <Route path="/encontrarFoto" element={<EncontrarFoto />}></Route>
            <Route path="/detallePagosBpc" element={<PagosBpc />}></Route>
            <Route path="/detallePagosAnr" element={<PagosAnr />}></Route>

            <Route path="/generacionTxt" element={<GeneracionTxt />}></Route>
            <Route path="/letrasRM" element={<LetrasRM />}></Route>
            <Route path="/afisPorAfap" element={<AfisPorAfapBps />}></Route>
            <Route
              path="/valoresRentaBruta"
              element={<ValoresRentaBruta />}
            ></Route>
            <Route path="/menuAdmin" element={<MenuAdministracion />}></Route>
            <Route path="/generacionTxtBpc" element={<TxtBpc />}></Route>
            <Route path="/detalleOficios" element={<DetalleOficios />}></Route>
            <Route
              path="/cantidadPorAsesor"
              element={<CantidadPorAsesor />}
            ></Route>

            <Route
              path="/preguntasFrecuentes"
              element={<PreguntasFrecuentes />}
            ></Route>
            <Route
              path="/todasAfisPorAsesor"
              element={<TodasAfisPorAsesor />}
            ></Route>
            <Route
              path="/menuAtencionAlcliente"
              element={<MenuAtencionAlCliente />}
            ></Route>
            <Route path="/curvaSPorFecha" element={<CurvaSPorFecha />}></Route>
            <Route path="/curvaS16713" element={<CurvaS16713 />}></Route>
            <Route
              path="/generarArchivoAnr"
              element={<GenerarArchivoAnr />}
            ></Route>
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </userContext.Provider>
  );
};
export default App;
