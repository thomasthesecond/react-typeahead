import React, { PropTypes } from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

const Status = styled.span.attrs({
  role: "status",
  "aria-live": "polite",
})`
  left: -9999px;
  position: absolute;
`;

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
  children: PropTypes.string,
};

Status.defaultProps = {
  children: null,
};

export default Status;
