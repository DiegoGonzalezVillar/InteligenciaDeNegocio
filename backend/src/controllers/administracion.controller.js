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

export const txtBpcAcumulacion = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Administracion\\txtBpcAcumulacion.py"],
    {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"], // Pipe para stdout y stderr
    }
  );
  let outputData = "";

  pythonProcess.stdout.on("data", (data) => {
    outputData += data.toString();
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

export const txtBpcRetiro = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Administracion\\txtBpcRetiro.py"],
    {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"], // Pipe para stdout y stderr
    }
  );
  let outputData = "";

  pythonProcess.stdout.on("data", (data) => {
    outputData += data.toString();
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

export const creacionTableroDeControl = (req, res) => {
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    [
      "C:\\Compartida Python\\Administracion\\Insumos Tablero de Control\\Modificacion Tablero de Control Ejecutivo Inclusion de Fondo Nuevo 20-02-2024.py",
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

export const valoresRentaBruta = (req, res) => {
  const { fechaInicial, fechaFinal } = req.body;
  const args = [fechaInicial, fechaFinal];
  /*const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\valoresRentaBruta.py",
    ...args,
  ]);*/
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Administracion\\valoresRentaBruta.py", ...args]
  );

  let fecha = "";

  pythonProcess.stdout.on("data", (data) => {
    fecha = data;
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      res.json({
        message: "Se ejecutó correctamente",
        fecha: fecha.toString(),
      });
    } else {
      res.status(500).json({
        message: `El script de Python falló con el código de salida ${code}.`,
        fecha: fecha.toString(),
      });
    }
  });
  pythonProcess.on("error", (error) => {
    res.status(500).json({ message: "Error al ejecutar el script de Python" });
  });
};
