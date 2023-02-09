
import { Router } from 'express';

import { login,getTotalAfiliados,getUltimaConsultaMontevideoPeriferia,getUltimaConsultaInteriorSZ,getUltimaConsultaMontevideoSur,getUltimaConsultaInteriorDR,getUltimaConsultaInteriorAC,cargarDatosParaConsultar } from "../controllers/afaps.controller"

const router = Router()

router.post('/login',login)
router.get('/montevideoPeriferia',getUltimaConsultaMontevideoPeriferia)
router.get('/totalAfiliados',getTotalAfiliados)
router.get('/montevideoSur',getUltimaConsultaMontevideoSur)
router.get('/interiorAC',getUltimaConsultaInteriorAC)
router.get('/interiorDR',getUltimaConsultaInteriorDR)
router.get('/interiorSZ',getUltimaConsultaInteriorSZ)
router.post('/ultimaConsulta',cargarDatosParaConsultar)


export default router
