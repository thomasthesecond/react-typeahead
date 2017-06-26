"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  border-color: black;\n  position: relative;\n  resize: none;\n"], ["\n  border-color: black;\n  position: relative;\n  resize: none;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } // eslint-disable-line no-unused-vars


var Textarea = _styledComponents2.default.textarea.attrs({
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
})(_templateObject);

Textarea.propTypes = {
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

Textarea.defaultProps = {};

exports.default = Textarea;