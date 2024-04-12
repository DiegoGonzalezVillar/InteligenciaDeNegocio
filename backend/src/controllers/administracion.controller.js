const XLSX = require("xlsx");
const { spawn } = require("child_process");

export const getTxtCrecimiento = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Administracion\\txtCrecimiento.py"],
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
        message: `Error al ejecutar el script.`,
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

export const getTxtAcumulacion = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Administracion\\txtAcumulacion.py"],
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
        message: `Error al ejecutar el script.`,
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

export const getTxtRetiro = (req, res) => {
  console.log("back");
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Administracion\\txtRetiro.py"],
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
        message: `Error al ejecutar el script.`,
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

export const letrasRm = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Administracion\\letrasRm.py"],
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
        message: `Error al ejecutar el script.`,
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

export const informeDirectorio = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    [
      "C:\\Compartida Python\\Administracion\\Informacion Presentacion Directorio\\presentacionDirectorio.py",
    ],
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
        message: `Error al ejecutar el script.`,
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

export const valoresRentaBruta = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Administracion\\valoresRentaBruta.py"],
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
        message: `Error al ejecutar el script.`,
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
