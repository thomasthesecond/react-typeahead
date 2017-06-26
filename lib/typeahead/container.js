"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  background-color: white;\n  color: #2c3643;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  line-height: 1;\n  position: relative;\n"], ["\n  background-color: white;\n  color: #2c3643;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n  font-size: 16px;\n  line-height: 1;\n  position: relative;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } // eslint-disable-line no-unused-vars


var Container = _styledComponents2.default.div(_templateObject);

Container.propTypes = {
  children: _react.PropTypes.node,
  className: _react.PropTypes.string,
  onMouseOut: _react.PropTypes.func
};

Container.defaultProps = {
  children: null,
  className: null,
  onMouseOut: null
};

exports.default = Container;