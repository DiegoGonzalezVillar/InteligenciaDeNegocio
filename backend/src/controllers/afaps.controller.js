import { getConnection } from '../database/connection'
import { queries } from '../database/querys'
const XLSX = require('xlsx');
const { spawn } = require('child_process');



export const principal = (req, res) => res.send('')

export const getUltimaConsultaMontevideoPeriferia = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getUltimaConsultaMontevideoPeriferia);
  res.json(result.recordset)
}

export const getDatosCurvaS = async (req, res) => {
  //const workbook = XLSX.readFile('F:\\Usuario\\Escritorio\\NodeSQL\\backend\\src\\controllers\\df2023.xlsx');
  const workbook = XLSX.readFile('C:\\Compartida Python\\df2023.xlsx');
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);
  res.send(data)
};


export const getCantidadDeAfiliados = (req, res) => {
  const pythonProcess = spawn('python', ['F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\cantidadDeAfiliados.py']);
  let returnData = ''
  pythonProcess.stdout.on('data', (data) => {
    returnData = data.toString().split('RETURN_VALUE:')[1];
    res.send(returnData)
  });
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  /*pythonProcess.on('close', (code) => {
    res.send(returnData)
  });*/
}

// Opciones de configuración para PythonShell

/*
sueldo
actividad
art8
edad
años de actividad
genero
*/

export const simuladorProyeccionJubilatoria = (req, res) => {
  console.log(req.body)
  const { sueldo, actividad, art8 , edad, añosActividad, genero} = req.body;
  const sueldoNumero = parseInt(sueldo)
  const edadNumero = parseInt(edad)
  const args = [sueldoNumero, actividad, art8, edadNumero, parseInt(añosActividad),genero]; 
  
  let returnData = ''
  const pythonProcess = spawn('python', ['F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\pruebaSimulador2.py', ...args]);

  pythonProcess.stdout.on('data', (data) => {
    returnData += data
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.json(JSON.parse(returnData));
  });
}

export const getUltimaConsultaMontevideoSur = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getUltimaConsultaMontevideoSur);
  res.json(result.recordset)
}

export const getAfisPorDepartamento = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getAfisPorDepartamento);
  res.json(result.recordset)
}


export const getInfoDisponible = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getInfoDisponible);
  res.json(result.recordset)
}

export const getDatosAppPorCantidad = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getDatosAppPorCantidad);
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



export const getTotalAfiliadosAnterior = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getTotalAfiliadosAnterior);
  res.json(result.recordset)
}
export const getDatosApp = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getDatosApp);
  res.json(result.recordset)
}

export const getPendientesConsultasComercial = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getPendientesConsultasComercial);
  res.json(result.recordset)
}

export const getAfisPorAsesor = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.request()
    .query(queries.getAfisPorAsesor);
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
  let asesor = ''
  try {
    const smsNumero = await pool.request().query(queries.getSmsNumero);
    let numero = smsNumero.recordset[0].smsnumero;
    numero = numero + 1
    await pool.request().input('numero', numero).query(queries.insertSmsEntrada);
    for (let i = 0; i < req.body.length; i++) {
      asesor = asesores[Math.floor(Math.random() * asesores.length)];
      const { cedula, fechaN } = req.body[i];
      await pool.request().input('numero', numero).input('cedula', cedula).input('fechaN', fechaN).input('asesor', asesor).query(queries.insertParaConsultar)
    }
    res.json({ message: "Datos insertados con exito!" })
  } catch (error) {
    res.status(500).json({ message: "Error al cargar los datos" });
  }
}

