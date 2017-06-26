"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Status = function Status(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    "span",
    {
      role: "status",
      "aria-live": "polite",
      style: {
        left: "-9999px",
        position: "absolute"
      }
    },
    children
  );
};

Status.propTypes = {
  children: _react.PropTypes.string
};

Status.defaultProps = {
  children: null
};

exports.default = Status;