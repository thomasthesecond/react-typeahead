import React, { Component, PropTypes } from "react";
import cn from "classnames";
import Token from "./token";
import Accessor from "../accessor";
import KeyEvent from "../keyevent";
import Typeahead from "../typeahead";

/**
 * A typeahead that, when an option is selected, instead of simply filling
 * the text entry widget, prepends a renderable "token", that may be deleted
 * by pressing backspace on the beginning of the line with the keyboard.
 */
class TypeaheadTokenizer extends Component {
  static arraysAreDifferent(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
      return true;
    }

    for (let index = secondArray.length - 1; index >= 0; index--) {
      if (secondArray[index] !== firstArray[index]) {
        return true;
      }
    }

    return false;
  }

  constructor(props) {
    super(props);

    this.state = {
      selected: props.defaultSelected.slice(0),
    };

    this.onKeyDown = this.onKeyDown.bind(this);
    this.getSelectedTokens = this.getSelectedTokens.bind(this);
    this.getOptionsForTypeahead = this.getOptionsForTypeahead.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
    this.removeTokenForValue = this.removeTokenForValue.bind(this);
    this.addTokenForValue = this.addTokenForValue.bind(this);
    this.renderTokens = this.renderTokens.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const arraysAreDifferent = TypeaheadTokenizer.arraysAreDifferent(
      this.props.defaultSelected,
      nextProps.defaultSelected,
    );

    if (arraysAreDifferent) {
      this.setState({
        selected: nextProps.defaultSelected.slice(0),
      });
    }
  }

  onKeyDown(event) {
    // We only care about intercepting backspaces
    if (event.keyCode === KeyEvent.DOM_VK_BACKSPACE) {
      return this.handleBackspace(event);
    }

    this.props.onKeyDown(event);

    return null;
  }

  getSelectedTokens() {
    return this.state.selected;
  }

  getOptionsForTypeahead() {
    // return this.props.options without this.selected
    return this.props.options;
  }

  focus() {
    this.typeahead.focus();
  }

  handleBackspace(event) {
    // No tokens
    if (!this.state.selected.length) {
      return;
    }

    // Remove token ONLY when backspace pressed at
    // beginning of line without a selection
    const inputElement = this.typeahead.inputElement;

    if (
      inputElement.selectionStart === inputElement.selectionEnd &&
      inputElement.selectionStart === 0
    ) {
      this.removeTokenForValue(this.state.selected[this.state.selected.length - 1]);
      event.preventDefault();
    }
  }

  removeTokenForValue(value) {
    const index = this.state.selected.indexOf(value);

    if (index === -1) {
      return;
    }

    this.state.selected.splice(index, 1);

    this.setState({
      selected: this.state.selected,
    });

    this.props.onTokenRemove(value);
  }

  addTokenForValue(event, value) {
    if (this.state.selected.indexOf(value) !== -1) {
      return;
    }

    this.state.selected.push(value);

    this.setState({
      selected: this.state.selected,
    });

    this.typeahead.setEntryText("");
    this.props.onTokenAdd(value);
  }

  // TODO: Support initialized tokens
  renderTokens() {
    const tokenClasses = {};

    tokenClasses[this.props.customClasses.token] = !!this.props.customClasses.token;

    const classList = cn(tokenClasses);

    const result = this.state.selected.map((selected) => {
      const displayString = Accessor.valueForOption(
        this.props.displayOption,
        selected,
      );

      const value = Accessor.valueForOption(
        this.props.formInputOption || this.props.displayOption,
        selected,
      );

      return (
        <Token
          className={classList}
          key={displayString}
          onRemove={this.removeTokenForValue}
          object={selected}
          value={value}
          name={this.props.name}
        >
          {displayString}
        </Token>
      );
    });

    return result;
  }

  render() {
    const classes = {};
    classes[this.props.customClasses.typeahead] = !!this.props.customClasses.typeahead;
    const classList = cn(classes);
    const tokenizerClasses = [this.props.defaultClassNames && "typeahead-tokenizer"];
    tokenizerClasses[this.props.className] = !!this.props.className;
    const tokenizerClassList = cn(tokenizerClasses);

    return (
      <div className={tokenizerClassList}>
        {this.renderTokens()}

        <Typeahead
          ref={node => (this.typeahead = node)}
          className={classList}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          inputProps={this.props.inputProps}
          allowCustomValues={this.props.allowCustomValues}
          customClasses={this.props.customClasses}
          options={this.getOptionsForTypeahead()}
          initialValue={this.props.initialValue}
          maxVisible={this.props.maxVisible}
          resultsTruncatedMessage={this.props.resultsTruncatedMessage}
          onOptionSelected={this.addTokenForValue}
          onKeyDown={this.onKeyDown}
          onKeyPress={this.props.onKeyPress}
          onKeyUp={this.props.onKeyUp}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          displayOption={this.props.displayOption}
          defaultClassNames={this.props.defaultClassNames}
          filterOption={this.props.filterOption}
          searchOptions={this.props.searchOptions}
        />
      </div>
    );
  }
}

TypeaheadTokenizer.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  customClasses: PropTypes.object,
  allowCustomValues: PropTypes.number,
  defaultSelected: PropTypes.array,
  initialValue: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  inputProps: PropTypes.object,
  onTokenRemove: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  onTokenAdd: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  filterOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  searchOptions: PropTypes.func,
  displayOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  formInputOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  maxVisible: PropTypes.number,
  resultsTruncatedMessage: PropTypes.string,
  defaultClassNames: PropTypes.bool,
};

TypeaheadTokenizer.defaultProps = {
  className: "",
  name: null,
  options: [],
  defaultSelected: [],
  customClasses: {},
  allowCustomValues: 0,
  initialValue: "",
  placeholder: "",
  disabled: false,
  inputProps: {},
  defaultClassNames: true,
  filterOption: null,
  searchOptions: null,
  displayOption: (token) => token,
  formInputOption: null,
  onKeyDown: () => {},
  onKeyPress: () => {},
  onKeyUp: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onTokenAdd: () => {},
  onTokenRemove: () => {},
  maxVisible: 0,
  resultsTruncatedMessage: "",
};

export default TypeaheadTokenizer;
