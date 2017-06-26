import React, { PropTypes } from "react";
import cn from "classnames";
import defaultClassNames from "../classNames";

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
  <div
    className={cn([defaultClassNames.token, className])}
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
      <button
        className={`${defaultClassNames.tokenDelete}`}
        onClick={(event) => {
          onRemove(object);
          event.preventDefault();
        }}
      >
        &#x00d7;
      </button>
    }
  </div>
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
