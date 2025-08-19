const { spawn } = require("child_process");

export const getObtenerVst = async (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    [
      "C:\\Compartida Python\\Prestaciones\\fallecidos\\generarTxtFallecidos.py",
    ],
    {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"], // Pipe para stdout y stderr
    }
  );
  pythonProcess.on("close", (codigo) => {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente",
      });
    } else {
      res.status(500).send({
        message: `Error al ejecutar el script. Codigo de salida ${codigo}`,
      });
    }
  });
};

export const generarArchivoBpc = (req, res) => {
  const { cedula, porcentaje, favChecked } = req.body;
  const args = [cedula, porcentaje, favChecked];

  let returnData = "";
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    [
      "C:\\Compartida Python\\Prestaciones\\Creacion archivo bpc crm.py",
      ...args,
    ]
  );
  /*
  const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\Creacion archivo bpc crm.py",
    ...args,
  ]);*/
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

export const generarArchivoAnr = (req, res) => {
  const { fecha } = req.body;
  const args = [fecha];

  let returnData = "";
  let errorData = "";

  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Prestaciones\\creacion archivo anr.py", ...args]
  );

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\creacion archivo anr.py",
      ...args,
    ]
  );
*/
  // Captura la salida estándar
  pythonProcess.stdout.on("data", (data) => {
    returnData += data.toString();
  });

  // Captura errores del proceso
  pythonProcess.stderr.on("data", (data) => {
    errorData += data.toString();
  });

  // Cuando el proceso termina
  pythonProcess.on("close", (code) => {
    // Si hubo errores o el código de salida no es 0, algo falló
    if (code !== 0 || errorData) {
      res.status(500).json({
        mensaje:
          "No se pudo crear el archivo correspondiente, contactar administrador",
        error: errorData,
      });
    } else {
      res.json({ mensaje: "Archivo creado correctamente", data: returnData });
    }
  });
};
