"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valoresRentaBruta = exports.letrasRm = exports.informeDirectorio = exports.getTxtRetiro = exports.getTxtCrecimiento = exports.getTxtAcumulacion = void 0;
var XLSX = require("xlsx");
var _require = require("child_process"),
  spawn = _require.spawn;
var getTxtCrecimiento = function getTxtCrecimiento(req, res) {
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Administracion\\txtCrecimiento.py"], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"] // Pipe para stdout y stderr
  });

  var outputData = "";
  pythonProcess.stdout.on("data", function (data) {
    outputData += data.toString();
    console.log(outputData);
  });
  pythonProcess.on("close", function (codigo) {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente"
      });
    } else {
      res.status(500).send({
        message: "Error al ejecutar el script.",
        output: outputData.trim(),
        // Se puede obtener incluso en caso de error
        exitCode: codigo
      });
    }
  });
  pythonProcess.on("error", function (error) {
    console.error("Error al ejecutar el script de Python: ".concat(error));
    res.status(500).send({
      message: "Error al ejecutar el script de Python",
      output: outputData.trim(),
      // También se puede obtener en caso de error
      exitCode: -1 // Un valor de código de salida personalizado para errores
    });
  });
};
exports.getTxtCrecimiento = getTxtCrecimiento;
var getTxtAcumulacion = function getTxtAcumulacion(req, res) {
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Administracion\\txtAcumulacion.py"], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"] // Pipe para stdout y stderr
  });

  var outputData = "";
  pythonProcess.stdout.on("data", function (data) {
    outputData += data.toString();
    console.log(outputData);
  });
  pythonProcess.on("close", function (codigo) {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente"
      });
    } else {
      res.status(500).send({
        message: "Error al ejecutar el script.",
        output: outputData.trim(),
        // Se puede obtener incluso en caso de error
        exitCode: codigo
      });
    }
  });
  pythonProcess.on("error", function (error) {
    console.error("Error al ejecutar el script de Python: ".concat(error));
    res.status(500).send({
      message: "Error al ejecutar el script de Python",
      output: outputData.trim(),
      // También se puede obtener en caso de error
      exitCode: -1 // Un valor de código de salida personalizado para errores
    });
  });
};
exports.getTxtAcumulacion = getTxtAcumulacion;
var getTxtRetiro = function getTxtRetiro(req, res) {
  console.log("back");
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Administracion\\txtRetiro.py"], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"] // Pipe para stdout y stderr
  });

  var outputData = "";
  pythonProcess.stdout.on("data", function (data) {
    outputData += data.toString();
    console.log(outputData);
  });
  pythonProcess.on("close", function (codigo) {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente"
      });
    } else {
      res.status(500).send({
        message: "Error al ejecutar el script.",
        output: outputData.trim(),
        // Se puede obtener incluso en caso de error
        exitCode: codigo
      });
    }
  });
  pythonProcess.on("error", function (error) {
    console.error("Error al ejecutar el script de Python: ".concat(error));
    res.status(500).send({
      message: "Error al ejecutar el script de Python",
      output: outputData.trim(),
      // También se puede obtener en caso de error
      exitCode: -1 // Un valor de código de salida personalizado para errores
    });
  });
};
exports.getTxtRetiro = getTxtRetiro;
var letrasRm = function letrasRm(req, res) {
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Administracion\\letrasRm.py"], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"] // Pipe para stdout y stderr
  });

  var outputData = "";
  pythonProcess.stdout.on("data", function (data) {
    outputData += data.toString();
    console.log(outputData);
  });
  pythonProcess.on("close", function (codigo) {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente"
      });
    } else {
      res.status(500).send({
        message: "Error al ejecutar el script.",
        output: outputData.trim(),
        // Se puede obtener incluso en caso de error
        exitCode: codigo
      });
    }
  });
  pythonProcess.on("error", function (error) {
    console.error("Error al ejecutar el script de Python: ".concat(error));
    res.status(500).send({
      message: "Error al ejecutar el script de Python",
      output: outputData.trim(),
      // También se puede obtener en caso de error
      exitCode: -1 // Un valor de código de salida personalizado para errores
    });
  });
};
exports.letrasRm = letrasRm;
var informeDirectorio = function informeDirectorio(req, res) {
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Administracion\\Informacion Presentacion Directorio\\presentacionDirectorio.py"], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"] // Pipe para stdout y stderr
  });

  var outputData = "";
  pythonProcess.stdout.on("data", function (data) {
    outputData += data.toString();
    console.log(outputData);
  });
  pythonProcess.on("close", function (codigo) {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente"
      });
    } else {
      res.status(500).send({
        message: "Error al ejecutar el script.",
        output: outputData.trim(),
        // Se puede obtener incluso en caso de error
        exitCode: codigo
      });
    }
  });
  pythonProcess.on("error", function (error) {
    console.error("Error al ejecutar el script de Python: ".concat(error));
    res.status(500).send({
      message: "Error al ejecutar el script de Python",
      output: outputData.trim(),
      // También se puede obtener en caso de error
      exitCode: -1 // Un valor de código de salida personalizado para errores
    });
  });
};
exports.informeDirectorio = informeDirectorio;
var valoresRentaBruta = function valoresRentaBruta(req, res) {
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Administracion\\valoresRentaBruta.py"], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"] // Pipe para stdout y stderr
  });

  var outputData = "";
  pythonProcess.stdout.on("data", function (data) {
    outputData += data.toString();
    console.log(outputData);
  });
  pythonProcess.on("close", function (codigo) {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente"
      });
    } else {
      res.status(500).send({
        message: "Error al ejecutar el script.",
        output: outputData.trim(),
        // Se puede obtener incluso en caso de error
        exitCode: codigo
      });
    }
  });
  pythonProcess.on("error", function (error) {
    console.error("Error al ejecutar el script de Python: ".concat(error));
    res.status(500).send({
      message: "Error al ejecutar el script de Python",
      output: outputData.trim(),
      // También se puede obtener en caso de error
      exitCode: -1 // Un valor de código de salida personalizado para errores
    });
  });
};
exports.valoresRentaBruta = valoresRentaBruta;