import React, { PropTypes } from "react";

const Status = ({ children }) => (
  <span
    role="status"
    aria-live="polite"
    style={{
      // left: "-9999px",
      // position: "absolute",
    }}
  >
    <b>{children}</b>
  </span>
);

Status.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Status;
