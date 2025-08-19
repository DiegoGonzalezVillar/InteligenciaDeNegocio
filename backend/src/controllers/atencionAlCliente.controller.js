const { spawn } = require("child_process");

export const generarArchivoDeSubCuentas = (req, res) => {
  let returnData = "";

  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    [
      "C:\\Compartida Python\\atencion al cliente\\archivo py\\generarArchivoDeSubCuentas.py",
    ]
  );

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\generarArchivoDeSubCuentas.py",
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
