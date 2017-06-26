import React, { PropTypes } from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  color: #2c3643;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1;
  position: relative;
`;

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onMouseOut: PropTypes.func,
};

Container.defaultProps = {
  children: null,
  className: null,
  onMouseOut: null,
};

export default Container;
