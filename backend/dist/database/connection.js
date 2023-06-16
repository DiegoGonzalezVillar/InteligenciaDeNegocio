"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConnection = getConnection;
exports.getOracleConnection = getOracleConnection;
Object.defineProperty(exports, "sql", {
  enumerable: true,
  get: function get() {
    return _mssql["default"];
  }
});
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mssql = _interopRequireDefault(require("mssql"));
var _require = require('../config'),
  db = _require.db,
  oracleDb = _require.oracleDb;
var oracle = require('oracledb');
var dbSettings = {
  user: db.user,
  password: db.password,
  server: db.server,
  database: db.database,
  database2: db.database2,
  database3: db.database3,
  options: {
    trustServerCertificate: true,
    encrypt: false
  }
};
function getConnection() {
  return _getConnection.apply(this, arguments);
}
function _getConnection() {
  _getConnection = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var pool;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _mssql["default"].connect(dbSettings);
          case 3:
            pool = _context.sent;
            return _context.abrupt("return", pool);
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getConnection.apply(this, arguments);
}
var oracleDbSettings = {
  user: oracleDb.user,
  password: oracleDb.password,
  connectString: "".concat(oracleDb.server, ":").concat(oracleDb.port, "/").concat(oracleDb.service)
};
function getOracleConnection() {
  return _getOracleConnection.apply(this, arguments);
}
function _getOracleConnection() {
  _getOracleConnection = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var pool;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return oracle.getConnection(oracleDbSettings);
          case 3:
            pool = _context2.sent;
            console.log(pool);
            return _context2.abrupt("return", pool);
          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);
          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _getOracleConnection.apply(this, arguments);
}