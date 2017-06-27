import React from "react";
import PropTypes from "prop-types";
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
        <svg
          viewBox="0 0 32 32"
          title={`Remove ${children} selection`}
          style={{
            display: "inline-block",
            fill: "currentColor",
            height: "1em",
            lineHeight: 1,
            verticalAlign: "middle",
            width: "1em",
          }}
        >
          <path d="M18 16l10-10-2-2-10 10-10-10-2 2 10 10-10 10 2 2 10-10 10 10 2-2-10-10z" />
        </svg>
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
