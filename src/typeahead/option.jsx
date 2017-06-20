import React, { Component, PropTypes } from "react";
import cn from "classnames";

/**
 * A single option within the TypeaheadSelector
 */
class TypeaheadOption extends Component {
  constructor() {
    super();

    this.getClasses = this.getClasses.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();

    return this.props.onClick(event);
  }

  getClasses() {
    const { customClasses } = this.props;

    const classes = {
      "typeahead-option": true,
    };

    classes[customClasses.listAnchor] = !!customClasses.listAnchor;

    return cn(classes);
  }

  render() {
    const classes = {};

    const {
      customClasses,
      customValue,
      children,
      hover,
      activeDescendantId,
    } = this.props;

    classes[customClasses.hover || "hover"] = !!hover;
    classes[customClasses.listItem] = !!customClasses.listItem;

    if (customValue) {
      classes[customClasses.customAdd] = !!customClasses.customAdd;
    }

    const classList = cn(classes);

    return (
      <li
        id={hover ? activeDescendantId : null}
        className={classList}
        role="option"
        aria-selected={hover}
        style={{
          backgroundColor: hover ? "gray" : "white",
        }}
      >
        <button
          tabIndex={-1}
          onClick={this.onClick}
          className={this.getClasses()}
          ref={node => (this.option = node)}
        >
          {children}
        </button>
      </li>
    );
  }
}

TypeaheadOption.propTypes = {
  customClasses: PropTypes.shape({
    customAdd: PropTypes.string,
    hover: PropTypes.string,
    listAnchor: PropTypes.string,
    listItem: PropTypes.string,
  }),
  customValue: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.string,
  hover: PropTypes.bool,
  activeDescendantId: PropTypes.string,
};

TypeaheadOption.defaultProps = {
  customClasses: null,
  customValue: null,
  onClick: (event) => {
    event.preventDefault();
  },
  children: null,
  hover: false,
  activeDescendantId: "",
};

export default TypeaheadOption;
