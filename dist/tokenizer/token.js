"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _classNames = require("../classNames");

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Encapsulates the rendering of an option that has been "selected" in a
 * TypeaheadTokenizer
 */
var Token = function Token(_ref) {
  var className = _ref.className,
      children = _ref.children,
      name = _ref.name,
      value = _ref.value,
      object = _ref.object,
      onRemove = _ref.onRemove;
  return _react2.default.createElement(
    "div",
    {
      className: (0, _classnames2.default)([_classNames2.default.token, className])
    },
    name && _react2.default.createElement("input", {
      type: "hidden",
      name: name + "[]",
      value: value || object
    }),
    children,
    onRemove && _react2.default.createElement(
      "button",
      {
        className: "" + _classNames2.default.tokenDelete,
        onClick: function onClick(event) {
          onRemove(object);
          event.preventDefault();
        }
      },
      _react2.default.createElement(
        "svg",
        {
          viewBox: "0 0 32 32",
          title: "Remove " + children + " selection",
          style: {
            display: "inline-block",
            fill: "currentColor",
            height: "1em",
            lineHeight: 1,
            verticalAlign: "middle",
            width: "1em"
          }
        },
        _react2.default.createElement("path", { d: "M18 16l10-10-2-2-10 10-10-10-2 2 10 10-10 10 2 2 10-10 10 10 2-2-10-10z" })
      )
    )
  );
};

Token.propTypes = {
  className: _propTypes2.default.string,
  name: _propTypes2.default.string,
  children: _propTypes2.default.string,
  object: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  onRemove: _propTypes2.default.func,
  value: _propTypes2.default.string
};

Token.defaultProps = {
  className: null,
  name: null,
  children: null,
  object: null,
  onRemove: null,
  value: ""
};

exports.default = Token;