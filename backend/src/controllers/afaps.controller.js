import { getConnection } from "../database/connection";
import { queries } from "../database/querys";
const XLSX = require("xlsx");
const { spawn } = require("child_process");

//export const principal = (req, res) => res.send("");

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
  /*const workbook = XLSX.readFile(
    "F:\\Usuario\\Escritorio\\ratificados y finalizados al 30-04-2025.xlsx"
  );*/
  const workbook = XLSX.readFile("C:\\Compartida Python\\df2025.xlsx");
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);
  res.send(data);
};

export const curvaSPorFecha = async (req, res) => {
  const { fecha } = req.body;
  const args = [fecha];
  let returnData = "";
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",

    ["C:\\Compartida Python\\Comercial\\curvaSPorFecha.py", ...args]
  );

  /* const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\curvaSPorFecha.py",
      ...args,
    ]
  );*/

  pythonProcess.stdout.on("data", (data) => {
    returnData += data;
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  pythonProcess.on("close", (code) => {
    res.json(returnData);
  });
};

export const infoPrestacionesSegunFecha = async (req, res) => {
  const { desde, hasta } = req.body;
  const args = [desde, hasta];
  let returnData = "";

  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",

    [
      "C:\\Compartida Python\\Prestaciones\\infoPrestacionesSegunFecha.py",
      ...args,
    ]
  );
  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\infoPrestacionesSegunFecha.py",
      ...args,
    ]
  );*/

  pythonProcess.stdout.on("data", (data) => {
    returnData += data;
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  pythonProcess.on("close", (code) => {
    res.json(returnData);
  });
};

export const curvaS16713 = async (req, res) => {
  const { fecha } = req.body;
  const args = [fecha];
  let returnData = "";

  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",

    ["C:\\Compartida Python\\Comercial\\curvaS16713.py", ...args]
  );

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\curvaS16713.py",
      ...args,
    ]
  );
*/
  pythonProcess.stdout.on("data", (data) => {
    returnData += data;
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  pythonProcess.on("close", (code) => {
    res.json(returnData);
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

  let returnData = "";
  /*const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Simulador\\simulador_nueva.py", ...args]
  );
  /*const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\Diego\\simulador\\simulador_nueva.py",
    ...args,
  ]);*/
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    ["F:\\Usuario\\Escritorio\\Diego\\simulador\\simulador_nueva.py", ...args]
  );

  pythonProcess.stdout.on("data", (data) => {
    returnData += data;
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
    res.json(returnData);
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

export const afisPorAsesorPorAnio = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.afisPorAsesorPorAnio);
  res.json(result.recordset);
};

export const ratificacionesPorAsesorPorAnio = async (req, res) => {
  const pool = await getConnection();
  const result = await pool
    .request()
    .query(queries.ratificacionesPorAsesorPorAnio);
  res.json(result.recordset);
};

export const afisPorAfap = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.afisPorAfap);
  res.json(result.recordset);
};

export const afisUltimoDiaPorAfap = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.afisUltimoDiaPorAfap);
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

export const asignacionesDeOficio = (req, res) => {
  let returnData = "";

  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",

    ["C:\\Compartida Python\\Comercial\\asignacionesDeOficio.py"]
  );
  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    ["W:\\Comercial\\asignacionesDeOficio.py"]
  );
*/
  pythonProcess.stdout.on("data", (data) => {
    returnData += data;
  });
  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
  pythonProcess.on("close", (code) => {
    res.json(returnData);
  });
};

export const oficiosPorUsuario = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\oficiosPorUsuario.py",
    ],
    { env: process.env }
  );

  let out = "";
  let err = "";

  pythonProcess.stdout.on("data", (data) => {
    out += data.toString("utf8"); // Buffer -> string
  });

  pythonProcess.stderr.on("data", (data) => {
    err += data.toString("utf8"); // logs/errores
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(err);
      return res.status(500).json({ error: "python_failed", detail: err });
    }
    try {
      const json = JSON.parse(out); // <- convertir texto JSON a objeto
      return res.json(json); // <- enviar objeto (no string)
    } catch (e) {
      // Fallback por si hay basura alrededor del JSON
      const start = out.indexOf("{");
      const end = out.lastIndexOf("}");
      if (start !== -1 && end !== -1) {
        try {
          return res.json(JSON.parse(out.slice(start, end + 1)));
        } catch (_) {}
      }
      console.error("invalid_json", out.slice(0, 200), err);
      return res
        .status(500)
        .json({ error: "invalid_json", outSnippet: out.slice(0, 200) });
    }
  });
};

export const todasLasAfisPorAsesor = async (req, res) => {
  const pool = await getConnection();
  const result = await pool.request().query(queries.todasLasAfisPorAsesor);
  res.json(result.recordset);
};

export const cargarDatosParaConsultar = async (req, res) => {
  const pool = await getConnection();
  const asesores = [3118, 2071, 1400, 3153, 2030, 3007, 3076];
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
