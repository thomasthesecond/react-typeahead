"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _option = require("./option");

var _option2 = _interopRequireDefault(_option);

var _createClassList = require("../createClassList");

var _createClassList2 = _interopRequireDefault(_createClassList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Container for the options rendered as part of the autocompletion process
 * of the typeahead
 */
var TypeaheadSelector = function (_Component) {
  _inherits(TypeaheadSelector, _Component);

  function TypeaheadSelector(props) {
    _classCallCheck(this, TypeaheadSelector);

    var _this = _possibleConstructorReturn(this, (TypeaheadSelector.__proto__ || Object.getPrototypeOf(TypeaheadSelector)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    _this.onMouseOver = _this.onMouseOver.bind(_this);
    return _this;
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("componentWillReceiveProps");
  //   // console.log(this.props.selectionIndex, nextProps.selectionIndex);
  //   console.log(this.props, nextProps);
  // }

  // componentDidUpdate(prevProps) {
  //   console.log("componentDidUpdate");
  //   console.log(this.props.selectionIndex, prevProps.selectionIndex);
  // }

  _createClass(TypeaheadSelector, [{
    key: "onClick",
    value: function onClick(event, result) {
      return this.props.onOptionSelected(event, result);
    }
  }, {
    key: "onMouseOver",
    value: function onMouseOver(event, index) {
      return this.props.onMouseOver(event, index);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          allowCustomValues = _props.allowCustomValues,
          disableDefaultClassNames = _props.disableDefaultClassNames,
          customClasses = _props.customClasses,
          areResultsTruncated = _props.areResultsTruncated,
          resultsTruncatedMessage = _props.resultsTruncatedMessage,
          selectionIndex = _props.selectionIndex,
          displayOption = _props.displayOption,
          id = _props.id,
          activeDescendantId = _props.activeDescendantId,
          isVisible = _props.isVisible;

      // Don't render if there are no options to display

      if (!options.length && allowCustomValues <= 0) {
        return false;
      }

      var dropdownClassList = (0, _createClassList2.default)(customClasses.results, "results", disableDefaultClassNames);

      // CustomValue should be added to top of
      // results list with different class name
      var customValue = null;
      var customValueOffset = 0;

      if (this.props.customValue !== null) {
        customValueOffset++;
        customValue = _react2.default.createElement(
          _option2.default,
          {
            ref: this.props.customValue,
            key: this.props.customValue,
            hover: selectionIndex === 0,
            customClasses: customClasses,
            customValue: this.props.customValue,
            onClick: function onClick(event) {
              _this2.onClick(event, _this2.props.customValue);
            },
            onMouseOver: function onMouseOver(event) {
              _this2.onMouseOver(event, 0);
            },
            activeDescendantId: activeDescendantId,
            disableDefaultClassNames: disableDefaultClassNames
          },
          this.props.customValue
        );
      }

      var results = options.map(function (result, index) {
        var displayString = displayOption(result, index);

        return _react2.default.createElement(
          _option2.default,
          {
            key: displayString,
            hover: selectionIndex === index + customValueOffset,
            customClasses: customClasses,
            onClick: function onClick(event) {
              _this2.onClick(event, result);
            },
            onMouseOver: function onMouseOver(event) {
              _this2.onMouseOver(event, index);
            },
            activeDescendantId: activeDescendantId,
            disableDefaultClassNames: disableDefaultClassNames
          },
          displayString
        );
      });

      if (areResultsTruncated && resultsTruncatedMessage) {
        var resultsTruncatedClassList = (0, _createClassList2.default)(customClasses.resultsTruncated, "resultsTruncated", disableDefaultClassNames);

        results.push(_react2.default.createElement(
          "li",
          {
            className: resultsTruncatedClassList,
            key: "results-truncated"
          },
          resultsTruncatedMessage
        ));
      }

      return _react2.default.createElement(
        "ul",
        {
          id: id,
          className: dropdownClassList,
          role: "listbox",
          "aria-hidden": !isVisible,
          style: {
            display: isVisible ? "block" : "none"
          }
        },
        customValue,
        results
      );
    }
  }]);

  return TypeaheadSelector;
}(_react.Component);

TypeaheadSelector.propTypes = {
  displayOption: _propTypes2.default.func.isRequired,
  options: _propTypes2.default.array,
  allowCustomValues: _propTypes2.default.number,
  customClasses: _propTypes2.default.shape({
    results: _propTypes2.default.string,
    resultsTruncated: _propTypes2.default.string
  }),
  customValue: _propTypes2.default.string,
  selectionIndex: _propTypes2.default.number,
  onOptionSelected: _propTypes2.default.func,
  onMouseOver: _propTypes2.default.func,
  disableDefaultClassNames: _propTypes2.default.bool,
  areResultsTruncated: _propTypes2.default.bool,
  resultsTruncatedMessage: _propTypes2.default.string,
  id: _propTypes2.default.string,
  activeDescendantId: _propTypes2.default.string,
  isVisible: _propTypes2.default.bool
};

TypeaheadSelector.defaultProps = {
  options: [],
  allowCustomValues: 0,
  customClasses: {},
  customValue: null,
  selectionIndex: null,
  onOptionSelected: function onOptionSelected() {},
  onMouseOver: function onMouseOver() {},
  disableDefaultClassNames: false,
  areResultsTruncated: false,
  resultsTruncatedMessage: null,
  id: "",
  activeDescendantId: "",
  isVisible: false
};

exports.default = TypeaheadSelector;