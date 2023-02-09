import { getConnection } from '../database/connection'
import { queries } from '../database/querys'

export const principal = (req, res) => res.send('')

export const getUltimaConsultaMontevideoPeriferia = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getUltimaConsultaMontevideoPeriferia);
  res.json(result.recordset)
}

export const getUltimaConsultaMontevideoSur = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getUltimaConsultaMontevideoSur);
  res.json(result.recordset)
}
export const getUltimaConsultaInteriorAC = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getUltimaConsultaInteriorAC);
  res.json(result.recordset)
}

export const getUltimaConsultaInteriorDR = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getUltimaConsultaInteriorDR);
  res.json(result.recordset)
}
export const getUltimaConsultaInteriorSZ = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getUltimaConsultaInteriorSZ);
  res.json(result.recordset)
}

export const getTotalAfiliados = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
  .query(queries.getTotalAfiliados);
  res.json(result.recordset)
}

export const login = async (req, res) => {
  const pool = await getConnection()
  const usuario = req.body.username;
  const password = req.body.password;

  try {
    const login = await pool.request().input('usuario', usuario).input('password', password).query(queries.verificarUsuario);
    if (login.recordset.length == 0)
      res.json({ message: "Usuario Incorrecto!!" })
    else
      res.json({ message: "Login Exitoso!" })
  } catch (error) {
    console.log(error)
  }
}

export const cargarDatosParaConsultar = async (req, res) => {
  const pool = await getConnection()
  const asesores = [3118, 2071, 1400, 3153, 2030];
  for (let i = 0; i < req.body.length; i++) {
    const asesor = asesores[Math.floor(Math.random() * asesores.length)];
    const { cedula, fechaN } = req.body[i];
    fechaN = "'" + fechaN + "'"

    try {
      const smsNumero = await pool.request().query(queries.getSmsNumero);
      let numero = smsNumero.recordset[0].smsnumero;
      numero = numero + 1
      await pool.request().input('numero', numero).query(queries.insertSmsEntrada);
      await pool.request().input('numero', numero).input('cedula', cedula).input('fechaN', fechaN).input('asesor', asesor).query(queries.insertParaConsultar)
      //await pool.query(`INSERT INTO [SOLOACTIVIDAD].[dbo].[SMSENTRADALEVEL1]([smsnumero], [smscedula], [smsfecnac], [smsresultado], [smscuando], [smstexto], [smsobs], [smseltipo], [smstiempo], [asesor]) VALUES (${numero}, ${cedula}, ${fechaN} ,0,'17530101 00:00:00.000','',${asesor},5,NULL,${asesor})`);

    } catch (error) {
      console.log(error)
    }
  }
  res.json({ message: "Datos insertados correctamente" })
}

