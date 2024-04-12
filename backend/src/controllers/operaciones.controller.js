const { spawn } = require("child_process");

export const encontrarFoto = (req, res) => {
  const { foto, cedula, formulario } = req.body;
  /*const sueldoNumero = parseInt(sueldo);
    const edadNumero = parseInt(edad);*/
  const args = [foto, cedula, formulario];

  let returnData = "";
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Operaciones\\fotoOperaciones.py", ...args]
  );
  /*const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\fotoOperaciones.py",
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
