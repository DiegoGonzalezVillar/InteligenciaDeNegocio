
import { Router } from 'express';

import { login,getDatosCurvaS,getTotalAfiliados,getUltimaConsultaMontevideoPeriferia,getUltimaConsultaInteriorSZ,getUltimaConsultaMontevideoSur,getUltimaConsultaInteriorDR,getUltimaConsultaInteriorAC,cargarDatosParaConsultar, getDatosApp,getAfisPorAsesor,getTotalAfiliadosAnterior,getInfoDisponible,getDatosAppPorCantidad, getPendientesConsultasComercial,getAfisPorDepartamento,getCantidadDeAfiliados,simuladorProyeccionJubilatoria } from "../controllers/afaps.controller"

const router = Router()

router.post('/login',login)
router.get('/montevideoPeriferia',getUltimaConsultaMontevideoPeriferia)
router.get('/totalAfiliados',getTotalAfiliados)
router.get('/montevideoSur',getUltimaConsultaMontevideoSur)
router.get('/interiorAC',getUltimaConsultaInteriorAC)
router.get('/interiorDR',getUltimaConsultaInteriorDR)
router.get('/interiorSZ',getUltimaConsultaInteriorSZ)
router.get('/datosApp', getDatosApp)
router.get('/afisPorAsesor', getAfisPorAsesor)
router.get('/curvaS', getDatosCurvaS)
router.get('/totalAfiliadosAnterior',getTotalAfiliadosAnterior)
router.get('/getInfoDisponible',getInfoDisponible)
router.get('/getDatosAppPorCantidad',getDatosAppPorCantidad)
router.get('/getPendientesConsultasComercial',getPendientesConsultasComercial)
router.get('/afisPorDepartamento',getAfisPorDepartamento)
router.get('/getCantidadDeAfiliados',getCantidadDeAfiliados)
router.post('/simuladorProyeccionJubilatoria',simuladorProyeccionJubilatoria)
router.post('/ultimaConsulta',cargarDatosParaConsultar)

export default router
