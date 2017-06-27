"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fuzzy = require("fuzzy");

var _fuzzy2 = _interopRequireDefault(_fuzzy);

var _selector = require("./selector");

var _selector2 = _interopRequireDefault(_selector);

var _status = require("./status");

var _status2 = _interopRequireDefault(_status);

var _createClassList = require("../createClassList");

var _createClassList2 = _interopRequireDefault(_createClassList);

var _accessor = require("../accessor");

var _accessor2 = _interopRequireDefault(_accessor);

var _keyevent = require("../keyevent");

var _keyevent2 = _interopRequireDefault(_keyevent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A "typeahead", an auto-completing text input
 *
 * Renders an text input that shows options nearby that you can use the
 * keyboard or mouse to select. Requires CSS for MASSIVE DAMAGE.
 */
var Typeahead = function (_Component) {
  _inherits(Typeahead, _Component);

  _createClass(Typeahead, null, [{
    key: "getInstanceCount",
    value: function getInstanceCount() {
      var count = 0;

      return ++count;
    }
  }]);

  function Typeahead(props) {
    _classCallCheck(this, Typeahead);

    var _this = _possibleConstructorReturn(this, (Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call(this, props));

    _this.state = {
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

      isDropdownVisible: false
    };

    _this.previousInputValue = null;

    _this.onMouseOver = _this.onMouseOver.bind(_this);
    _this.onMouseOut = _this.onMouseOut.bind(_this);
    _this.getOptionsForValue = _this.getOptionsForValue.bind(_this);
    _this.setEntryText = _this.setEntryText.bind(_this);
    _this.hasCustomValue = _this.hasCustomValue.bind(_this);
    _this.getCustomValue = _this.getCustomValue.bind(_this);
    _this.showDropdown = _this.showDropdown.bind(_this);
    _this.hideDropdown = _this.hideDropdown.bind(_this);
    _this.renderIncrementalSearchResults = _this.renderIncrementalSearchResults.bind(_this);
    _this.countTruncatedResults = _this.countTruncatedResults.bind(_this);
    _this.areResultsTruncated = _this.areResultsTruncated.bind(_this);
    _this.resultsTruncatedMessage = _this.resultsTruncatedMessage.bind(_this);
    _this.focus = _this.focus.bind(_this);
    _this.getSelection = _this.getSelection.bind(_this);
    _this.shouldSkipSearch = _this.shouldSkipSearch.bind(_this);
    _this.onOptionSelected = _this.onOptionSelected.bind(_this);
    _this.onTextEntryUpdated = _this.onTextEntryUpdated.bind(_this);
    _this.onEnter = _this.onEnter.bind(_this);
    _this.onEscape = _this.onEscape.bind(_this);
    _this.onBackspace = _this.onBackspace.bind(_this);
    _this.onTab = _this.onTab.bind(_this);
    _this.eventMap = _this.eventMap.bind(_this);
    _this.setSelectedIndex = _this.setSelectedIndex.bind(_this);
    _this.nav = _this.nav.bind(_this);
    _this.navDown = _this.navDown.bind(_this);
    _this.navUp = _this.navUp.bind(_this);
    _this.onChange = _this.onChange.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.renderHiddenInput = _this.renderHiddenInput.bind(_this);
    _this.generateSearchFunction = _this.generateSearchFunction.bind(_this);
    _this.hasHint = _this.hasHint.bind(_this);
    _this.handleWindowClose = _this.handleWindowClose.bind(_this);
    _this.renderAriaMessageForOptions = _this.renderAriaMessageForOptions.bind(_this);
    _this.renderAriaMessageForIncomingOptions = _this.renderAriaMessageForIncomingOptions.bind(_this);
    return _this;
  }

  _createClass(Typeahead, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var uniqueId = Typeahead.getInstanceCount();

      this.activeDescendantId = "typeaheadActiveDescendant-" + uniqueId;
      this.optionsId = "typeaheadOptions-" + uniqueId;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window !== "undefined") {
        // The `focus` event does not bubble, so we must capture it instead.
        // This closes Typeahead's dropdown whenever something else gains focus.
        window.addEventListener("focus", this.handleWindowClose, true);

        // If we click anywhere outside of Typeahead, close the dropdown.
        window.addEventListener("click", this.handleWindowClose, false);
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var options = nextProps.options;
      var entryValue = this.state.entryValue;


      this.setState({
        searchResults: this.getOptionsForValue(entryValue, options)
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var entryValue = this.state.entryValue;
      // console.log(entryValue, prevState.entryValue);
      // console.log(entryValue !== prevState.entryValue);

      if (entryValue !== prevState.entryValue && !prevState.isDropdownVisible) {
        this.showDropdown();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (typeof window !== "undefined") {
        window.removeEventListener("focus", this.handleWindowClose, true);
        window.removeEventListener("click", this.handleWindowClose, false);
      }
    }
  }, {
    key: "onMouseOver",
    value: function onMouseOver(event, index) {
      this.setState({
        selectionIndex: index
      });
    }
  }, {
    key: "onMouseOut",
    value: function onMouseOut() {
      this.setState({
        selectionIndex: null
      });
    }
  }, {
    key: "getOptionsForValue",
    value: function getOptionsForValue(value, options) {
      if (this.shouldSkipSearch(value)) {
        return [];
      }

      var searchOptions = this.generateSearchFunction();
      return searchOptions(value, options);
    }
  }, {
    key: "setEntryText",
    value: function setEntryText(value) {
      this.inputElement.value = value;
      this.onTextEntryUpdated();
    }
  }, {
    key: "getSelection",
    value: function getSelection() {
      var index = this.state.selectionIndex;

      if (this.hasCustomValue()) {
        if (index === 0) {
          return this.state.entryValue;
        }

        index--;
      }

      return this.state.searchResults[index];
    }
  }, {
    key: "getCustomValue",
    value: function getCustomValue() {
      var entryValue = this.state.entryValue;


      if (this.hasCustomValue()) {
        return entryValue;
      }

      return null;
    }
  }, {
    key: "showDropdown",
    value: function showDropdown() {
      this.setState({
        isDropdownVisible: true
      });
    }
  }, {
    key: "hideDropdown",
    value: function hideDropdown() {
      this.setState({
        isDropdownVisible: false
      });
    }
  }, {
    key: "focus",
    value: function focus() {
      this.inputElement.focus();
    }
  }, {
    key: "hasCustomValue",
    value: function hasCustomValue() {
      var allowCustomValues = this.props.allowCustomValues;
      var _state = this.state,
          entryValue = _state.entryValue,
          searchResults = _state.searchResults;


      if (allowCustomValues > 0 && entryValue.length >= allowCustomValues && searchResults.indexOf(entryValue) < 0) {
        return true;
      }

      return false;
    }
  }, {
    key: "countTruncatedResults",
    value: function countTruncatedResults() {
      var maxVisible = this.props.maxVisible;
      var searchResults = this.state.searchResults;


      return parseInt(searchResults.length, 10) - parseInt(maxVisible, 10);
    }
  }, {
    key: "areResultsTruncated",
    value: function areResultsTruncated() {
      var maxVisible = this.props.maxVisible;
      var searchResults = this.state.searchResults;


      return !!maxVisible && searchResults.length > maxVisible;
    }
  }, {
    key: "resultsTruncatedMessage",
    value: function resultsTruncatedMessage() {
      var areResultsTruncated = this.areResultsTruncated();
      var countTruncatedResults = this.countTruncatedResults();

      var message = this.props.resultsTruncatedMessage;


      return areResultsTruncated ? message || "There are " + countTruncatedResults + " more results." : "";
    }
  }, {
    key: "renderIncrementalSearchResults",
    value: function renderIncrementalSearchResults() {
      var _this2 = this;

      // Nothing has been entered into the textbox
      if (this.shouldSkipSearch(this.state.entryValue)) {
        return "";
      }

      // Something was just selected
      if (this.state.selection) {
        return "";
      }

      return _react2.default.createElement(this.props.customListComponent, {
        ref: function ref(node) {
          return _this2.dropdown = node;
        },
        id: this.optionsId,
        isVisible: this.state.isDropdownVisible,
        activeDescendantId: this.activeDescendantId,
        options: this.props.maxVisible ? this.state.searchResults.slice(0, this.props.maxVisible) : this.state.searchResults,
        areResultsTruncated: this.areResultsTruncated(),
        resultsTruncatedMessage: this.resultsTruncatedMessage(),
        onOptionSelected: this.onOptionSelected,
        allowCustomValues: this.props.allowCustomValues,
        customValue: this.getCustomValue(),
        customClasses: this.props.customClasses,
        selectionIndex: this.state.selectionIndex,
        disableDefaultClassNames: this.props.disableDefaultClassNames,
        displayOption: _accessor2.default.generateOptionToStringFor(this.props.displayOption),
        onMouseOver: this.onMouseOver
      });
    }
  }, {
    key: "shouldSkipSearch",
    value: function shouldSkipSearch(input) {
      var showOptionsWhenEmpty = this.props.showOptionsWhenEmpty;
      var isFocused = this.state.isFocused;

      var emptyValue = !input || input.trim().length === 0;

      return !(showOptionsWhenEmpty && isFocused) && emptyValue;
    }
  }, {
    key: "onOptionSelected",
    value: function onOptionSelected(event, option) {
      // console.log("onOptionSelected", option);
      this.inputElement.focus();

      var displayOption = _accessor2.default.generateOptionToStringFor(this.props.inputDisplayOption || this.props.displayOption);

      var optionString = displayOption(option, 0);

      var formInputOption = _accessor2.default.generateOptionToStringFor(this.props.formInputOption || displayOption);
      var formInputOptionString = formInputOption(option);

      this.inputElement.value = optionString;

      var results = this.getOptionsForValue(optionString, this.props.options);

      this.setState({
        searchResults: results,
        selection: formInputOptionString,
        selectionIndex: results.indexOf(optionString),
        entryValue: optionString,
        showResults: false
        // isDropdownVisible: false,
      });

      // this.onBlur();
      // if (this.props.blurOnOptionSelected) {}
      this.inputElement.blur();

      // console.log("onOptionSelected");
      return this.props.onOptionSelected(event, option);
    }
  }, {
    key: "onTextEntryUpdated",
    value: function onTextEntryUpdated() {
      var options = this.props.options;

      var value = this.inputElement.value;

      this.setState({
        searchResults: this.getOptionsForValue(value, options),
        selection: "",
        entryValue: value
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter(event) {
      var selection = this.getSelection();

      if (!selection) {
        return this.props.onKeyDown(event);
      }

      return this.onOptionSelected(event, selection);
    }
  }, {
    key: "onEscape",
    value: function onEscape() {
      // console.log("escape");

      this.setState({
        // searchResults: [],
        isDropdownVisible: false,
        selectionIndex: null
      });
    }
  }, {
    key: "onBackspace",
    value: function onBackspace() {
      if (this.state.selectionIndex !== null) {
        this.setState({
          selectionIndex: null
        });
      }
    }
  }, {
    key: "onTab",
    value: function onTab(event) {
      // console.log("onTab");
      var option = this.getSelection();
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
  }, {
    key: "eventMap",
    value: function eventMap() {
      var events = {};

      events[_keyevent2.default.DOM_VK_UP] = this.navUp;
      events[_keyevent2.default.DOM_VK_DOWN] = this.navDown;
      events[_keyevent2.default.DOM_VK_RETURN] = this.onEnter;
      events[_keyevent2.default.DOM_VK_ENTER] = this.onEnter;
      events[_keyevent2.default.DOM_VK_ESCAPE] = this.onEscape;
      events[_keyevent2.default.DOM_VK_BACKSPACE] = this.onBackspace;
      events[_keyevent2.default.DOM_VK_TAB] = this.onTab;

      return events;
    }
  }, {
    key: "setSelectedIndex",
    value: function setSelectedIndex(index, callback) {
      this.setState({
        selectionIndex: index
      }, callback);
    }
  }, {
    key: "nav",
    value: function nav(delta) {
      // console.log(delta, this.state.selectionIndex);

      if (!this.hasHint()) {
        return;
      }

      var setIndex = delta === 1 ? 0 : delta;
      // const previousInputValue = this.previousInputValue;

      var newIndex = this.state.selectionIndex === null ? setIndex : this.state.selectionIndex + delta;

      var length = this.props.maxVisible ? this.state.searchResults.slice(0, this.props.maxVisible).length : this.state.searchResults.length;

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
        entryValue: this.state.searchResults[newIndex]
      });

      // const inputValue = this.state.entryValue;
      // const options = this.state.searchResults;
      // const selectedOption = options[this.state.selectionIndex];
    }
  }, {
    key: "navDown",
    value: function navDown() {
      if (this.state.isDropdownVisible) {
        this.nav(1);
      } else {
        this.showDropdown();
      }
    }
  }, {
    key: "navUp",
    value: function navUp() {
      if (this.state.isDropdownVisible) {
        this.nav(-1);
      } else {
        this.showDropdown();
      }
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      if (this.props.onChange) {
        this.props.onChange(event);
      }

      this.onTextEntryUpdated();
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      /**
       * If there are no visible elements, don't perform selector
       * navigation. Just pass this up to the upstream onKeydown handler.
       * Also skip if the user is pressing the shift key, since none of
       * our handlers are looking for shift
       */
      if (!this.hasHint() || event.shiftKey) {
        return this.props.onKeyDown(event);
      }

      var handler = this.eventMap()[event.keyCode];

      if (handler) {
        handler(event);
      } else {
        return this.props.onKeyDown(event);
      }

      // Don't propagate the keystroke back to the DOM/browser
      if (event.keyCode !== _keyevent2.default.DOM_VK_BACKSPACE && event.keyCode !== _keyevent2.default.DOM_VK_TAB) {
        event.preventDefault();
      }

      // if (this.state.isDropdownVisible) {
      //   event.preventDefault();
      // }

      return null;
    }
  }, {
    key: "onFocus",
    value: function onFocus(event) {
      var _this3 = this;

      this.setState({
        isFocused: true,
        showResults: true,
        isDropdownVisible: true
      }, function () {
        _this3.onTextEntryUpdated();
      });

      if (this.props.onFocus) {
        return this.props.onFocus(event);
      }

      return null;
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      var _this4 = this;

      // console.log("onBlur");
      this.setState({
        isFocused: false
        // selectionIndex: null,
        // showResults: false,
        // isDropdownVisible: false,
      }, function () {
        _this4.onTextEntryUpdated();
      });

      if (this.props.onBlur) {
        return this.props.onBlur(event);
      }

      return null;
    }
  }, {
    key: "renderHiddenInput",
    value: function renderHiddenInput() {
      var name = this.props.name;
      var selection = this.state.selection;


      if (!name) {
        return null;
      }

      return _react2.default.createElement("input", {
        type: "hidden",
        name: name,
        value: selection
      });
    }
  }, {
    key: "generateSearchFunction",
    value: function generateSearchFunction() {
      var _props = this.props,
          searchOptions = _props.searchOptions,
          filterOption = _props.filterOption;


      if (typeof searchOptions === "function") {
        if (filterOption !== null) {
          console.warn("searchOptions prop is being used, filterOption prop will be ignored");
        }

        return searchOptions;
      } else if (typeof filterOption === "function") {
        return function (value, options) {
          return options.filter(function (o) {
            return filterOption(value, o);
          });
        };
      }

      var mapper = void 0;

      if (typeof filterOption === "string") {
        mapper = _accessor2.default.generateAccessor(filterOption);
      } else {
        mapper = _accessor2.default.identityFunction;
      }

      return function (value, options) {
        return _fuzzy2.default.filter(value, options, { extract: mapper }).map(function (res) {
          return options[res.index];
        });
      };
    }
  }, {
    key: "hasHint",
    value: function hasHint() {
      return this.state.searchResults.length > 0 || this.hasCustomValue();
    }
  }, {
    key: "handleWindowClose",
    value: function handleWindowClose(event) {
      var target = event.target;

      if (target !== window && !this.typeahead.contains(target)) {
        this.hideDropdown();
      }
    }
  }, {
    key: "renderAriaMessageForOptions",
    value: function renderAriaMessageForOptions() {
      var inputValue = this.state.entryValue;
      // const search = this.generateSearchFunction();
      // const options = search(inputValue, this.props.options);
      var options = this.state.searchResults;
      var selectedOption = options[this.state.selectionIndex];
      // const selectedOption = options.length && this.state.selectionIndex ?
      //   options[this.state.selectionIndex] :
      //   null;

      // console.log();

      return _react2.default.createElement(
        _status2.default,
        null,
        selectedOption || inputValue
      );
    }
  }, {
    key: "renderAriaMessageForIncomingOptions",
    value: function renderAriaMessageForIncomingOptions() {
      var maxVisible = this.props.maxVisible;
      var searchResults = this.state.searchResults;
      // const inputValue = this.state.entryValue;
      // const search = this.generateSearchFunction();
      // const options = search(inputValue, this.props.options) || [];

      var options = searchResults || [];
      var totalOptions = options.length ? options.length : 0;
      var numberOfSuggestions = maxVisible && maxVisible < options.length ? maxVisible : totalOptions;
      var suggestionText = numberOfSuggestions + " suggestion" + (numberOfSuggestions !== 1 ? "s are" : " is") + " available.";
      var instructionText = numberOfSuggestions > 0 ? "Use up and down arrows to select." : "";

      return _react2.default.createElement(
        _status2.default,
        null,
        suggestionText + " " + instructionText
      );
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _props2 = this.props,
          className = _props2.className,
          customClasses = _props2.customClasses,
          disableDefaultClassNames = _props2.disableDefaultClassNames,
          textarea = _props2.textarea,
          disabled = _props2.disabled,
          placeholder = _props2.placeholder,
          onKeyPress = _props2.onKeyPress,
          onKeyUp = _props2.onKeyUp,
          autoFocus = _props2.autoFocus,
          required = _props2.required,
          inputId = _props2.inputId,
          inputName = _props2.inputName;


      var InputElement = textarea ? "textarea" : "input";

      var containerClassList = (0, _createClassList2.default)(className, "typeahead", disableDefaultClassNames);

      var inputClassList = (0, _createClassList2.default)(customClasses.input, "input", disableDefaultClassNames);

      return _react2.default.createElement(
        "div",
        {
          className: containerClassList,
          ref: function ref(node) {
            return _this5.typeahead = node;
          },
          onMouseOut: this.onMouseOut,
          style: this.props.style
        },
        this.renderHiddenInput(),
        _react2.default.createElement(InputElement, {
          ref: function ref(node) {
            return _this5.inputElement = node;
          },
          className: inputClassList,
          type: "text",
          role: "combobox",
          "aria-owns": this.optionsId,
          "aria-controls": this.optionsId,
          "aria-expanded": this.state.isDropdownVisible,
          "aria-autocomplete": "both",
          "aria-activedescendant": this.activeDescendantId,
          autoCapitalize: "none",
          autoComplete: "off",
          autoCorrect: "off",
          autoFocus: autoFocus,
          required: required,
          spellCheck: false,
          id: inputId,
          name: inputName,
          disabled: disabled,
          placeholder: placeholder,
          value: this.state.entryValue,
          onChange: this.onChange,
          onKeyDown: this.onKeyDown,
          onKeyPress: onKeyPress,
          onKeyUp: onKeyUp,
          onFocus: this.onFocus,
          onBlur: this.onBlur
        }),
        this.state.showResults && this.renderIncrementalSearchResults(),
        this.renderAriaMessageForOptions(),
        this.renderAriaMessageForIncomingOptions()
      );
    }
  }]);

  return Typeahead;
}(_react.Component);

Typeahead.propTypes = {
  name: _propTypes2.default.string,
  className: _propTypes2.default.string,
  customClasses: _propTypes2.default.shape({
    hover: _propTypes2.default.string,
    input: _propTypes2.default.string,
    listAnchor: _propTypes2.default.string,
    listItem: _propTypes2.default.string,
    results: _propTypes2.default.string,
    resultsTruncated: _propTypes2.default.string,
    customAdd: _propTypes2.default.string
  }),
  maxVisible: _propTypes2.default.number,
  resultsTruncatedMessage: _propTypes2.default.string,
  options: _propTypes2.default.array,
  allowCustomValues: _propTypes2.default.number,
  initialValue: _propTypes2.default.string,
  value: _propTypes2.default.string,
  placeholder: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  textarea: _propTypes2.default.bool,
  // inputProps: PropTypes.object,
  inputId: _propTypes2.default.string,
  inputName: _propTypes2.default.string,
  autoFocus: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  onOptionSelected: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyPress: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  filterOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  searchOptions: _propTypes2.default.func,
  displayOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  inputDisplayOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  formInputOption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  disableDefaultClassNames: _propTypes2.default.bool,
  customListComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
  showOptionsWhenEmpty: _propTypes2.default.bool,
  style: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.object]))
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
  onOptionSelected: function onOptionSelected() {},
  onChange: function onChange() {},
  onKeyDown: function onKeyDown() {},
  onKeyPress: function onKeyPress() {},
  onKeyUp: function onKeyUp() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  filterOption: null,
  searchOptions: null,
  inputDisplayOption: null,
  disableDefaultClassNames: false,
  customListComponent: _selector2.default,
  showOptionsWhenEmpty: false,
  maxVisible: 0,
  displayOption: null,
  formInputOption: null,
  name: null,
  resultsTruncatedMessage: null,
  style: null
};

exports.default = Typeahead;