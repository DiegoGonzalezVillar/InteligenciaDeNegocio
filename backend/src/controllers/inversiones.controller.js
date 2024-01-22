const { spawn } = require("child_process");

export const getLimites30006 = (req, res) => {
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
