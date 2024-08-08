"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLimites30008 = exports.getLimites30006 = void 0;
var _require = require("child_process"),
  spawn = _require.spawn;
var getLimites30006 = exports.getLimites30006 = function getLimites30006(req, res) {
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\consulta30006.py"], {
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
        message: "Error al ejecutar el script de Python. C\xF3digo de salida: ".concat(codigo),
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
var getLimites30008 = exports.getLimites30008 = function getLimites30008(req, res) {
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\consulta30008.py"], {
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
        message: "Error al ejecutar el script de Python. C\xF3digo de salida: ".concat(codigo),
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