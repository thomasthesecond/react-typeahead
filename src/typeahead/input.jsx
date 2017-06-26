import React, { PropTypes } from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

const Input = styled.input.attrs({
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
})`
  background-color: #fff;
  border: 0;
  border-bottom: 1px solid #e4e4e4;
  color: inherit;
  display: block;
  font-family: inherit;
  font-size: 16px;
  line-height: ${(24 / 16)};
  position: relative;
  padding: 16px 4px 15px;
  transition: border-bottom-color 200ms ease-in-out;
  width: 100%;

  &:focus {
    border-bottom-color: #2c3643;
    outline: 0;
    /*outline: 1px dotted lightgray;*/
  }

  &::-webkit-input-placeholder {
    color: rgba(44,54,67, .3);
  }

  &::-moz-placeholder {
    color: rgba(44,54,67, .3);
  }

  &:-ms-input-placeholder {
    color: rgba(44,54,67, .3);
  }

  &:-moz-placeholder {
    color: rgba(44,54,67, .3);
  }
`;

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

Input.defaultProps = {
};

export default Input;
