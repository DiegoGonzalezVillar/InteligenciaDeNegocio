"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generarArchivoDeSubCuentas = void 0;
var _require = require("child_process"),
  spawn = _require.spawn;
var generarArchivoDeSubCuentas = exports.generarArchivoDeSubCuentas = function generarArchivoDeSubCuentas(req, res) {
  var returnData = "";
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\atencion al cliente\\archivo py\\generarArchivoDeSubCuentas.py"]);

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\generarArchivoDeSubCuentas.py",
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