"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getObtenerVst = exports.generarArchivoBpc = exports.generarArchivoAnr = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _require = require("child_process"),
  spawn = _require.spawn;
var getObtenerVst = exports.getObtenerVst = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pythonProcess;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Prestaciones\\fallecidos\\generarTxtFallecidos.py"], {
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
        case 2:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getObtenerVst(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var generarArchivoBpc = exports.generarArchivoBpc = function generarArchivoBpc(req, res) {
  var _req$body = req.body,
    cedula = _req$body.cedula,
    porcentaje = _req$body.porcentaje,
    favChecked = _req$body.favChecked;
  var args = [cedula, porcentaje, favChecked];
  var returnData = "";
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Prestaciones\\Creacion archivo bpc crm.py"].concat(args));
  /*
  const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\Creacion archivo bpc crm.py",
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
var generarArchivoAnr = exports.generarArchivoAnr = function generarArchivoAnr(req, res) {
  var fecha = req.body.fecha;
  var args = [fecha];
  var returnData = "";
  var errorData = "";
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Prestaciones\\creacion archivo anr.py"].concat(args));

  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    [
      "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\creacion archivo anr.py",
      ...args,
    ]
  );
  */
  // Captura la salida estándar
  pythonProcess.stdout.on("data", function (data) {
    returnData += data.toString();
  });

  // Captura errores del proceso
  pythonProcess.stderr.on("data", function (data) {
    errorData += data.toString();
  });

  // Cuando el proceso termina
  pythonProcess.on("close", function (code) {
    // Si hubo errores o el código de salida no es 0, algo falló
    if (code !== 0 || errorData) {
      res.status(500).json({
        mensaje: "No se pudo crear el archivo correspondiente, contactar administrador",
        error: errorData
      });
    } else {
      res.json({
        mensaje: "Archivo creado correctamente",
        data: returnData
      });
    }
  });
};