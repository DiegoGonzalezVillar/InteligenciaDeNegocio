"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todasLasAfisPorAsesor = exports.simuladorProyeccionJubilatoria = exports.ratificacionesPorAsesorPorAnio = exports.login = exports.getUltimaConsultaMontevideoSur = exports.getUltimaConsultaMontevideoPeriferia = exports.getUltimaConsultaInteriorSZ = exports.getUltimaConsultaInteriorDR = exports.getUltimaConsultaInteriorAC = exports.getTotalAfiliadosAnterior = exports.getTotalAfiliados = exports.getPendientesConsultasComercial = exports.getInfoDisponible = exports.getDatosCurvaS = exports.getDatosAppPorCantidad = exports.getDatosApp = exports.getCantidadPorMailPorAnio = exports.getCantidadPorMail = exports.getCantidadDeAfiliados = exports.getCantPorEdadYPorSexo = exports.getCantAfiliadosPorAsesorActualAnterior = exports.getAfisPorDepartamento = exports.getAfisPorAsesor = exports.curvaSPorFecha = exports.curvaS16713 = exports.cargarDatosParaConsultar = exports.asignacionesDeOficio = exports.afisUltimoDiaPorAfap = exports.afisPorAsesorPorAnio = exports.afisPorAfap = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _connection = require("../database/connection");
var _querys = require("../database/querys");
var XLSX = require("xlsx");
var _require = require("child_process"),
  spawn = _require.spawn;

//export const principal = (req, res) => res.send("");

var getUltimaConsultaMontevideoPeriferia = exports.getUltimaConsultaMontevideoPeriferia = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context.sent;
          _context.next = 5;
          return pool.request().query(_querys.queries.getUltimaConsultaMontevideoPeriferia);
        case 5:
          result = _context.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getUltimaConsultaMontevideoPeriferia(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getCantidadDeAfiliados = exports.getCantidadDeAfiliados = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var conn, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return getOracleConnection();
        case 3:
          conn = _context2.sent;
          _context2.next = 6;
          return conn.execute(_querys.queries.getCantidadDeAfiliados);
        case 6:
          result = _context2.sent;
          res.json(result.rows);
          _context2.next = 13;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
        case 13:
          _context2.prev = 13;
          if (!conn) {
            _context2.next = 17;
            break;
          }
          _context2.next = 17;
          return conn.close();
        case 17:
          return _context2.finish(13);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10, 13, 18]]);
  }));
  return function getCantidadDeAfiliados(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getDatosCurvaS = exports.getDatosCurvaS = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var workbook, worksheet, data;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          /*const workbook = XLSX.readFile(
            "F:\\Usuario\\Escritorio\\ratificados y finalizados al 30-04-2025.xlsx"
          );*/
          workbook = XLSX.readFile("C:\\Compartida Python\\df2025.xlsx");
          worksheet = workbook.Sheets[workbook.SheetNames[0]];
          data = XLSX.utils.sheet_to_json(worksheet);
          res.send(data);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getDatosCurvaS(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var curvaSPorFecha = exports.curvaSPorFecha = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var fecha, args, returnData, pythonProcess;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          fecha = req.body.fecha;
          args = [fecha];
          returnData = "";
          pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Comercial\\curvaSPorFecha.py"].concat(args));
          /* const pythonProcess = spawn(
            "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
            [
              "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\curvaSPorFecha.py",
              ...args,
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
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function curvaSPorFecha(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var curvaS16713 = exports.curvaS16713 = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var fecha, args, returnData, pythonProcess;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          fecha = req.body.fecha;
          args = [fecha];
          returnData = "";
          pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Comercial\\curvaS16713.py"].concat(args));
          /*
          const pythonProcess = spawn(
            "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
            [
              "F:\\Usuario\\Escritorio\\Archivos Python\\archivos py\\curvaS16713.py",
              ...args,
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
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function curvaS16713(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var simuladorProyeccionJubilatoria = exports.simuladorProyeccionJubilatoria = function simuladorProyeccionJubilatoria(req, res) {
  var _req$body = req.body,
    sueldo = _req$body.sueldo,
    actividad = _req$body.actividad,
    art8 = _req$body.art8,
    edad = _req$body.edad,
    añosActividad = _req$body.añosActividad,
    genero = _req$body.genero,
    cantidadHijos = _req$body.cantidadHijos,
    actividadBonificada = _req$body.actividadBonificada,
    bonificada = _req$body.bonificada,
    saldoAcumulacion = _req$body.saldoAcumulacion,
    saldoRetiro = _req$body.saldoRetiro;
  var sueldoNumero = parseInt(sueldo);
  var edadNumero = parseInt(edad);
  var args = [sueldoNumero, actividad, art8, edadNumero, parseInt(añosActividad), genero, parseInt(cantidadHijos), actividadBonificada, bonificada, saldoAcumulacion, saldoRetiro];
  var returnData = "";
  /*const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe",
    ["C:\\Compartida Python\\Simulador\\simulador_nueva.py", ...args]
  );
  /*const pythonProcess = spawn("python", [
    "F:\\Usuario\\Escritorio\\Diego\\simulador\\simulador_nueva.py",
    ...args,
  ]);*/
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe", ["F:\\Usuario\\Escritorio\\Diego\\simulador\\simulador_nueva.py"].concat(args));
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
var getUltimaConsultaMontevideoSur = exports.getUltimaConsultaMontevideoSur = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context6.sent;
          _context6.next = 5;
          return pool.request().query(_querys.queries.getUltimaConsultaMontevideoSur);
        case 5:
          result = _context6.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getUltimaConsultaMontevideoSur(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var getCantidadPorMail = exports.getCantidadPorMail = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context7.sent;
          _context7.next = 5;
          return pool.request().query(_querys.queries.getCantidadPorMail);
        case 5:
          result = _context7.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function getCantidadPorMail(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var getCantidadPorMailPorAnio = exports.getCantidadPorMailPorAnio = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context8.sent;
          _context8.next = 5;
          return pool.request().query(_querys.queries.getCantidadPorMailPorAnio);
        case 5:
          result = _context8.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function getCantidadPorMailPorAnio(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var getAfisPorDepartamento = exports.getAfisPorDepartamento = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context9.sent;
          _context9.next = 5;
          return pool.request().query(_querys.queries.getAfisPorDepartamento);
        case 5:
          result = _context9.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function getAfisPorDepartamento(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
var getCantAfiliadosPorAsesorActualAnterior = exports.getCantAfiliadosPorAsesorActualAnterior = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context10.sent;
          _context10.next = 5;
          return pool.request().query(_querys.queries.getCantAfiliadosPorAsesorActualAnterior);
        case 5:
          result = _context10.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function getCantAfiliadosPorAsesorActualAnterior(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
var getCantPorEdadYPorSexo = exports.getCantPorEdadYPorSexo = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context11.sent;
          _context11.next = 5;
          return pool.request().query(_querys.queries.getCantPorEdadYPorSexo);
        case 5:
          result = _context11.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function getCantPorEdadYPorSexo(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
var getInfoDisponible = exports.getInfoDisponible = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context12.sent;
          _context12.next = 5;
          return pool.request().query(_querys.queries.getInfoDisponible);
        case 5:
          result = _context12.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function getInfoDisponible(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
var getDatosAppPorCantidad = exports.getDatosAppPorCantidad = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          _context13.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context13.sent;
          _context13.next = 5;
          return pool.request().query(_querys.queries.getDatosAppPorCantidad);
        case 5:
          result = _context13.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function getDatosAppPorCantidad(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
var afisPorAsesorPorAnio = exports.afisPorAsesorPorAnio = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context14.sent;
          _context14.next = 5;
          return pool.request().query(_querys.queries.afisPorAsesorPorAnio);
        case 5:
          result = _context14.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function afisPorAsesorPorAnio(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
var ratificacionesPorAsesorPorAnio = exports.ratificacionesPorAsesorPorAnio = /*#__PURE__*/function () {
  var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context15.sent;
          _context15.next = 5;
          return pool.request().query(_querys.queries.ratificacionesPorAsesorPorAnio);
        case 5:
          result = _context15.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function ratificacionesPorAsesorPorAnio(_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}();
var afisPorAfap = exports.afisPorAfap = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context16.sent;
          _context16.next = 5;
          return pool.request().query(_querys.queries.afisPorAfap);
        case 5:
          result = _context16.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function afisPorAfap(_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();
var afisUltimoDiaPorAfap = exports.afisUltimoDiaPorAfap = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context17.sent;
          _context17.next = 5;
          return pool.request().query(_querys.queries.afisUltimoDiaPorAfap);
        case 5:
          result = _context17.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function afisUltimoDiaPorAfap(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();
var getUltimaConsultaInteriorAC = exports.getUltimaConsultaInteriorAC = /*#__PURE__*/function () {
  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context18.sent;
          _context18.next = 5;
          return pool.request().query(_querys.queries.getUltimaConsultaInteriorAC);
        case 5:
          result = _context18.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function getUltimaConsultaInteriorAC(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
var getUltimaConsultaInteriorDR = exports.getUltimaConsultaInteriorDR = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context19.sent;
          _context19.next = 5;
          return pool.request().query(_querys.queries.getUltimaConsultaInteriorDR);
        case 5:
          result = _context19.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return function getUltimaConsultaInteriorDR(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();
var getUltimaConsultaInteriorSZ = exports.getUltimaConsultaInteriorSZ = /*#__PURE__*/function () {
  var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context20.sent;
          _context20.next = 5;
          return pool.request().query(_querys.queries.getUltimaConsultaInteriorSZ);
        case 5:
          result = _context20.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return function getUltimaConsultaInteriorSZ(_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();
var getTotalAfiliados = exports.getTotalAfiliados = /*#__PURE__*/function () {
  var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context21.sent;
          _context21.next = 5;
          return pool.request().query(_querys.queries.getTotalAfiliados);
        case 5:
          result = _context21.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return function getTotalAfiliados(_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}();
var getTotalAfiliadosAnterior = exports.getTotalAfiliadosAnterior = /*#__PURE__*/function () {
  var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context22.sent;
          _context22.next = 5;
          return pool.request().query(_querys.queries.getTotalAfiliadosAnterior);
        case 5:
          result = _context22.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context22.stop();
      }
    }, _callee22);
  }));
  return function getTotalAfiliadosAnterior(_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}();
var getDatosApp = exports.getDatosApp = /*#__PURE__*/function () {
  var _ref23 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context23.sent;
          _context23.next = 5;
          return pool.request().query(_querys.queries.getDatosApp);
        case 5:
          result = _context23.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context23.stop();
      }
    }, _callee23);
  }));
  return function getDatosApp(_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}();
var getPendientesConsultasComercial = exports.getPendientesConsultasComercial = /*#__PURE__*/function () {
  var _ref24 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context24.sent;
          _context24.next = 5;
          return pool.request().query(_querys.queries.getPendientesConsultasComercial);
        case 5:
          result = _context24.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context24.stop();
      }
    }, _callee24);
  }));
  return function getPendientesConsultasComercial(_x47, _x48) {
    return _ref24.apply(this, arguments);
  };
}();
var getAfisPorAsesor = exports.getAfisPorAsesor = /*#__PURE__*/function () {
  var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context25.sent;
          _context25.next = 5;
          return pool.request().query(_querys.queries.getAfisPorAsesor);
        case 5:
          result = _context25.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context25.stop();
      }
    }, _callee25);
  }));
  return function getAfisPorAsesor(_x49, _x50) {
    return _ref25.apply(this, arguments);
  };
}();
var login = exports.login = /*#__PURE__*/function () {
  var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(req, res) {
    var pool, usuario, password, _login;
    return _regenerator["default"].wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context26.sent;
          usuario = req.body.username;
          password = req.body.password;
          _context26.prev = 5;
          _context26.next = 8;
          return pool.request().input("usuario", usuario).input("password", password).query(_querys.queries.verificarUsuario);
        case 8:
          _login = _context26.sent;
          if (_login.recordset.length == 0) res.json({
            message: "Usuario Incorrecto!!"
          });else res.json({
            message: "Login Exitoso!"
          });
          _context26.next = 15;
          break;
        case 12:
          _context26.prev = 12;
          _context26.t0 = _context26["catch"](5);
          console.log(_context26.t0);
        case 15:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[5, 12]]);
  }));
  return function login(_x51, _x52) {
    return _ref26.apply(this, arguments);
  };
}();
var asignacionesDeOficio = exports.asignacionesDeOficio = function asignacionesDeOficio(req, res) {
  var returnData = "";
  var pythonProcess = spawn("C:\\Users\\dgonzalez\\AppData\\Local\\Programs\\Python\\Python311\\python.exe", ["C:\\Compartida Python\\Comercial\\asignacionesDeOficio.py"]);
  /*
  const pythonProcess = spawn(
    "C:\\Users\\dgonzalez\\AppData\\Local\\anaconda3\\envs\\spyder\\python.exe",
    ["W:\\Comercial\\asignacionesDeOficio.py"]
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
var todasLasAfisPorAsesor = exports.todasLasAfisPorAsesor = /*#__PURE__*/function () {
  var _ref27 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          _context27.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context27.sent;
          _context27.next = 5;
          return pool.request().query(_querys.queries.todasLasAfisPorAsesor);
        case 5:
          result = _context27.sent;
          res.json(result.recordset);
        case 7:
        case "end":
          return _context27.stop();
      }
    }, _callee27);
  }));
  return function todasLasAfisPorAsesor(_x53, _x54) {
    return _ref27.apply(this, arguments);
  };
}();
var cargarDatosParaConsultar = exports.cargarDatosParaConsultar = /*#__PURE__*/function () {
  var _ref28 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(req, res) {
    var pool, asesores, asesor, smsNumero, numero, i, _req$body$i, cedula, fechaN;
    return _regenerator["default"].wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          _context28.next = 2;
          return (0, _connection.getConnection)();
        case 2:
          pool = _context28.sent;
          asesores = [3118, 2071, 1400, 3153, 2030, 3007, 3076];
          asesor = "";
          _context28.prev = 5;
          _context28.next = 8;
          return pool.request().query(_querys.queries.getSmsNumero);
        case 8:
          smsNumero = _context28.sent;
          numero = smsNumero.recordset[0].smsnumero;
          numero = numero + 1;
          console.log(numero);
          _context28.next = 14;
          return pool.request().input("numero", numero).query(_querys.queries.insertSmsEntrada);
        case 14:
          i = 0;
        case 15:
          if (!(i < req.body.length)) {
            _context28.next = 24;
            break;
          }
          console.log("pool");
          asesor = asesores[Math.floor(Math.random() * asesores.length)];
          _req$body$i = req.body[i], cedula = _req$body$i.cedula, fechaN = _req$body$i.fechaN;
          _context28.next = 21;
          return pool.request().input("numero", numero).input("cedula", cedula).input("fechaN", fechaN).input("asesor", asesor).query(_querys.queries.insertParaConsultar);
        case 21:
          i++;
          _context28.next = 15;
          break;
        case 24:
          res.json({
            message: "Datos insertados con exito!"
          });
          _context28.next = 30;
          break;
        case 27:
          _context28.prev = 27;
          _context28.t0 = _context28["catch"](5);
          res.status(500).json({
            message: "Error al cargar los datos Wein Ronnnney"
          });
        case 30:
        case "end":
          return _context28.stop();
      }
    }, _callee28, null, [[5, 27]]);
  }));
  return function cargarDatosParaConsultar(_x55, _x56) {
    return _ref28.apply(this, arguments);
  };
}();