"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _classNames = require("../classNames");

var _classNames2 = _interopRequireDefault(_classNames);

var _createClassList = require("../createClassList");

var _createClassList2 = _interopRequireDefault(_createClassList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A single option within the TypeaheadSelector
 */
var TypeaheadOption = function (_Component) {
  _inherits(TypeaheadOption, _Component);

  function TypeaheadOption(props) {
    _classCallCheck(this, TypeaheadOption);

    var _this = _possibleConstructorReturn(this, (TypeaheadOption.__proto__ || Object.getPrototypeOf(TypeaheadOption)).call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    _this.onMouseOver = _this.onMouseOver.bind(_this);
    return _this;
  }

  _createClass(TypeaheadOption, [{
    key: "onClick",
    value: function onClick(event) {
      event.preventDefault();

      return this.props.onClick(event);
    }
  }, {
    key: "onMouseOver",
    value: function onMouseOver(event) {
      event.preventDefault();

      return this.props.onMouseOver(event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          customClasses = _props.customClasses,
          disableDefaultClassNames = _props.disableDefaultClassNames,
          customValue = _props.customValue,
          children = _props.children,
          hover = _props.hover,
          activeDescendantId = _props.activeDescendantId;


      var classes = _defineProperty({}, _classNames2.default.listItem, !disableDefaultClassNames);

      classes[customClasses.hover || _classNames2.default.hover] = !!hover;
      classes[customClasses.listItem] = !!customClasses.listItem;

      if (customValue) {
        classes[customClasses.customAdd || _classNames2.default.customAdd] = !!customClasses.customAdd;
      }

      var classList = (0, _classnames2.default)(classes);

      var optionClassList = (0, _createClassList2.default)(customClasses.listAnchor, "listAnchor", disableDefaultClassNames);

      return _react2.default.createElement(
        "li",
        {
          id: hover ? activeDescendantId : null,
          className: classList,
          role: "option",
          "aria-selected": hover,
          onClick: this.onClick,
          onMouseOver: this.onMouseOver
        },
        _react2.default.createElement(
          "div",
          {
            className: optionClassList,
            ref: function ref(node) {
              return _this2.option = node;
            },
            style: {
              cursor: "default"
            }
          },
          children
        )
      );
    }
  }]);

  return TypeaheadOption;
}(_react.Component);

TypeaheadOption.propTypes = {
  customClasses: _propTypes2.default.shape({
    customAdd: _propTypes2.default.string,
    hover: _propTypes2.default.string,
    listAnchor: _propTypes2.default.string,
    listItem: _propTypes2.default.string
  }),
  customValue: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  onMouseOver: _propTypes2.default.func,
  children: _propTypes2.default.string,
  hover: _propTypes2.default.bool,
  activeDescendantId: _propTypes2.default.string,
  disableDefaultClassNames: _propTypes2.default.bool
};

TypeaheadOption.defaultProps = {
  customClasses: null,
  customValue: null,
  onClick: function onClick(event) {
    event.preventDefault();
  },
  onMouseOver: function onMouseOver(event) {
    event.preventDefault();
  },
  children: null,
  hover: false,
  activeDescendantId: "",
  disableDefaultClassNames: false
};

exports.default = TypeaheadOption;