import React, { PropTypes } from "react";

const Status = ({ children }) => (
  <span
    role="status"
    aria-live="polite"
    style={{
      left: "-9999px",
      position: "absolute",
    }}
  >
    {children}
  </span>
);

Status.propTypes = {
  children: PropTypes.string,
};

Status.defaultProps = {
  children: null,
};

export default Status;
