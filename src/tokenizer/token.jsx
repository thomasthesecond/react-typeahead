import React, { PropTypes } from "react";
import cn from "classnames";

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
    className={cn(["typeahead-token", className])}
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
        className={className || "typeahead-token-close"}
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
