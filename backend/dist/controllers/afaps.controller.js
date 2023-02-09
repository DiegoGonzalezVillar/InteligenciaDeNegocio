"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.principal = exports.login = exports.getUltimaConsultaMontevideoSur = exports.getUltimaConsultaMontevideoPeriferia = exports.getUltimaConsultaInteriorSZ = exports.getUltimaConsultaInteriorDR = exports.getUltimaConsultaInteriorAC = exports.getTotalAfiliados = exports.cargarDatosParaConsultar = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connection = require("../database/connection");

var _querys = require("../database/querys");

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

var getUltimaConsultaMontevideoSur = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _connection.getConnection)();

          case 2:
            pool = _context2.sent;
            _context2.next = 5;
            return pool.request().query(_querys.queries.getUltimaConsultaMontevideoSur);

          case 5:
            result = _context2.sent;
            res.json(result.recordset);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUltimaConsultaMontevideoSur(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUltimaConsultaMontevideoSur = getUltimaConsultaMontevideoSur;

var getUltimaConsultaInteriorAC = /*#__PURE__*/function () {
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
            return pool.request().query(_querys.queries.getUltimaConsultaInteriorAC);

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

  return function getUltimaConsultaInteriorAC(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUltimaConsultaInteriorAC = getUltimaConsultaInteriorAC;

var getUltimaConsultaInteriorDR = /*#__PURE__*/function () {
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
            return pool.request().query(_querys.queries.getUltimaConsultaInteriorDR);

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

  return function getUltimaConsultaInteriorDR(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getUltimaConsultaInteriorDR = getUltimaConsultaInteriorDR;

var getUltimaConsultaInteriorSZ = /*#__PURE__*/function () {
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
            return pool.request().query(_querys.queries.getUltimaConsultaInteriorSZ);

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

  return function getUltimaConsultaInteriorSZ(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getUltimaConsultaInteriorSZ = getUltimaConsultaInteriorSZ;

var getTotalAfiliados = /*#__PURE__*/function () {
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
            return pool.request().query(_querys.queries.getTotalAfiliados);

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

  return function getTotalAfiliados(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getTotalAfiliados = getTotalAfiliados;

var login = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var pool, usuario, password, _login;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return (0, _connection.getConnection)();

          case 2:
            pool = _context7.sent;
            usuario = req.body.username;
            password = req.body.password;
            _context7.prev = 5;
            _context7.next = 8;
            return pool.request().input('usuario', usuario).input('password', password).query(_querys.queries.verificarUsuario);

          case 8:
            _login = _context7.sent;
            if (_login.recordset.length == 0) res.json({
              message: "Usuario Incorrecto!!"
            });else res.json({
              message: "Login Exitoso!"
            });
            _context7.next = 15;
            break;

          case 12:
            _context7.prev = 12;
            _context7.t0 = _context7["catch"](5);
            console.log(_context7.t0);

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[5, 12]]);
  }));

  return function login(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.login = login;

var cargarDatosParaConsultar = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var pool, asesores, i, asesor, _req$body$i, cedula, fechaN, smsNumero, numero;

    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return (0, _connection.getConnection)();

          case 2:
            pool = _context8.sent;
            asesores = [3118, 2071, 1400, 3153, 2030];
            i = 0;

          case 5:
            if (!(i < req.body.length)) {
              _context8.next = 27;
              break;
            }

            asesor = asesores[Math.floor(Math.random() * asesores.length)];
            _req$body$i = req.body[i], cedula = _req$body$i.cedula, fechaN = _req$body$i.fechaN;
            fechaN = "'" + fechaN + "'";
            _context8.prev = 9;
            _context8.next = 12;
            return pool.request().query(_querys.queries.getSmsNumero);

          case 12:
            smsNumero = _context8.sent;
            numero = smsNumero.recordset[0].smsnumero;
            numero = numero + 1;
            _context8.next = 17;
            return pool.request().input('numero', numero).query(_querys.queries.insertSmsEntrada);

          case 17:
            _context8.next = 19;
            return pool.request().input('numero', numero).input('cedula', cedula).input('fechaN', fechaN).input('asesor', asesor).query(_querys.queries.insertParaConsultar);

          case 19:
            _context8.next = 24;
            break;

          case 21:
            _context8.prev = 21;
            _context8.t0 = _context8["catch"](9);
            console.log(_context8.t0);

          case 24:
            i++;
            _context8.next = 5;
            break;

          case 27:
            res.json({
              message: "Datos insertados correctamente"
            });

          case 28:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[9, 21]]);
  }));

  return function cargarDatosParaConsultar(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.cargarDatosParaConsultar = cargarDatosParaConsultar;