"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createClassList;

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _classNames = require("./classNames");

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createClassList(className, key, disabled) {
  var classNameKey = _classNames2.default[key];

  var classList = _defineProperty({}, classNameKey, !disabled);

  classList[className] = !!className;

  return (0, _classnames2.default)(classList);
}