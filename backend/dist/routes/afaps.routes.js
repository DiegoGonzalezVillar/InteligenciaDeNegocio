"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _afaps = require("../controllers/afaps.controller");
var _administracion = require("../controllers/administracion.controller");
var _inversiones = require("../controllers/inversiones.controller");
var _prestaciones = require("../controllers/prestaciones.controller");
var _operaciones = require("../controllers/operaciones.controller");
var _atencionAlCliente = require("../controllers/atencionAlCliente.controller");
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
router.get("/getCantPorEdadYPorSexo", _afaps.getCantPorEdadYPorSexo);
router.get("/getCantidadPorMail", _afaps.getCantidadPorMail);
router.get("/getCantidadPorMailPorAnio", _afaps.getCantidadPorMailPorAnio);
router.post("/simuladorProyeccionJubilatoria", _afaps.simuladorProyeccionJubilatoria);
router.post("/ultimaConsulta", _afaps.cargarDatosParaConsultar);
router.get("/afisPorAsesorPorAnio", _afaps.afisPorAsesorPorAnio);
router.get("/ratificacionesPorAsesorPorAnio", _afaps.ratificacionesPorAsesorPorAnio);
router.get("/afisPorAfap", _afaps.afisPorAfap);
router.get("/afisUltimoDiaPorAfap", _afaps.afisUltimoDiaPorAfap);
router.get("/asignacionesDeOficio", _afaps.asignacionesDeOficio);
router.get("/todasLasAfisPorAsesor", _afaps.todasLasAfisPorAsesor);
router.post("/curvaSPorFecha", _afaps.curvaSPorFecha);
router.post("/curvaS16713", _afaps.curvaS16713);
router.post("/infoPrestacionesSegunFecha", _afaps.infoPrestacionesSegunFecha);

//INVERSIONES
router.get("/ejecutarLimites30006", _inversiones.getLimites30006);
router.get("/ejecutarLimites30008", _inversiones.getLimites30008);

//ADMINISTRACION
router.get("/txtAcumulacion", _administracion.getTxtAcumulacion);
router.get("/txtRetiro", _administracion.getTxtRetiro);
router.get("/txtCrecimiento", _administracion.getTxtCrecimiento);
router.get("/letrasRm", _administracion.letrasRm);
router.get("/informeDirectorio", _administracion.informeDirectorio);
router.post("/valoresRentaBruta", _administracion.valoresRentaBruta);
router.get("/creacionTableroDeControl", _administracion.creacionTableroDeControl);
router.get("/txtBpcAcumulacion", _administracion.txtBpcAcumulacion);
router.get("/txtBpcRetiro", _administracion.txtBpcRetiro);

//OPERACIONES
router.post("/encontrarFoto", _operaciones.encontrarFoto);
router.get("/detallePagosBpc", _operaciones.detallePagosBpc);
router.get("/realizarPagosBpc", _operaciones.realizarPagosBpc);
router.get("/detallePagosAnr", _operaciones.detallePagosAnr);

//PRESTACIONES
router.get("/getObtenerVst", _prestaciones.getObtenerVst);
router.post("/generarArchivoBpc", _prestaciones.generarArchivoBpc);
router.post("/generarArchivoAnr", _prestaciones.generarArchivoAnr);

//ATENCION AL CLIENTE
router.get("/generarArchivoDeSubCuentas", _atencionAlCliente.generarArchivoDeSubCuentas);
var _default = exports["default"] = router;