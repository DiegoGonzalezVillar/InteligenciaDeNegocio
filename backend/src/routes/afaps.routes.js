
import { Router } from 'express';

import { login,getDatosCurvaS,getTotalAfiliados,getUltimaConsultaMontevideoPeriferia,getUltimaConsultaInteriorSZ,getUltimaConsultaMontevideoSur,getUltimaConsultaInteriorDR,getUltimaConsultaInteriorAC,cargarDatosParaConsultar, getDatosApp,getAfisPorAsesor,getTotalAfiliadosAnterior } from "../controllers/afaps.controller"

const router = Router()

router.post('/login',login)
router.get('/montevideoPeriferia',getUltimaConsultaMontevideoPeriferia)
router.get('/totalAfiliados',getTotalAfiliados)
router.get('/montevideoSur',getUltimaConsultaMontevideoSur)
router.get('/interiorAC',getUltimaConsultaInteriorAC)
router.get('/interiorDR',getUltimaConsultaInteriorDR)
router.get('/interiorSZ',getUltimaConsultaInteriorSZ)
router.get('/datosaApp', getDatosApp)
router.get('/afisPorAsesor', getAfisPorAsesor)
router.get('/curvaS', getDatosCurvaS)
router.get('/totalAfiliadosAnterior',getTotalAfiliadosAnterior)
router.post('/ultimaConsulta',cargarDatosParaConsultar)


export default router
