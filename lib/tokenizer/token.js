"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  align-items: center;\n  background-color: #fff;\n  border: 1px solid #e4e4e4;\n  border-radius: 32px;\n  display: inline-flex;\n  color: #2c3643;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  height: 32px;\n  justify-content: center;\n  line-height: 1;\n  padding-left: 24px;\n  padding-right: 24px;\n  position: relative;\n\n  &:not(:first-of-type) {\n    margin-left: 8px;\n  }\n"], ["\n  align-items: center;\n  background-color: #fff;\n  border: 1px solid #e4e4e4;\n  border-radius: 32px;\n  display: inline-flex;\n  color: #2c3643;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n  height: 32px;\n  justify-content: center;\n  line-height: 1;\n  padding-left: 24px;\n  padding-right: 24px;\n  position: relative;\n\n  &:not(:first-of-type) {\n    margin-left: 8px;\n  }\n"]),
    _templateObject2 = _taggedTemplateLiteral(["\n  background-color: transparent;\n  border: 0;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 8px;\n  line-height: 1;\n  /*margin-left: 8px;*/\n  margin-right: -8px;\n  padding: 8px;\n  transition: color 200ms ease-in-out;\n\n  &:hover,\n  &:active,\n  &:focus {\n    color: rgba(44,54,67, .7);\n  }\n\n  &:focus {\n    outline: 0;\n  }\n"], ["\n  background-color: transparent;\n  border: 0;\n  cursor: pointer;\n  display: inline-block;\n  font-size: 8px;\n  line-height: 1;\n  /*margin-left: 8px;*/\n  margin-right: -8px;\n  padding: 8px;\n  transition: color 200ms ease-in-out;\n\n  &:hover,\n  &:active,\n  &:focus {\n    color: rgba(44,54,67, .7);\n  }\n\n  &:focus {\n    outline: 0;\n  }\n"]),
    _templateObject3 = _taggedTemplateLiteral(["\n  display: inline-block;\n  fill: currentColor;\n  height: 1em;\n  line-height: 1;\n  vertical-align: middle;\n  width: 1em;\n\n  button:focus > & {\n    outline: 1px dotted lightgray;\n    outline-offset: 2px;\n  }\n"], ["\n  display: inline-block;\n  fill: currentColor;\n  height: 1em;\n  line-height: 1;\n  vertical-align: middle;\n  width: 1em;\n\n  button:focus > & {\n    outline: 1px dotted lightgray;\n    outline-offset: 2px;\n  }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _classNames = require("../classNames");

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } // eslint-disable-line no-unused-vars

// import cn from "classnames";


var Container = _styledComponents2.default.div(_templateObject);

var Button = _styledComponents2.default.button(_templateObject2);

var Icon = _styledComponents2.default.svg(_templateObject3);

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
    Container
    // className={cn([defaultClassNames.token, className])}
    ,
    { className: className
    },
    name && _react2.default.createElement("input", {
      type: "hidden",
      name: name + "[]",
      value: value || object
    }),
    children,
    onRemove && _react2.default.createElement(
      Button,
      {
        className: _classNames2.default.token,
        onClick: function onClick(event) {
          onRemove(object);
          event.preventDefault();
        }
      },
      _react2.default.createElement(
        Icon,
        {
          viewBox: "0 0 32 32",
          title: "Remove " + children + " selection"
        },
        _react2.default.createElement("path", { d: "M18 16l10-10-2-2-10 10-10-10-2 2 10 10-10 10 2 2 10-10 10 10 2-2-10-10z" })
      )
    )
  );
};

Token.propTypes = {
  className: _react.PropTypes.string,
  name: _react.PropTypes.string,
  children: _react.PropTypes.string,
  object: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]),
  onRemove: _react.PropTypes.func,
  value: _react.PropTypes.string
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