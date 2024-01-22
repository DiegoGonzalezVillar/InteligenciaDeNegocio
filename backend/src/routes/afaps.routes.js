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
} from "../controllers/afaps.controller";

import {
  getTxtAcumulacion,
  getTxtRetiro,
  getTxtCrecimiento,
  informeDirectorio,
} from "../controllers/administracion.controller";

import {
  getLimites30006,
  getLimites30008,
} from "../controllers/inversiones.controller";

import { getObtenerVst } from "../controllers/prestaciones.controller";

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
router.post("/getAnioDeDATBPS", getObtenerVst);

//INVERSIONES
router.get("/ejecutarLimites30006", getLimites30006);
router.get("/ejecutarLimites30008", getLimites30008);

//ADMINISTRACION
router.get("/txtAcumulacion", getTxtAcumulacion);
router.get("/txtRetiro", getTxtRetiro);
router.get("/txtCrecimiento", getTxtCrecimiento);
router.get("/informeDirectorio", informeDirectorio);

export default router;
