const { spawn } = require("child_process");

export const encontrarFoto = (req, res) => {
  const { foto, cedula, formulario } = req.body;
  const args = [foto, cedula, formulario];

  let returnData = "";
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Operaciones\\fotoOperaciones.py", ...args]
  ); /*
  const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\fotoOperaciones.py",
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

export const detallePagosBpc = (req, res) => {
  let returnData = "";

  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Operaciones\\detallePagosBpc.py"]
  );

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\detallePagosBpc.py",
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

export const detallePagosAnr = (req, res) => {
  let returnData = "";

  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Operaciones\\detallePagosAnr.py"]
  );

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\detallePagosAnr.py",
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

export const realizarPagosBpc = (req, res) => {
  let returnData = "";

  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Operaciones\\Pagos BPC\\realizarPagosBpc.py"]
  );

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\detallePagosBpc.py",
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
