import React, { Component, PropTypes } from "react";
import fuzzy from "fuzzy";
import TypeaheadSelector from "./selector";
import Status from "./status";
import createClassList from "../createClassList";
import Accessor from "../accessor";
import KeyEvent from "../keyevent";

/**
 * A "typeahead", an auto-completing text input
 *
 * Renders an text input that shows options nearby that you can use the
 * keyboard or mouse to select. Requires CSS for MASSIVE DAMAGE.
 */
class Typeahead extends Component {
  static getInstanceCount() {
    let count = 0;

    return ++count;
  }

  constructor(props) {
    super(props);

    this.state = {
      // The options matching the entry value
      // searchResults: this.getOptionsForValue(props.initialValue, props.options),
      searchResults: [],

      // This should be called something else, "entryValue"
      entryValue: props.value || props.initialValue,

      // selectedValue: null,

      // A valid typeahead value
      selection: props.value,

      // Index of the selection
      // selectionIndex: -1,
      selectionIndex: null,

      // Keep track of the focus state of the input element, to determine
      // whether to show options when empty (if showOptionsWhenEmpty is true)
      isFocused: false,

      // true when focused, false onOptionSelected
      showResults: false,

      isDropdownVisible: false,
    };

    this.previousInputValue = null;

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.getOptionsForValue = this.getOptionsForValue.bind(this);
    this.setEntryText = this.setEntryText.bind(this);
    this.hasCustomValue = this.hasCustomValue.bind(this);
    this.getCustomValue = this.getCustomValue.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
    this.renderIncrementalSearchResults = this.renderIncrementalSearchResults.bind(this);
    this.countTruncatedResults = this.countTruncatedResults.bind(this);
    this.areResultsTruncated = this.areResultsTruncated.bind(this);
    this.resultsTruncatedMessage = this.resultsTruncatedMessage.bind(this);
    this.focus = this.focus.bind(this);
    this.getSelection = this.getSelection.bind(this);
    this.shouldSkipSearch = this.shouldSkipSearch.bind(this);
    this.onOptionSelected = this.onOptionSelected.bind(this);
    this.onTextEntryUpdated = this.onTextEntryUpdated.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onEscape = this.onEscape.bind(this);
    this.onBackspace = this.onBackspace.bind(this);
    this.onTab = this.onTab.bind(this);
    this.eventMap = this.eventMap.bind(this);
    this.setSelectedIndex = this.setSelectedIndex.bind(this);
    this.nav = this.nav.bind(this);
    this.navDown = this.navDown.bind(this);
    this.navUp = this.navUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.renderHiddenInput = this.renderHiddenInput.bind(this);
    this.generateSearchFunction = this.generateSearchFunction.bind(this);
    this.hasHint = this.hasHint.bind(this);
    this.handleWindowClose = this.handleWindowClose.bind(this);
    this.renderAriaMessageForOptions = this.renderAriaMessageForOptions.bind(this);
    this.renderAriaMessageForIncomingOptions = this.renderAriaMessageForIncomingOptions.bind(this);
  }

  componentWillMount() {
    const uniqueId = Typeahead.getInstanceCount();

    this.activeDescendantId = `typeaheadActiveDescendant-${uniqueId}`;
    this.optionsId = `typeaheadOptions-${uniqueId}`;
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      // The `focus` event does not bubble, so we must capture it instead.
      // This closes Typeahead's dropdown whenever something else gains focus.
      window.addEventListener("focus", this.handleWindowClose, true);

      // If we click anywhere outside of Typeahead, close the dropdown.
      window.addEventListener("click", this.handleWindowClose, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { options } = nextProps;
    const { entryValue } = this.state;

    this.setState({
      searchResults: this.getOptionsForValue(entryValue, options),
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { entryValue } = this.state;
    // console.log(entryValue, prevState.entryValue);
    // console.log(entryValue !== prevState.entryValue);

    if (entryValue !== prevState.entryValue && !prevState.isDropdownVisible) {
      this.showDropdown();
    }
  }

  componentWillUnmount() {
    if (typeof window !== "undefined") {
      window.removeEventListener("focus", this.handleWindowClose, true);
      window.removeEventListener("click", this.handleWindowClose, false);
    }
  }

  onMouseOver(event, index) {
    this.setState({
      selectionIndex: index,
    });
  }

  onMouseOut() {
    this.setState({
      selectionIndex: null,
    });
  }

  getOptionsForValue(value, options) {
    if (this.shouldSkipSearch(value)) {
      return [];
    }

    const searchOptions = this.generateSearchFunction();
    return searchOptions(value, options);
  }

  setEntryText(value) {
    this.inputElement.value = value;
    this.onTextEntryUpdated();
  }

  getSelection() {
    let index = this.state.selectionIndex;

    if (this.hasCustomValue()) {
      if (index === 0) {
        return this.state.entryValue;
      }

      index--;
    }

    return this.state.searchResults[index];
  }

  getCustomValue() {
    const { entryValue } = this.state;

    if (this.hasCustomValue()) {
      return entryValue;
    }

    return null;
  }

  showDropdown() {
    this.setState({
      isDropdownVisible: true,
    });
  }

  hideDropdown() {
    this.setState({
      isDropdownVisible: false,
    });
  }

  focus() {
    this.inputElement.focus();
  }

  hasCustomValue() {
    const { allowCustomValues } = this.props;
    const { entryValue, searchResults } = this.state;

    if (
      allowCustomValues > 0 &&
      entryValue.length >= allowCustomValues &&
      searchResults.indexOf(entryValue) < 0
    ) {
      return true;
    }

    return false;
  }

  countTruncatedResults() {
    const { maxVisible } = this.props;
    const { searchResults } = this.state;

    return parseInt(searchResults.length, 10) - parseInt(maxVisible, 10);
  }

  areResultsTruncated() {
    const { maxVisible } = this.props;
    const { searchResults } = this.state;

    return !!maxVisible && (searchResults.length > maxVisible);
  }

  resultsTruncatedMessage() {
    const areResultsTruncated = this.areResultsTruncated();
    const countTruncatedResults = this.countTruncatedResults();

    const {
      resultsTruncatedMessage: message,
    } = this.props;

    return areResultsTruncated ? (
      message || `There are ${countTruncatedResults} more results.`
    ) : "";
  }

  renderIncrementalSearchResults() {
    // Nothing has been entered into the textbox
    if (this.shouldSkipSearch(this.state.entryValue)) {
      return "";
    }

    // Something was just selected
    if (this.state.selection) {
      return "";
    }

    return (
      <this.props.customListComponent
        ref={node => (this.dropdown = node)}
        id={this.optionsId}
        isVisible={this.state.isDropdownVisible}
        activeDescendantId={this.activeDescendantId}
        options={this.props.maxVisible ?
          this.state.searchResults.slice(0, this.props.maxVisible) :
          this.state.searchResults
        }
        areResultsTruncated={this.areResultsTruncated()}
        resultsTruncatedMessage={this.resultsTruncatedMessage()}
        onOptionSelected={this.onOptionSelected}
        allowCustomValues={this.props.allowCustomValues}
        customValue={this.getCustomValue()}
        customClasses={this.props.customClasses}
        selectionIndex={this.state.selectionIndex}
        disableDefaultClassNames={this.props.disableDefaultClassNames}
        displayOption={Accessor.generateOptionToStringFor(this.props.displayOption)}
        onMouseOver={this.onMouseOver}
      />
    );
  }

  shouldSkipSearch(input) {
    const { showOptionsWhenEmpty } = this.props;
    const { isFocused } = this.state;
    const emptyValue = !input || input.trim().length === 0;

    return !(showOptionsWhenEmpty && isFocused) && emptyValue;
  }

  onOptionSelected(event, option) {
    // console.log("onOptionSelected", option);
    this.inputElement.focus();

    const displayOption = Accessor.generateOptionToStringFor(
      this.props.inputDisplayOption || this.props.displayOption,
    );

    const optionString = displayOption(option, 0);

    const formInputOption = Accessor.generateOptionToStringFor(
      this.props.formInputOption || displayOption,
    );
    const formInputOptionString = formInputOption(option);

    this.inputElement.value = optionString;

    const results = this.getOptionsForValue(optionString, this.props.options);

    this.setState({
      searchResults: results,
      selection: formInputOptionString,
      selectionIndex: results.indexOf(optionString),
      entryValue: optionString,
      showResults: false,
      // isDropdownVisible: false,
    });

    // this.onBlur();
    // if (this.props.blurOnOptionSelected) {}
    // this.inputElement.blur();

    // console.log("onOptionSelected");
    return this.props.onOptionSelected(event, option);
  }

  onTextEntryUpdated() {
    const { options } = this.props;
    const value = this.inputElement.value;

    this.setState({
      searchResults: this.getOptionsForValue(value, options),
      selection: "",
      entryValue: value,
    });
  }

  onEnter(event) {
    const selection = this.getSelection();

    if (!selection) {
      return this.props.onKeyDown(event);
    }

    return this.onOptionSelected(event, selection);
  }

  onEscape() {
    // console.log("escape");

    this.setState({
      // searchResults: [],
      isDropdownVisible: false,
      selectionIndex: null,
    });
  }

  onBackspace() {
    if (this.state.selectionIndex !== null) {
      this.setState({
        selectionIndex: null,
      });
    }
  }

  onTab(event) {
    // console.log("onTab");
    let option = this.getSelection();
    // const selection = this.getSelection();
    // const searchResult = (this.state.searchResults.length > 0) ?
    //   this.state.searchResults[0] :
    //   null;

    // console.log(selection, searchResult);

    // let option = selection || searchResult;
    //
    // if (option === null && this.hasCustomValue()) {
    //   option = this.getCustomValue();
    //   // console.log("1");
    // }
    //
    // if (option !== null) {
    //   // console.log("2");
    //   return this.onOptionSelected(event, option);
    // }

    if (!option && this.hasCustomValue()) {
      option = this.getCustomValue();
    }

    if (option) {
      // console.log("finish autocomplete");
      return this.onOptionSelected(event, option);
    }

    return null;
  }

  eventMap() {
    const events = {};

    events[KeyEvent.DOM_VK_UP] = this.navUp;
    events[KeyEvent.DOM_VK_DOWN] = this.navDown;
    events[KeyEvent.DOM_VK_RETURN] = this.onEnter;
    events[KeyEvent.DOM_VK_ENTER] = this.onEnter;
    events[KeyEvent.DOM_VK_ESCAPE] = this.onEscape;
    events[KeyEvent.DOM_VK_BACKSPACE] = this.onBackspace;
    events[KeyEvent.DOM_VK_TAB] = this.onTab;

    return events;
  }

  setSelectedIndex(index, callback) {
    this.setState({
      selectionIndex: index,
    }, callback);
  }

  nav(delta) {
    // console.log(delta, this.state.selectionIndex);

    if (!this.hasHint()) {
      return;
    }

    const setIndex = delta === 1 ? 0 : delta;
    // const previousInputValue = this.previousInputValue;

    let newIndex = this.state.selectionIndex === null ?
      setIndex :
      this.state.selectionIndex + delta;

    let length = this.props.maxVisible ?
      this.state.searchResults.slice(0, this.props.maxVisible).length :
      this.state.searchResults.length;

    // const setIndex = delta === 1 ? 0 : (length - 1);

    // let newIndex = this.state.selectionIndex === null ?
    //   setIndex :
    //   this.state.selectionIndex + delta;

    if (this.hasCustomValue()) {
      length += 1;
    }

    // let newValue = this.state.searchResults[newIndex];

    // if (previousInputValue === null) {
    //   this.previousInputValue = this.state.entryValue;
    // }

    if (newIndex < 0) {
      newIndex += length;

      // // newIndex += (length + 1);
      // newIndex = length;
      // newValue = previousInputValue;
    } else if (newIndex >= length) {
      newIndex -= length;

      // // newIndex -= (length + 1);
      // newIndex = -1;
      // newValue = previousInputValue;
    }

    // this.setSelectedIndex(newIndex);
    this.setState({
      selectionIndex: newIndex,
      // entryValue: newValue,
      entryValue: this.state.searchResults[newIndex],
    });

    // const inputValue = this.state.entryValue;
    // const options = this.state.searchResults;
    // const selectedOption = options[this.state.selectionIndex];
  }

  navDown() {
    if (this.state.isDropdownVisible) {
      this.nav(1);
    } else {
      this.showDropdown();
    }
  }

  navUp() {
    if (this.state.isDropdownVisible) {
      this.nav(-1);
    } else {
      this.showDropdown();
    }
  }

  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event);
    }

    this.onTextEntryUpdated();
  }

  onKeyDown(event) {
    /**
     * If there are no visible elements, don't perform selector
     * navigation. Just pass this up to the upstream onKeydown handler.
     * Also skip if the user is pressing the shift key, since none of
     * our handlers are looking for shift
     */
    if (!this.hasHint() || event.shiftKey) {
      return this.props.onKeyDown(event);
    }

    const handler = this.eventMap()[event.keyCode];

    if (handler) {
      handler(event);
    } else {
      return this.props.onKeyDown(event);
    }

    // Don't propagate the keystroke back to the DOM/browser
    if (
      event.keyCode !== KeyEvent.DOM_VK_BACKSPACE &&
      event.keyCode !== KeyEvent.DOM_VK_TAB
    ) {
      event.preventDefault();
    }

    // if (this.state.isDropdownVisible) {
    //   event.preventDefault();
    // }

    return null;
  }

  onFocus(event) {
    this.setState({
      isFocused: true,
      showResults: true,
      isDropdownVisible: true,
    }, () => {
      this.onTextEntryUpdated();
    });

    if (this.props.onFocus) {
      return this.props.onFocus(event);
    }

    return null;
  }

  onBlur(event) {
    // console.log("onBlur");
    this.setState({
      isFocused: false,
      // selectionIndex: null,
      // showResults: false,
      // isDropdownVisible: false,
    }, () => {
      this.onTextEntryUpdated();
    });

    if (this.props.onBlur) {
      return this.props.onBlur(event);
    }

    return null;
  }

  renderHiddenInput() {
    const { name } = this.props;
    const { selection } = this.state;

    if (!name) {
      return null;
    }

    return (
      <input
        type="hidden"
        name={name}
        value={selection}
      />
    );
  }

  generateSearchFunction() {
    const { searchOptions, filterOption } = this.props;

    if (typeof searchOptions === "function") {
      if (filterOption !== null) {
        console.warn("searchOptions prop is being used, filterOption prop will be ignored");
      }

      return searchOptions;
    } else if (typeof filterOption === "function") {
      return (value, options) => options.filter((o) => filterOption(value, o));
    }

    let mapper;

    if (typeof filterOption === "string") {
      mapper = Accessor.generateAccessor(filterOption);
    } else {
      mapper = Accessor.identityFunction;
    }

    return (value, options) => fuzzy
      .filter(value, options, { extract: mapper })
      .map((res) => options[res.index]);
  }

  hasHint() {
    return this.state.searchResults.length > 0 || this.hasCustomValue();
  }

  handleWindowClose(event) {
    const target = event.target;

    if (target !== window && !this.typeahead.contains(target)) {
      this.hideDropdown();
    }
  }

  renderAriaMessageForOptions() {
    const inputValue = this.state.entryValue;
    // const search = this.generateSearchFunction();
    // const options = search(inputValue, this.props.options);
    const options = this.state.searchResults;
    const selectedOption = options[this.state.selectionIndex];
    // const selectedOption = options.length && this.state.selectionIndex ?
    //   options[this.state.selectionIndex] :
    //   null;

    // console.log();

    return (
      <Status>
        {selectedOption || inputValue}
      </Status>
    );
  }

  renderAriaMessageForIncomingOptions() {
    const { maxVisible } = this.props;
    const { searchResults } = this.state;
    // const inputValue = this.state.entryValue;
    // const search = this.generateSearchFunction();
    // const options = search(inputValue, this.props.options) || [];
    const options = searchResults || [];
    const totalOptions = options.length ? options.length : 0;
    const numberOfSuggestions = maxVisible && (maxVisible < options.length) ?
      maxVisible : totalOptions;
    const suggestionText = `${numberOfSuggestions} suggestion${numberOfSuggestions !== 1 ? "s are" : " is"} available.`;
    const instructionText = numberOfSuggestions > 0 ? "Use up and down arrows to select." : "";

    return (
      <Status>
        {`${suggestionText} ${instructionText}`}
      </Status>
    );
  }

  render() {
    const {
      className,
      customClasses,
      disableDefaultClassNames,
      textarea,
      disabled,
      placeholder,
      onKeyPress,
      onKeyUp,
      autoFocus,
      required,
      inputId,
      inputName,
    } = this.props;

    const InputElement = textarea ? "textarea" : "input";

    const containerClassList = createClassList(
      className,
      "typeahead",
      disableDefaultClassNames,
    );

    const inputClassList = createClassList(
      customClasses.input,
      "input",
      disableDefaultClassNames,
    );

    return (
      <div
        className={containerClassList}
        ref={node => (this.typeahead = node)}
        onMouseOut={this.onMouseOut}
        style={this.props.style}
      >
        {this.renderHiddenInput()}

        <InputElement
          ref={node => (this.inputElement = node)}
          className={inputClassList}
          type="text"
          role="combobox"
          aria-owns={this.optionsId}
          aria-controls={this.optionsId}
          aria-expanded={this.state.isDropdownVisible}
          aria-autocomplete="both"
          aria-activedescendant={this.activeDescendantId}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          autoFocus={autoFocus}
          required={required}
          spellCheck={false}
          id={inputId}
          name={inputName}
          disabled={disabled}
          placeholder={placeholder}
          value={this.state.entryValue}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />

        {this.state.showResults && this.renderIncrementalSearchResults()}

        {this.renderAriaMessageForOptions()}
        {this.renderAriaMessageForIncomingOptions()}
      </div>
    );
  }
}

Typeahead.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  customClasses: PropTypes.shape({
    hover: PropTypes.string,
    input: PropTypes.string,
    listAnchor: PropTypes.string,
    listItem: PropTypes.string,
    results: PropTypes.string,
    resultsTruncated: PropTypes.string,
    customAdd: PropTypes.string,
  }),
  maxVisible: PropTypes.number,
  resultsTruncatedMessage: PropTypes.string,
  options: PropTypes.array,
  allowCustomValues: PropTypes.number,
  initialValue: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  textarea: PropTypes.bool,
  // inputProps: PropTypes.object,
  inputId: PropTypes.string,
  inputName: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  onOptionSelected: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyPress: PropTypes.func,
  onKeyUp: PropTypes.func,
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
  inputDisplayOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  formInputOption: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  disableDefaultClassNames: PropTypes.bool,
  customListComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
  ]),
  showOptionsWhenEmpty: PropTypes.bool,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]),
  ),
};

Typeahead.defaultProps = {
  options: [],
  className: null,
  customClasses: {},
  allowCustomValues: 0,
  initialValue: "",
  value: "",
  placeholder: "",
  disabled: false,
  textarea: false,
  // inputProps: {},
  inputId: "typeaheadInput",
  inputName: "typeaheadInput",
  autoFocus: false,
  required: false,
  onOptionSelected: () => {},
  onChange: () => {},
  onKeyDown: () => {},
  onKeyPress: () => {},
  onKeyUp: () => {},
  onFocus: () => {},
  onBlur: () => {},
  filterOption: null,
  searchOptions: null,
  inputDisplayOption: null,
  disableDefaultClassNames: false,
  customListComponent: TypeaheadSelector,
  showOptionsWhenEmpty: false,
  maxVisible: 0,
  displayOption: null,
  formInputOption: null,
  name: null,
  resultsTruncatedMessage: null,
  style: null,
};

export default Typeahead;
