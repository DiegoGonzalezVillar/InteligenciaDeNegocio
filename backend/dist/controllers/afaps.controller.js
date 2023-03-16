"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.principal = exports.login = exports.getUltimaConsultaMontevideoSur = exports.getUltimaConsultaMontevideoPeriferia = exports.getUltimaConsultaInteriorSZ = exports.getUltimaConsultaInteriorDR = exports.getUltimaConsultaInteriorAC = exports.getTotalAfiliadosAnterior = exports.getTotalAfiliados = exports.getInfoDisponible = exports.getDatosCurvaS = exports.getDatosAppPorCantidad = exports.getDatosApp = exports.getAfisPorAsesor = exports.cargarDatosParaConsultar = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _connection = require("../database/connection");
var _querys = require("../database/querys");
var XLSX = require('xlsx');
var principal = function principal(req, res) {
  return res.send('');
};
exports.principal = principal;
var getUltimaConsultaMontevideoPeriferia = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
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
      }
    }, _callee);
  }));
  return function getUltimaConsultaMontevideoPeriferia(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getUltimaConsultaMontevideoPeriferia = getUltimaConsultaMontevideoPeriferia;
var getDatosCurvaS = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var workbook, worksheet, data;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            //const workbook = XLSX.readFile('F:\\Usuario\\Escritorio\\NodeSQL\\backend\\src\\controllers\\df2023.xlsx');
            workbook = XLSX.readFile('C:\\Compartida Python\\df2023.xlsx');
            worksheet = workbook.Sheets[workbook.SheetNames[0]];
            data = XLSX.utils.sheet_to_json(worksheet);
            res.send(data);
          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return function getDatosCurvaS(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getDatosCurvaS = getDatosCurvaS;
var getUltimaConsultaMontevideoSur = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context3.sent;
            _context3.next = 5;
            return pool.request().query(_querys.queries.getUltimaConsultaMontevideoSur);
          case 5:
            result = _context3.sent;
            res.json(result.recordset);
          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return function getUltimaConsultaMontevideoSur(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getUltimaConsultaMontevideoSur = getUltimaConsultaMontevideoSur;
var getInfoDisponible = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context4.sent;
            _context4.next = 5;
            return pool.request().query(_querys.queries.getInfoDisponible);
          case 5:
            result = _context4.sent;
            res.json(result.recordset);
          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return function getInfoDisponible(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getInfoDisponible = getInfoDisponible;
var getDatosAppPorCantidad = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context5.sent;
            _context5.next = 5;
            return pool.request().query(_querys.queries.getDatosAppPorCantidad);
          case 5:
            result = _context5.sent;
            res.json(result.recordset);
          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return function getDatosAppPorCantidad(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getDatosAppPorCantidad = getDatosAppPorCantidad;
var getUltimaConsultaInteriorAC = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context6.sent;
            _context6.next = 5;
            return pool.request().query(_querys.queries.getUltimaConsultaInteriorAC);
          case 5:
            result = _context6.sent;
            res.json(result.recordset);
          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return function getUltimaConsultaInteriorAC(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getUltimaConsultaInteriorAC = getUltimaConsultaInteriorAC;
var getUltimaConsultaInteriorDR = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context7.sent;
            _context7.next = 5;
            return pool.request().query(_querys.queries.getUltimaConsultaInteriorDR);
          case 5:
            result = _context7.sent;
            res.json(result.recordset);
          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return function getUltimaConsultaInteriorDR(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getUltimaConsultaInteriorDR = getUltimaConsultaInteriorDR;
var getUltimaConsultaInteriorSZ = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context8.sent;
            _context8.next = 5;
            return pool.request().query(_querys.queries.getUltimaConsultaInteriorSZ);
          case 5:
            result = _context8.sent;
            res.json(result.recordset);
          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return function getUltimaConsultaInteriorSZ(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.getUltimaConsultaInteriorSZ = getUltimaConsultaInteriorSZ;
var getTotalAfiliados = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context9.sent;
            _context9.next = 5;
            return pool.request().query(_querys.queries.getTotalAfiliados);
          case 5:
            result = _context9.sent;
            res.json(result.recordset);
          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));
  return function getTotalAfiliados(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.getTotalAfiliados = getTotalAfiliados;
var getTotalAfiliadosAnterior = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context10.sent;
            _context10.next = 5;
            return pool.request().query(_querys.queries.getTotalAfiliadosAnterior);
          case 5:
            result = _context10.sent;
            res.json(result.recordset);
          case 7:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return function getTotalAfiliadosAnterior(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();
exports.getTotalAfiliadosAnterior = getTotalAfiliadosAnterior;
var getDatosApp = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context11.sent;
            _context11.next = 5;
            return pool.request().query(_querys.queries.getDatosApp);
          case 5:
            result = _context11.sent;
            res.json(result.recordset);
          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return function getDatosApp(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();
exports.getDatosApp = getDatosApp;
var getAfisPorAsesor = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context12.sent;
            _context12.next = 5;
            return pool.request().query(_querys.queries.getAfisPorAsesor);
          case 5:
            result = _context12.sent;
            res.json(result.recordset);
          case 7:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return function getAfisPorAsesor(_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();
exports.getAfisPorAsesor = getAfisPorAsesor;
var login = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
    var pool, usuario, password, _login;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context13.sent;
            usuario = req.body.username;
            password = req.body.password;
            _context13.prev = 5;
            _context13.next = 8;
            return pool.request().input('usuario', usuario).input('password', password).query(_querys.queries.verificarUsuario);
          case 8:
            _login = _context13.sent;
            if (_login.recordset.length == 0) res.json({
              message: "Usuario Incorrecto!!"
            });else res.json({
              message: "Login Exitoso!"
            });
            _context13.next = 15;
            break;
          case 12:
            _context13.prev = 12;
            _context13.t0 = _context13["catch"](5);
            console.log(_context13.t0);
          case 15:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, null, [[5, 12]]);
  }));
  return function login(_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}();
exports.login = login;
var cargarDatosParaConsultar = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
    var pool, asesores, asesor, smsNumero, numero, i, _req$body$i, cedula, fechaN;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return (0, _connection.getConnection)();
          case 2:
            pool = _context14.sent;
            asesores = [3118, 2071, 1400, 3153, 2030];
            asesor = '';
            _context14.prev = 5;
            _context14.next = 8;
            return pool.request().query(_querys.queries.getSmsNumero);
          case 8:
            smsNumero = _context14.sent;
            numero = smsNumero.recordset[0].smsnumero;
            numero = numero + 1;
            _context14.next = 13;
            return pool.request().input('numero', numero).query(_querys.queries.insertSmsEntrada);
          case 13:
            i = 0;
          case 14:
            if (!(i < req.body.length)) {
              _context14.next = 22;
              break;
            }
            asesor = asesores[Math.floor(Math.random() * asesores.length)];
            _req$body$i = req.body[i], cedula = _req$body$i.cedula, fechaN = _req$body$i.fechaN;
            _context14.next = 19;
            return pool.request().input('numero', numero).input('cedula', cedula).input('fechaN', fechaN).input('asesor', asesor).query(_querys.queries.insertParaConsultar);
          case 19:
            i++;
            _context14.next = 14;
            break;
          case 22:
            res.json({
              message: "Datos insertados con exito!"
            });
            _context14.next = 28;
            break;
          case 25:
            _context14.prev = 25;
            _context14.t0 = _context14["catch"](5);
            res.status(500).json({
              message: "Error al cargar los datos"
            });
          case 28:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, null, [[5, 25]]);
  }));
  return function cargarDatosParaConsultar(_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();
exports.cargarDatosParaConsultar = cargarDatosParaConsultar;