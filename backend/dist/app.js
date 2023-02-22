"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _afaps = _interopRequireDefault(require("./routes/afaps.routes"));
var cors = require('cors');
var app = (0, _express["default"])();
var bodyParser = require('body-parser');
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(cors());
app.use(_afaps["default"]);
app.use(_express["default"].json());
var _default = app;
exports["default"] = _default;