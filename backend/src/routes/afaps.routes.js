import { Router } from "express";

import {
  login,
  getDatosCurvaS,
  getTotalAfiliados,
  getUltimaConsultaMontevideoPeriferia,
  getUltimaConsultaInteriorSZ,
  getUltimaConsultaMontevideoSur,
  getUltimaConsultaInteriorDR,
  getUltimaConsultaInteriorAC,
  cargarDatosParaConsultar,
  getDatosApp,
  getAfisPorAsesor,
  getTotalAfiliadosAnterior,
  getInfoDisponible,
  getDatosAppPorCantidad,
  getPendientesConsultasComercial,
  getAfisPorDepartamento,
  simuladorProyeccionJubilatoria,
  getCantidadDeAfiliados,
  getCantAfiliadosPorAsesorActualAnterior,
  getCantPorEdadYPorSexo,
  getCantidadPorMail,
  getCantidadPorMailPorAnio,
  getObtenerVst,
  getLimites,
  getLimites30008,
} from "../controllers/afaps.controller";
//import { login,getDatosCurvaS,getTotalAfiliados,getUltimaConsultaMontevideoPeriferia,getUltimaConsultaInteriorSZ,getUltimaConsultaMontevideoSur,getUltimaConsultaInteriorDR,getUltimaConsultaInteriorAC,cargarDatosParaConsultar, getDatosApp,getAfisPorAsesor,getTotalAfiliadosAnterior,getInfoDisponible,getDatosAppPorCantidad, getPendientesConsultasComercial,getAfisPorDepartamento,simuladorProyeccionJubilatoria } from "../controllers/afaps.controller"
const router = Router();

router.post("/login", login);
router.get("/montevideoPeriferia", getUltimaConsultaMontevideoPeriferia);
router.get("/totalAfiliados", getTotalAfiliados);
router.get("/montevideoSur", getUltimaConsultaMontevideoSur);
router.get("/interiorAC", getUltimaConsultaInteriorAC);
router.get("/interiorDR", getUltimaConsultaInteriorDR);
router.get("/interiorSZ", getUltimaConsultaInteriorSZ);
router.get("/datosApp", getDatosApp);
router.get("/afisPorAsesor", getAfisPorAsesor);
router.get("/curvaS", getDatosCurvaS);
router.get("/totalAfiliadosAnterior", getTotalAfiliadosAnterior);
router.get("/getInfoDisponible", getInfoDisponible);
router.get("/getDatosAppPorCantidad", getDatosAppPorCantidad);
router.get("/getPendientesConsultasComercial", getPendientesConsultasComercial);
router.get("/afisPorDepartamento", getAfisPorDepartamento);
router.get("/getCantidadDeAfiliados", getCantidadDeAfiliados);
router.get(
  "/getCantAfiliadosPorAsesorActualAnterior",
  getCantAfiliadosPorAsesorActualAnterior
);
//router.get('/getCantPorEdadYPorSexoAsesor',getCantPorEdadYPorSexoAsesor)
router.get("/getCantPorEdadYPorSexo", getCantPorEdadYPorSexo);
router.get("/getCantidadPorMail", getCantidadPorMail);
router.get("/getCantidadPorMailPorAnio", getCantidadPorMailPorAnio);
router.post("/simuladorProyeccionJubilatoria", simuladorProyeccionJubilatoria);
router.post("/ultimaConsulta", cargarDatosParaConsultar);
router.post("/getObtenerVst", getObtenerVst);
router.get("/ejecutarLimites", getLimites);
router.get("/ejecutarLimites30008", getLimites30008);

export default router;
