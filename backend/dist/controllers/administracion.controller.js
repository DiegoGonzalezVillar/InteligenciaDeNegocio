"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valoresRentaBruta = exports.letrasRm = exports.informeDirectorio = exports.getTxtRetiro = exports.getTxtCrecimiento = exports.getTxtAcumulacion = exports.creacionTableroDeControl = void 0;
var XLSX = require("xlsx");
var _require = require("child_process"),
  spawn = _require.spawn;
var getTxtCrecimiento = exports.getTxtCrecimiento = function getTxtCrecimiento(req, res) {
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
var getTxtAcumulacion = exports.getTxtAcumulacion = function getTxtAcumulacion(req, res) {
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
var getTxtRetiro = exports.getTxtRetiro = function getTxtRetiro(req, res) {
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
var letrasRm = exports.letrasRm = function letrasRm(req, res) {
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
var informeDirectorio = exports.informeDirectorio = function informeDirectorio(req, res) {
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Administracion\\Informacion Presentacion Directorio\\presentacionDirectorio.py"], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"] // Pipe para stdout y stderr
  });
  pythonProcess.on("close", function (codigo) {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente"
      });
    } else {
      res.status(500).send({
        message: "Error al ejecutar el script. Codigo de salida ".concat(codigo)
      });
    }
  });
};
var creacionTableroDeControl = exports.creacionTableroDeControl = function creacionTableroDeControl(req, res) {
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Administracion\\Insumos Tablero de Control\\Modificacion Tablero de Control Ejecutivo Inclusion de Fondo Nuevo 20-02-2024.py"], {
    detached: true,
    stdio: ["ignore", "pipe", "pipe"] // Pipe para stdout y stderr
  });
  pythonProcess.on("close", function (codigo) {
    if (codigo === 0) {
      res.status(200).send({
        message: "Consulta ejecutada correctamente"
      });
    } else {
      res.status(500).send({
        message: "Error al ejecutar el script. Codigo de salida ".concat(codigo)
      });
    }
  });
};
var valoresRentaBruta = exports.valoresRentaBruta = function valoresRentaBruta(req, res) {
  var _req$body = req.body,
    fechaInicial = _req$body.fechaInicial,
    fechaFinal = _req$body.fechaFinal;
  var args = [fechaInicial, fechaFinal];
  /*const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\valoresRentaBruta.py",
    ...args,
  ]);*/
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Administracion\\valoresRentaBruta.py"].concat(args));
  var fecha = "";
  pythonProcess.stdout.on("data", function (data) {
    fecha = data;
  });
  pythonProcess.on("close", function (code) {
    if (code === 0) {
      res.json({
        message: "Se ejecutó correctamente",
        fecha: fecha.toString()
      });
    } else {
      res.status(500).json({
        message: "El script de Python fall\xF3 con el c\xF3digo de salida ".concat(code, "."),
        fecha: fecha.toString()
      });
    }
  });
  pythonProcess.on("error", function (error) {
    res.status(500).json({
      message: "Error al ejecutar el script de Python"
    });
  });
};