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
  afisPorAsesorPorAnio,
  afisPorAfap,
  afisUltimoDiaPorAfap,
  ratificacionesPorAsesorPorAnio,
  asignacionesDeOficio,
  todasLasAfisPorAsesor,
  curvaSPorFecha,
  curvaS16713,
} from "../controllers/afaps.controller";

import {
  getTxtAcumulacion,
  getTxtRetiro,
  getTxtCrecimiento,
  letrasRm,
  informeDirectorio,
  valoresRentaBruta,
  creacionTableroDeControl,
  txtBpcAcumulacion,
  txtBpcRetiro,
} from "../controllers/administracion.controller";

import {
  getLimites30006,
  getLimites30008,
} from "../controllers/inversiones.controller";

import {
  getObtenerVst,
  generarArchivoBpc,
  generarArchivoAnr,
} from "../controllers/prestaciones.controller";

import {
  encontrarFoto,
  detallePagosBpc,
  realizarPagosBpc,
  detallePagosAnr,
} from "../controllers/operaciones.controller";

import { generarArchivoDeSubCuentas } from "../controllers/atencionAlCliente.controller";

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
router.get("/getCantPorEdadYPorSexo", getCantPorEdadYPorSexo);
router.get("/getCantidadPorMail", getCantidadPorMail);
router.get("/getCantidadPorMailPorAnio", getCantidadPorMailPorAnio);
router.post("/simuladorProyeccionJubilatoria", simuladorProyeccionJubilatoria);
router.post("/ultimaConsulta", cargarDatosParaConsultar);

router.get("/afisPorAsesorPorAnio", afisPorAsesorPorAnio);
router.get("/ratificacionesPorAsesorPorAnio", ratificacionesPorAsesorPorAnio);
router.get("/afisPorAfap", afisPorAfap);
router.get("/afisUltimoDiaPorAfap", afisUltimoDiaPorAfap);
router.get("/asignacionesDeOficio", asignacionesDeOficio);
router.get("/todasLasAfisPorAsesor", todasLasAfisPorAsesor);
router.post("/curvaSPorFecha", curvaSPorFecha);
router.post("/curvaS16713", curvaS16713);

//INVERSIONES
router.get("/ejecutarLimites30006", getLimites30006);
router.get("/ejecutarLimites30008", getLimites30008);

//ADMINISTRACION
router.get("/txtAcumulacion", getTxtAcumulacion);
router.get("/txtRetiro", getTxtRetiro);
router.get("/txtCrecimiento", getTxtCrecimiento);
router.get("/letrasRm", letrasRm);
router.get("/informeDirectorio", informeDirectorio);
router.post("/valoresRentaBruta", valoresRentaBruta);
router.get("/creacionTableroDeControl", creacionTableroDeControl);
router.get("/txtBpcAcumulacion", txtBpcAcumulacion);
router.get("/txtBpcRetiro", txtBpcRetiro);

//OPERACIONES
router.post("/encontrarFoto", encontrarFoto);
router.get("/detallePagosBpc", detallePagosBpc);
router.get("/realizarPagosBpc", realizarPagosBpc);
router.get("/detallePagosAnr", detallePagosAnr);

//PRESTACIONES
router.get("/getObtenerVst", getObtenerVst);
router.post("/generarArchivoBpc", generarArchivoBpc);
router.post("/generarArchivoAnr", generarArchivoAnr);

//ATENCION AL CLIENTE
router.get("/generarArchivoDeSubCuentas", generarArchivoDeSubCuentas);

export default router;
