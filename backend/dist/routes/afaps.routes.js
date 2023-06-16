"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _afaps = require("../controllers/afaps.controller");
//import { login,getDatosCurvaS,getTotalAfiliados,getUltimaConsultaMontevideoPeriferia,getUltimaConsultaInteriorSZ,getUltimaConsultaMontevideoSur,getUltimaConsultaInteriorDR,getUltimaConsultaInteriorAC,cargarDatosParaConsultar, getDatosApp,getAfisPorAsesor,getTotalAfiliadosAnterior,getInfoDisponible,getDatosAppPorCantidad, getPendientesConsultasComercial,getAfisPorDepartamento,simuladorProyeccionJubilatoria } from "../controllers/afaps.controller"
var router = (0, _express.Router)();
router.post("/login", _afaps.login);
router.get("/montevideoPeriferia", _afaps.getUltimaConsultaMontevideoPeriferia);
router.get("/totalAfiliados", _afaps.getTotalAfiliados);
router.get("/montevideoSur", _afaps.getUltimaConsultaMontevideoSur);
router.get("/interiorAC", _afaps.getUltimaConsultaInteriorAC);
router.get("/interiorDR", _afaps.getUltimaConsultaInteriorDR);
router.get("/interiorSZ", _afaps.getUltimaConsultaInteriorSZ);
router.get("/datosApp", _afaps.getDatosApp);
router.get("/afisPorAsesor", _afaps.getAfisPorAsesor);
router.get("/curvaS", _afaps.getDatosCurvaS);
router.get("/totalAfiliadosAnterior", _afaps.getTotalAfiliadosAnterior);
router.get("/getInfoDisponible", _afaps.getInfoDisponible);
router.get("/getDatosAppPorCantidad", _afaps.getDatosAppPorCantidad);
router.get("/getPendientesConsultasComercial", _afaps.getPendientesConsultasComercial);
router.get("/afisPorDepartamento", _afaps.getAfisPorDepartamento);
router.get("/getCantidadDeAfiliados", _afaps.getCantidadDeAfiliados);
router.get("/getCantAfiliadosPorAsesorActualAnterior", _afaps.getCantAfiliadosPorAsesorActualAnterior);
//router.get('/getCantPorEdadYPorSexoAsesor',getCantPorEdadYPorSexoAsesor)
router.get("/getCantPorEdadYPorSexo", _afaps.getCantPorEdadYPorSexo);
router.get("/getCantidadPorMail", _afaps.getCantidadPorMail);
router.get("/getCantidadPorMailPorAnio", _afaps.getCantidadPorMailPorAnio);
router.post("/simuladorProyeccionJubilatoria", _afaps.simuladorProyeccionJubilatoria);
router.post("/ultimaConsulta", _afaps.cargarDatosParaConsultar);
var _default = router;
exports["default"] = _default;