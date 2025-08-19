"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.realizarPagosBpc = exports.encontrarFoto = exports.detallePagosBpc = exports.detallePagosAnr = void 0;
var _require = require("child_process"),
  spawn = _require.spawn;
var encontrarFoto = exports.encontrarFoto = function encontrarFoto(req, res) {
  var _req$body = req.body,
    foto = _req$body.foto,
    cedula = _req$body.cedula,
    formulario = _req$body.formulario;
  var args = [foto, cedula, formulario];
  var returnData = "";
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Operaciones\\fotoOperaciones.py"].concat(args)); /*
                                                                                                                                                                                       const pythonProcess = spawn("python", [
                                                                                                                                                                                       "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\fotoOperaciones.py",
                                                                                                                                                                                       ...args,
                                                                                                                                                                                       ]);*/
  pythonProcess.stdout.on("data", function (data) {
    returnData += data;
  });
  pythonProcess.stderr.on("data", function (data) {
    console.error("stderr: ".concat(data));
  });
  pythonProcess.on("close", function (code) {
    console.log("child process exited with code ".concat(code));
    res.json(returnData);
  });
};
var detallePagosBpc = exports.detallePagosBpc = function detallePagosBpc(req, res) {
  var returnData = "";
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Operaciones\\detallePagosBpc.py"]);

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\detallePagosBpc.py",
    ]
  );
  */
  pythonProcess.stdout.on("data", function (data) {
    returnData += data;
  });
  pythonProcess.stderr.on("data", function (data) {
    console.error("stderr: ".concat(data));
  });
  pythonProcess.on("close", function (code) {
    res.json(returnData);
  });
};
var detallePagosAnr = exports.detallePagosAnr = function detallePagosAnr(req, res) {
  var returnData = "";
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Operaciones\\detallePagosAnr.py"]);

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\detallePagosAnr.py",
    ]
  );*/

  pythonProcess.stdout.on("data", function (data) {
    returnData += data;
  });
  pythonProcess.stderr.on("data", function (data) {
    console.error("stderr: ".concat(data));
  });
  pythonProcess.on("close", function (code) {
    res.json(returnData);
  });
};
var realizarPagosBpc = exports.realizarPagosBpc = function realizarPagosBpc(req, res) {
  var returnData = "";
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Operaciones\\Pagos BPC\\realizarPagosBpc.py"]);

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\detallePagosBpc.py",
    ]
  );*/

  pythonProcess.stdout.on("data", function (data) {
    returnData += data;
  });
  pythonProcess.stderr.on("data", function (data) {
    console.error("stderr: ".concat(data));
  });
  pythonProcess.on("close", function (code) {
    res.json(returnData);
  });
};