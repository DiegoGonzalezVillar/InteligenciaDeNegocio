import { getConnection } from "../database/connection";
import { queries } from "../database/querys";
const XLSX = require("xlsx");
const { spawn } = require("child_process");

export const principal = (req, res) => res.send("");

export const getUltimaConsultaMontevideoPeriferia = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(queries.getUltimaConsultaMontevideoPeriferia);
  res.json(result.recordset);
};

export const getCantidadDeAfiliados = async (req, res) => {
  let conn;
  try {
    conn = await getOracleConnection();
    const result = await conn.execute(queries.getCantidadDeAfiliados);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (conn) {
      await conn.close();
    }
  }
};

export const getDatosCurvaS = async (req, res) => {
  //const workbook = XLSX.readFile('F:\\Usuario\\Escritorio\\df2023.xlsx')
  const workbook = XLSX.readFile("C:\\Compartida Python\\df2023.xlsx");
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);
  res.send(data);
};

export const getLimites = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\consulta30006.py"],
    {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"], // Pipe para stdout y stderr
    }
  );
  let outputData = "";

  pythonProcess.stdout.on("data", (data) => {
    outputData += data.toString();
    console.log(outputData);
  });

  pythonProcess.on("close", (codigo) => {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente",
      });
    } else {
      res.status(500).send({
        message: `Error al ejecutar el script de Python. Código de salida: ${codigo}`,
        output: outputData.trim(), // Se puede obtener incluso en caso de error
        exitCode: codigo,
      });
    }
  });

  pythonProcess.on("error", (error) => {
    console.error(`Error al ejecutar el script de Python: ${error}`);
    res.status(500).send({
      message: "Error al ejecutar el script de Python",
      output: outputData.trim(), // También se puede obtener en caso de error
      exitCode: -1, // Un valor de código de salida personalizado para errores
    });
  });
};

export const getLimites30008 = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\consulta30008.py"],
    {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"], // Pipe para stdout y stderr
    }
  );
  let outputData = "";

  pythonProcess.stdout.on("data", (data) => {
    outputData += data.toString();
    console.log(outputData);
  });

  pythonProcess.on("close", (codigo) => {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente",
      });
    } else {
      res.status(500).send({
        message: `Error al ejecutar el script de Python. Código de salida: ${codigo}`,
        output: outputData.trim(), // Se puede obtener incluso en caso de error
        exitCode: codigo,
      });
    }
  });

  pythonProcess.on("error", (error) => {
    console.error(`Error al ejecutar el script de Python: ${error}`);
    res.status(500).send({
      message: "Error al ejecutar el script de Python",
      output: outputData.trim(), // También se puede obtener en caso de error
      exitCode: -1, // Un valor de código de salida personalizado para errores
    });
  });
};

export const getObtenerVst = async (req, res) => {
  const excelFile = req.files.excelFile;
  const workbook = XLSX.read(excelFile.data);
  const sheetName = workbook.SheetNames[0];
  const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const cedulasArray = sheetData.map((item) => item.cedulas);
  const cedulasString = cedulasArray.join("','");
  const query = `
    SELECT CI, Subestado
    FROM [192.168.20.2].[IAFAPCRM].[sysdba].[CRM_Comercial]
    WHERE CI IN ('${cedulasString}') AND Subestado IN ('VST', 'CST')
  `;

  const pool = await getConnection();
  const result = await pool.request().query(query);

  res.json({
    message: "Archivo Excel procesado exitosamente",
    data: result.recordset,
  });
};

export const simuladorProyeccionJubilatoria = (req, res) => {
  const {
    sueldo,
    actividad,
    art8,
    edad,
    añosActividad,
    genero,
    cantidadHijos,
    actividadBonificada,
    bonificada,
    saldoAcumulacion,
    saldoRetiro,
  } = req.body;
  const sueldoNumero = parseInt(sueldo);
  const edadNumero = parseInt(edad);
  const args = [
    sueldoNumero,
    actividad,
    art8,
    edadNumero,
    parseInt(añosActividad),
    genero,
    parseInt(cantidadHijos),
    actividadBonificada,
    bonificada,
    saldoAcumulacion,
    saldoRetiro,
  ];
  console.log(args);

  let returnData = "";
  //const pythonProcess = spawn('C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe', ['C:\\Compartida Python\\simuladorV1.py', ...args]);
  const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\simuladorV2.py",
    ...args,
  ]);
  pythonProcess.stdout.on("data", (data) => {
    returnData += data;
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

export const getUltimaConsultaMontevideoSur = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(queries.getUltimaConsultaMontevideoSur);
  res.json(result.recordset);
};
export const getCantidadPorMail = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getCantidadPorMail);
  res.json(result.recordset);
};

export const getCantidadPorMailPorAnio = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getCantidadPorMailPorAnio);
  res.json(result.recordset);
};

export const getAfisPorDepartamento = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getAfisPorDepartamento);
  res.json(result.recordset);
};

export const getCantAfiliadosPorAsesorActualAnterior = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(queries.getCantAfiliadosPorAsesorActualAnterior);
  res.json(result.recordset);
};

export const getCantPorEdadYPorSexo = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getCantPorEdadYPorSexo);
  res.json(result.recordset);
};

export const getInfoDisponible = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getInfoDisponible);
  res.json(result.recordset);
};

export const getDatosAppPorCantidad = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getDatosAppPorCantidad);
  res.json(result.recordset);
};

export const getUltimaConsultaInteriorAC = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(queries.getUltimaConsultaInteriorAC);
  res.json(result.recordset);
};

export const getUltimaConsultaInteriorDR = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(queries.getUltimaConsultaInteriorDR);
  res.json(result.recordset);
};
export const getUltimaConsultaInteriorSZ = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(queries.getUltimaConsultaInteriorSZ);
  res.json(result.recordset);
};

export const getTotalAfiliados = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getTotalAfiliados);
  res.json(result.recordset);
};

export const getTotalAfiliadosAnterior = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getTotalAfiliadosAnterior);
  res.json(result.recordset);
};
export const getDatosApp = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getDatosApp);
  res.json(result.recordset);
};

export const getPendientesConsultasComercial = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(queries.getPendientesConsultasComercial);
  res.json(result.recordset);
};

export const getAfisPorAsesor = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.getAfisPorAsesor);
  res.json(result.recordset);
};

export const login = async (req, res) => {
  const pool = await getConnection();
  const usuario = req.body.username;
  const password = req.body.password;

  try {
    const login = await pool
      .request()
      .input("usuario", usuario)
      .input("password", password)
      .query(queries.verificarUsuario);
    if (login.recordset.length == 0)
      res.json({ message: "Usuario Incorrecto!!" });
    else res.json({ message: "Login Exitoso!" });
  } catch (error) {
    console.log(error);
  }
};

export const cargarDatosParaConsultar = async (req, res) => {
  //console.log(res);
  const pool = await getConnection();
  const asesores = [3118, 2071, 1400, 3153, 2030];
  let asesor = "";
  try {
    const smsNumero = await pool.request().query(queries.getSmsNumero);
    let numero = smsNumero.recordset[0].smsnumero;
    numero = numero + 1;
    console.log(numero);
    await pool
      .request()
      .input("numero", numero)
      .query(queries.insertSmsEntrada);
    for (let i = 0; i < req.body.length; i++) {
      console.log("pool");
      asesor = asesores[Math.floor(Math.random() * asesores.length)];
      const { cedula, fechaN } = req.body[i];
      await pool
        .request()
        .input("numero", numero)
        .input("cedula", cedula)
        .input("fechaN", fechaN)
        .input("asesor", asesor)
        .query(queries.insertParaConsultar);
    }

    res.json({ message: "Datos insertados con exito!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al cargar los datos Wein Ronnnney" });
  }
};
