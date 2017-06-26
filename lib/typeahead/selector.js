"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n      box-shadow: 0 5px 10px 1px rgba(153,169,179, .5);\n      left: 0;\n      list-style: none;\n      margin-bottom: 0;\n      margin-top: 0;\n      overflow: hidden;\n      padding-left: 0;\n      position: absolute;\n      top: auto;\n      width: 100%;\n    "], ["\n      box-shadow: 0 5px 10px 1px rgba(153,169,179, .5);\n      left: 0;\n      list-style: none;\n      margin-bottom: 0;\n      margin-top: 0;\n      overflow: hidden;\n      padding-left: 0;\n      position: absolute;\n      top: auto;\n      width: 100%;\n    "]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _option = require("./option");

var _option2 = _interopRequireDefault(_option);

var _createClassList = require("../createClassList");

var _createClassList2 = _interopRequireDefault(_createClassList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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
            innerRef: function innerRef(node) {
              return _this2.customOption = node;
            },
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
            }
            // onMouseOver={(event) => { this.onMouseOver(event, index); }}
            , activeDescendantId: activeDescendantId,
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

      var List = _styledComponents2.default.ul(_templateObject);

      return _react2.default.createElement(
        List,
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
  displayOption: _react.PropTypes.func.isRequired,
  options: _react.PropTypes.array,
  allowCustomValues: _react.PropTypes.number,
  customClasses: _react.PropTypes.shape({
    results: _react.PropTypes.string,
    resultsTruncated: _react.PropTypes.string
  }),
  customValue: _react.PropTypes.string,
  selectionIndex: _react.PropTypes.number,
  onOptionSelected: _react.PropTypes.func,
  // onMouseOver: PropTypes.func,
  disableDefaultClassNames: _react.PropTypes.bool,
  areResultsTruncated: _react.PropTypes.bool,
  resultsTruncatedMessage: _react.PropTypes.string,
  id: _react.PropTypes.string,
  activeDescendantId: _react.PropTypes.string,
  isVisible: _react.PropTypes.bool
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