"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _option = require("./option");

var _option2 = _interopRequireDefault(_option);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

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
    return _this;
  }

  _createClass(TypeaheadSelector, [{
    key: "onClick",
    value: function onClick(result, event) {
      return this.props.onOptionSelected(result, event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // Don't render if there are no options to display
      if (!this.props.options.length && this.props.allowCustomValues <= 0) {
        return false;
      }

      var classes = {
        "typeahead-selector": this.props.defaultClassNames
      };

      classes[this.props.customClasses.results] = this.props.customClasses.results;

      var classList = (0, _classnames2.default)(classes);

      // CustomValue should be added to top of results list with different class name
      var customValue = null;
      var customValueOffset = 0;
      if (this.props.customValue !== null) {
        customValueOffset++;
        customValue = _react2.default.createElement(
          _option2.default,
          {
            ref: this.props.customValue,
            key: this.props.customValue,
            hover: this.props.selectionIndex === 0,
            customClasses: this.props.customClasses,
            customValue: this.props.customValue,
            onClick: function onClick(event) {
              _this2.onClick(event, _this2.props.customValue);
            }
          },
          this.props.customValue
        );
      }

      var results = this.props.options.map(function (result, index) {
        var displayString = _this2.props.displayOption(result, index);
        var uniqueKey = displayString + "_" + index;

        return _react2.default.createElement(
          _option2.default,
          {
            ref: uniqueKey,
            key: uniqueKey,
            hover: _this2.props.selectionIndex === index + customValueOffset,
            customClasses: _this2.props.customClasses,
            onClick: _this2._onClick.bind(_this2, result)
          },
          displayString
        );
      }, this);

      if (this.props.areResultsTruncated && this.props.resultsTruncatedMessage !== null) {
        var resultsTruncatedClasses = {
          "results-truncated": this.props.defaultClassNames
        };

        resultsTruncatedClasses[this.props.customClasses.resultsTruncated] = this.props.customClasses.resultsTruncated;

        var resultsTruncatedClassList = (0, _classnames2.default)(resultsTruncatedClasses);

        results.push(_react2.default.createElement(
          "li",
          { key: "results-truncated", className: resultsTruncatedClassList },
          this.props.resultsTruncatedMessage
        ));
      }

      return _react2.default.createElement(
        "ul",
        { className: classList },
        customValue,
        results
      );
    }
  }]);

  return TypeaheadSelector;
}(_react.Component);

TypeaheadSelector.propTypes = {
  displayOption: _react.PropTypes.func.isRequired,
  options: _react.PropTypes.array,
  allowCustomValues: _react.PropTypes.number,
  customClasses: _react.PropTypes.object,
  customValue: _react.PropTypes.string,
  selectionIndex: _react.PropTypes.number,
  onOptionSelected: _react.PropTypes.func,
  defaultClassNames: _react.PropTypes.bool,
  areResultsTruncated: _react.PropTypes.bool,
  resultsTruncatedMessage: _react.PropTypes.string
};

TypeaheadSelector.defaultProps = {
  selectionIndex: null,
  customClasses: {},
  allowCustomValues: 0,
  customValue: null,
  onOptionSelected: function onOptionSelected(option) {},
  defaultClassNames: true
};

exports.default = TypeaheadSelector;