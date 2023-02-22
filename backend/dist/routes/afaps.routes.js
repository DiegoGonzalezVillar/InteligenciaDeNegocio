"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _afaps = require("../controllers/afaps.controller");
var router = (0, _express.Router)();
router.post('/login', _afaps.login);
router.get('/montevideoPeriferia', _afaps.getUltimaConsultaMontevideoPeriferia);
router.get('/totalAfiliados', _afaps.getTotalAfiliados);
router.get('/montevideoSur', _afaps.getUltimaConsultaMontevideoSur);
router.get('/interiorAC', _afaps.getUltimaConsultaInteriorAC);
router.get('/interiorDR', _afaps.getUltimaConsultaInteriorDR);
router.get('/interiorSZ', _afaps.getUltimaConsultaInteriorSZ);
router.get('/datosaApp', _afaps.getDatosApp);
router.get('/afisPorAsesor', _afaps.getAfisPorAsesor);
router.get('/curvaS', _afaps.getDatosCurvaS);
router.get('/totalAfiliadosAnterior', _afaps.getTotalAfiliadosAnterior);
router.post('/ultimaConsulta', _afaps.cargarDatosParaConsultar);
var _default = router;
exports["default"] = _default;