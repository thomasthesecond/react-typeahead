import React, { Component, PropTypes } from "react";
import cn from "classnames";
import defaultClassNames from "../classNames";
import createClassList from "../createClassList";

/**
 * A single option within the TypeaheadSelector
 */
class TypeaheadOption extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onClick(event) {
    event.preventDefault();

    return this.props.onClick(event);
  }

  onMouseOver(event) {
    event.preventDefault();

    return this.props.onMouseOver(event);
  }

  render() {
    const {
      customClasses,
      disableDefaultClassNames,
      customValue,
      children,
      hover,
      activeDescendantId,
    } = this.props;

    const classes = {
      [defaultClassNames.listItem]: !disableDefaultClassNames,
    };

    classes[customClasses.hover || defaultClassNames.hover] = !!hover;
    classes[customClasses.listItem] = !!customClasses.listItem;

    if (customValue) {
      classes[customClasses.customAdd || defaultClassNames.customAdd] = !!customClasses.customAdd;
    }

    const classList = cn(classes);

    const optionClassList = createClassList(
      customClasses.listAnchor,
      "listAnchor",
      disableDefaultClassNames,
    );

    return (
      <li
        id={hover ? activeDescendantId : null}
        className={classList}
        role="option"
        aria-selected={hover}
        onClick={this.onClick}
        onMouseOver={this.onMouseOver}
        style={{
          backgroundColor: hover ? "rgba(0,0,0,.2)" : "#fff",
        }}
      >
        {/* <button
          tabIndex={-1}
          onClick={this.onClick}
          className={optionClassList}
          ref={node => (this.option = node)}
        >
          {children}
        </button> */}
        <div
          className={optionClassList}
          ref={node => (this.option = node)}
          style={{
            cursor: "default",
          }}
        >
          {children}
        </div>
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
  onMouseOver: PropTypes.func,
  children: PropTypes.string,
  hover: PropTypes.bool,
  activeDescendantId: PropTypes.string,
  disableDefaultClassNames: PropTypes.bool,
};

TypeaheadOption.defaultProps = {
  customClasses: null,
  customValue: null,
  onClick: (event) => {
    event.preventDefault();
  },
  onMouseOver: (event) => {
    event.preventDefault();
  },
  children: null,
  hover: false,
  activeDescendantId: "",
  disableDefaultClassNames: false,
};

export default TypeaheadOption;
