import React, { PropTypes } from "react";

const Div = ({ children }) => (
  <div className="doo">
    {children}
  </div>
);

Div.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Div;
