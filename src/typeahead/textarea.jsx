import React, { PropTypes } from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

const Textarea = styled.textarea.attrs({
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
})`
  border-color: black;
  position: relative;
  resize: none;
`;

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

Textarea.defaultProps = {
};

export default Textarea;
