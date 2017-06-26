"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  background-color: #fff;\n  border: 0;\n  border-bottom: 1px solid #e4e4e4;\n  color: inherit;\n  display: block;\n  font-family: inherit;\n  font-size: 16px;\n  line-height: ", ";\n  position: relative;\n  padding: 16px 4px 15px;\n  transition: border-bottom-color 200ms ease-in-out;\n  width: 100%;\n\n  &:focus {\n    border-bottom-color: #2c3643;\n    outline: 0;\n    /*outline: 1px dotted lightgray;*/\n  }\n\n  &::-webkit-input-placeholder {\n    color: rgba(44,54,67, .3);\n  }\n\n  &::-moz-placeholder {\n    color: rgba(44,54,67, .3);\n  }\n\n  &:-ms-input-placeholder {\n    color: rgba(44,54,67, .3);\n  }\n\n  &:-moz-placeholder {\n    color: rgba(44,54,67, .3);\n  }\n"], ["\n  background-color: #fff;\n  border: 0;\n  border-bottom: 1px solid #e4e4e4;\n  color: inherit;\n  display: block;\n  font-family: inherit;\n  font-size: 16px;\n  line-height: ", ";\n  position: relative;\n  padding: 16px 4px 15px;\n  transition: border-bottom-color 200ms ease-in-out;\n  width: 100%;\n\n  &:focus {\n    border-bottom-color: #2c3643;\n    outline: 0;\n    /*outline: 1px dotted lightgray;*/\n  }\n\n  &::-webkit-input-placeholder {\n    color: rgba(44,54,67, .3);\n  }\n\n  &::-moz-placeholder {\n    color: rgba(44,54,67, .3);\n  }\n\n  &:-ms-input-placeholder {\n    color: rgba(44,54,67, .3);\n  }\n\n  &:-moz-placeholder {\n    color: rgba(44,54,67, .3);\n  }\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } // eslint-disable-line no-unused-vars


var Input = _styledComponents2.default.input.attrs({
  // type: "text",
  // role: "combobox",
  // autocapitalize: "none",
  // autocomplete: "off",
  // autocorrect: "off",
  // spellcheck: "false",
  // autofocus: props => props.autofocus,
  // required: props => props.required,
  // id: props => props.inputId,
  // name: props => props.inputName,
  // disabled: props => props.disabled,
  // placeholder: props => props.placeholder,
  // "aria-autocomplete": "both",
  // "aria-owns": props => props.optionsId,
  // "aria-controls": props => props.optionsId,
  // "aria-expanded": props => props.isDropdownVisible,
  // "aria-activedescendant": props => props.activeDescendantId,
})(_templateObject, 24 / 16);

Input.propTypes = {
  // children: PropTypes.node,
  // className: PropTypes.arrayOf(PropTypes.string),
  // onMouseOut: PropTypes.func,

  // className={inputClassList}
  // value={this.state.entryValue}
  // onChange={this.onChange}
  // onKeyDown={this.onKeyDown}
  // onKeyPress={onKeyPress}
  // onKeyUp={onKeyUp}
  // onFocus={this.onFocus}
  // onBlur={this.onBlur}
};

Input.defaultProps = {};

exports.default = Input;