"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encontrarFoto = void 0;
var _require = require("child_process"),
  spawn = _require.spawn;
var encontrarFoto = function encontrarFoto(req, res) {
  var _req$body = req.body,
    foto = _req$body.foto,
    cedula = _req$body.cedula,
    formulario = _req$body.formulario;
  /*const sueldoNumero = parseInt(sueldo);
    const edadNumero = parseInt(edad);*/
  var args = [foto, cedula, formulario];
  var returnData = "";
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Operaciones\\fotoOperaciones.py"].concat(args));
  /*const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\fotoOperaciones.py",
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
exports.encontrarFoto = encontrarFoto;