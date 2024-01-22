"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getObtenerVst = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _connection = require("../database/connection");
var getObtenerVst = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var excelFile, workbook, sheetName, sheetData, cedulasArray, cedulasString, query, pool, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          excelFile = req.files.excelFile;
          workbook = XLSX.read(excelFile.data);
          sheetName = workbook.SheetNames[0];
          sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          cedulasArray = sheetData.map(function (item) {
            return item.cedulas;
          });
          cedulasString = cedulasArray.join("','");
          query = "\n      SELECT CI, Subestado\n      FROM [192.168.20.2].[IAFAPCRM].[sysdba].[CRM_Comercial]\n      WHERE CI IN ('".concat(cedulasString, "') AND Subestado IN ('VST', 'CST')\n    ");
          _context.next = 9;
          return (0, _connection.getConnection)();
        case 9:
          pool = _context.sent;
          _context.next = 12;
          return pool.request().query(query);
        case 12:
          result = _context.sent;
          res.json({
            message: "Archivo Excel procesado exitosamente",
            data: result.recordset
          });
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getObtenerVst(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getObtenerVst = getObtenerVst;