import React, { PropTypes } from "react"; // eslint-disable-line no-unused-vars
import styled from "styled-components";
// import cn from "classnames";
import defaultClassNames from "../classNames";

const Container = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 32px;
  display: inline-flex;
  color: #2c3643;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 32px;
  justify-content: center;
  line-height: 1;
  padding-left: 24px;
  padding-right: 24px;
  position: relative;

  &:not(:first-of-type) {
    margin-left: 8px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: inline-block;
  font-size: 8px;
  line-height: 1;
  /*margin-left: 8px;*/
  margin-right: -8px;
  padding: 8px;
  transition: color 200ms ease-in-out;

  &:hover,
  &:active,
  &:focus {
    color: rgba(44,54,67, .7);
  }

  &:focus {
    outline: 0;
  }
`;

const Icon = styled.svg`
  display: inline-block;
  fill: currentColor;
  height: 1em;
  line-height: 1;
  vertical-align: middle;
  width: 1em;

  button:focus > & {
    outline: 1px dotted lightgray;
    outline-offset: 2px;
  }
`;

/**
 * Encapsulates the rendering of an option that has been "selected" in a
 * TypeaheadTokenizer
 */
const Token = ({
  className,
  children,
  name,
  value,
  object,
  onRemove,
}) => (
  <Container
    // className={cn([defaultClassNames.token, className])}
    className={className}
  >
    {name &&
      <input
        type="hidden"
        name={`${name}[]`}
        value={value || object}
      />
    }

    {children}

    {onRemove &&
      <Button
        className={defaultClassNames.token}
        onClick={(event) => {
          onRemove(object);
          event.preventDefault();
        }}
      >
        <Icon
          viewBox="0 0 32 32"
          title={`Remove ${children} selection`}
        >
          <path d="M18 16l10-10-2-2-10 10-10-10-2 2 10 10-10 10 2 2 10-10 10 10 2-2-10-10z" />
        </Icon>
      </Button>
    }
  </Container>
);

Token.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.string,
  object: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  onRemove: PropTypes.func,
  value: PropTypes.string,
};

Token.defaultProps = {
  className: null,
  name: null,
  children: null,
  object: null,
  onRemove: null,
  value: "",
};

export default Token;
