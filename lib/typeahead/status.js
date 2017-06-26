"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _templateObject = _taggedTemplateLiteral(["\n  left: -9999px;\n  position: absolute;\n"], ["\n  left: -9999px;\n  position: absolute;\n"]);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); } // eslint-disable-line no-unused-vars


var Status = _styledComponents2.default.span.attrs({
  role: "status",
  "aria-live": "polite"
})(_templateObject);

// const StatusComponent = ({ children }) => (
//   <span
//     role="status"
//     aria-live="polite"
//     // style={{
//     //   left: "-9999px",
//     //   position: "absolute",
//     // }}
//   >
//     {children}
//   </span>
// );

// const Status = styled(StatusComponent)`
//   background-color: red;
// `;


Status.propTypes = {
  children: _react.PropTypes.string
};

Status.defaultProps = {
  children: null
};

exports.default = Status;