"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _token = require("./token");

var _token2 = _interopRequireDefault(_token);

var _accessor = require("../accessor");

var _accessor2 = _interopRequireDefault(_accessor);

var _keyevent = require("../keyevent");

var _keyevent2 = _interopRequireDefault(_keyevent);

var _classNames = require("../classNames");

var _classNames2 = _interopRequireDefault(_classNames);

var _typeahead = require("../typeahead");

var _typeahead2 = _interopRequireDefault(_typeahead);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A typeahead that, when an option is selected, instead of simply filling
 * the text entry widget, prepends a renderable "token", that may be deleted
 * by pressing backspace on the beginning of the line with the keyboard.
 */
var TypeaheadTokenizer = function (_Component) {
  _inherits(TypeaheadTokenizer, _Component);

  _createClass(TypeaheadTokenizer, null, [{
    key: "arraysAreDifferent",
    value: function arraysAreDifferent(firstArray, secondArray) {
      if (firstArray.length !== secondArray.length) {
        return true;
      }

      for (var index = secondArray.length - 1; index >= 0; index--) {
        if (secondArray[index] !== firstArray[index]) {
          return true;
        }
      }

      return false;
    }
  }]);

  function TypeaheadTokenizer(props) {
    _classCallCheck(this, TypeaheadTokenizer);

    var _this = _possibleConstructorReturn(this, (TypeaheadTokenizer.__proto__ || Object.getPrototypeOf(TypeaheadTokenizer)).call(this, props));

    _this.state = {
      selected: props.defaultSelected.slice(0)
    };

    _this.onKeyDown = _this.onKeyDown.bind(_this);
    _this.getSelectedTokens = _this.getSelectedTokens.bind(_this);
    _this.getOptionsForTypeahead = _this.getOptionsForTypeahead.bind(_this);
    _this.handleBackspace = _this.handleBackspace.bind(_this);
    _this.removeTokenForValue = _this.removeTokenForValue.bind(_this);
    _this.addTokenForValue = _this.addTokenForValue.bind(_this);
    _this.renderTokens = _this.renderTokens.bind(_this);
    return _this;
  }

  _createClass(TypeaheadTokenizer, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var arraysAreDifferent = TypeaheadTokenizer.arraysAreDifferent(this.props.defaultSelected, nextProps.defaultSelected);

      if (arraysAreDifferent) {
        this.setState({
          selected: nextProps.defaultSelected.slice(0)
        });
      }
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(event) {
      // We only care about intercepting backspaces
      if (event.keyCode === _keyevent2.default.DOM_VK_BACKSPACE) {
        return this.handleBackspace(event);
      }

      this.props.onKeyDown(event);

      return null;
    }
  }, {
    key: "getSelectedTokens",
    value: function getSelectedTokens() {
      return this.state.selected;
    }
  }, {
    key: "getOptionsForTypeahead",
    value: function getOptionsForTypeahead() {
      // return this.props.options without this.selected
      return this.props.options;
    }
  }, {
    key: "focus",
    value: function focus() {
      this.typeahead.focus();
    }
  }, {
    key: "handleBackspace",
    value: function handleBackspace(event) {
      var selected = this.state.selected;

      // No tokens

      if (!selected.length) {
        return;
      }

      // Remove token ONLY when backspace pressed at
      // beginning of line without a selection
      var inputElement = this.typeahead.inputElement;

      if (inputElement.selectionStart === inputElement.selectionEnd && inputElement.selectionStart === 0) {
        this.removeTokenForValue(selected[selected.length - 1]);
        event.preventDefault();
      }
    }
  }, {
    key: "removeTokenForValue",
    value: function removeTokenForValue(value) {
      var selected = this.state.selected;


      var index = selected.indexOf(value);

      if (index === -1) {
        return;
      }

      // TODO: not sure we should be doing this to state
      selected.splice(index, 1);

      this.setState({
        selected: selected
      });

      this.props.onTokenRemove(value);
    }
  }, {
    key: "addTokenForValue",
    value: function addTokenForValue(event, value) {
      var selected = this.state.selected;


      if (selected.indexOf(value) !== -1) {
        return;
      }

      // TODO: not sure we should be doing this to state
      selected.push(value);

      this.setState({
        selected: selected
      });

      this.typeahead.setEntryText("");
      this.props.onTokenAdd(value);
    }

    // TODO: Support initialized tokens

  }, {
    key: "renderTokens",
    value: function renderTokens() {
      var _this2 = this;

      var _props = this.props,
          customClasses = _props.customClasses,
          disableDefaultClassNames = _props.disableDefaultClassNames,
          displayOption = _props.displayOption,
          formInputOption = _props.formInputOption,
          name = _props.name;


      var tokenClasses = _defineProperty({}, _classNames2.default.token, !disableDefaultClassNames);

      tokenClasses[customClasses.token] = !!customClasses.token;

      var classList = (0, _classnames2.default)(tokenClasses);

      var result = this.state.selected.map(function (selected) {
        var displayString = _accessor2.default.valueForOption(displayOption, selected);

        var value = _accessor2.default.valueForOption(formInputOption || displayOption, selected);

        return _react2.default.createElement(
          _token2.default
          // className={classList}
          ,
          { key: displayString,
            onRemove: _this2.removeTokenForValue,
            object: selected,
            value: value,
            name: name
          },
          displayString
        );
      });

      return result;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var classes = {};
      classes[this.props.customClasses.typeahead] = !!this.props.customClasses.typeahead;
      var classList = (0, _classnames2.default)(classes);
      var tokenizerClasses = [!this.props.disableDefaultClassNames && _classNames2.default.tokenizer];
      tokenizerClasses[this.props.className] = !!this.props.className;
      var tokenizerClassList = (0, _classnames2.default)(tokenizerClasses);

      return _react2.default.createElement(
        "div",
        { className: tokenizerClassList },
        this.renderTokens(),
        _react2.default.createElement(_typeahead2.default, {
          ref: function ref(node) {
            return _this3.typeahead = node;
          },
          className: classList,
          placeholder: this.props.placeholder,
          disabled: this.props.disabled,
          inputProps: this.props.inputProps,
          allowCustomValues: this.props.allowCustomValues,
          customClasses: this.props.customClasses,
          options: this.getOptionsForTypeahead(),
          initialValue: this.props.initialValue,
          maxVisible: this.props.maxVisible,
          resultsTruncatedMessage: this.props.resultsTruncatedMessage,
          onOptionSelected: this.addTokenForValue,
          onKeyDown: this.onKeyDown,
          onKeyPress: this.props.onKeyPress,
          onKeyUp: this.props.onKeyUp,
          onFocus: this.props.onFocus,
          onBlur: this.props.onBlur,
          displayOption: this.props.displayOption,
          disableDefaultClassNames: this.props.disableDefaultClassNames,
          filterOption: this.props.filterOption,
          searchOptions: this.props.searchOptions
        })
      );
    }
  }]);

  return TypeaheadTokenizer;
}(_react.Component);

TypeaheadTokenizer.propTypes = {
  className: _react.PropTypes.string,
  name: _react.PropTypes.string,
  options: _react.PropTypes.array,
  customClasses: _react.PropTypes.object,
  allowCustomValues: _react.PropTypes.number,
  defaultSelected: _react.PropTypes.array,
  initialValue: _react.PropTypes.string,
  placeholder: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  inputProps: _react.PropTypes.object,
  onTokenRemove: _react.PropTypes.func,
  onKeyDown: _react.PropTypes.func,
  onKeyPress: _react.PropTypes.func,
  onKeyUp: _react.PropTypes.func,
  onTokenAdd: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func,
  filterOption: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
  searchOptions: _react.PropTypes.func,
  displayOption: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
  formInputOption: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
  maxVisible: _react.PropTypes.number,
  resultsTruncatedMessage: _react.PropTypes.string,
  disableDefaultClassNames: _react.PropTypes.bool
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
  disableDefaultClassNames: false,
  filterOption: null,
  searchOptions: null,
  displayOption: function displayOption(token) {
    return token;
  },
  formInputOption: null,
  onKeyDown: function onKeyDown() {},
  onKeyPress: function onKeyPress() {},
  onKeyUp: function onKeyUp() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onTokenAdd: function onTokenAdd() {},
  onTokenRemove: function onTokenRemove() {},
  maxVisible: 0,
  resultsTruncatedMessage: ""
};

exports.default = TypeaheadTokenizer;