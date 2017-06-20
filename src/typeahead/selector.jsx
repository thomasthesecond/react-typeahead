import React, { Component, PropTypes } from "react";
import cn from "classnames";
import TypeaheadOption from "./option";

/**
 * Container for the options rendered as part of the autocompletion process
 * of the typeahead
 */
class TypeaheadSelector extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log("componentWillReceiveProps");
  //   // console.log(this.props.selectionIndex, nextProps.selectionIndex);
  //   console.log(this.props, nextProps);
  // }

  // componentDidUpdate(prevProps) {
  //   console.log("componentDidUpdate");
  //   console.log(this.props.selectionIndex, prevProps.selectionIndex);
  // }

  onClick(event, result) {
    return this.props.onOptionSelected(event, result);
  }

  render() {
    const {
      options,
      allowCustomValues,
      defaultClassNames,
      customClasses,
      areResultsTruncated,
      resultsTruncatedMessage,
      selectionIndex,
      displayOption,
      id,
      activeDescendantId,
      isVisible,
    } = this.props;

    // Don't render if there are no options to display
    if (!options.length && allowCustomValues <= 0) {
      return false;
    }

    const classes = {
      "typeahead-selector": defaultClassNames,
    };

    classes[customClasses.results] = customClasses.results;

    const classList = cn(classes);

    // CustomValue should be added to top of
    // results list with different class name
    let customValue = null;
    let customValueOffset = 0;

    if (this.props.customValue !== null) {
      customValueOffset++;
      customValue = (
        <TypeaheadOption
          ref={this.props.customValue}
          key={this.props.customValue}
          hover={selectionIndex === 0}
          customClasses={customClasses}
          customValue={this.props.customValue}
          onClick={(event) => { this.onClick(event, this.props.customValue); }}
          activeDescendantId={activeDescendantId}
        >
          {this.props.customValue}
        </TypeaheadOption>
      );
    }

    const results = options.map((result, index) => {
      const displayString = displayOption(result, index);
      const uniqueKey = `${displayString}_${index}`;

      return (
        <TypeaheadOption
          ref={uniqueKey}
          key={uniqueKey}
          hover={selectionIndex === (index + customValueOffset)}
          customClasses={customClasses}
          onClick={(event) => { this.onClick(event, result); }}
          activeDescendantId={activeDescendantId}
        >
          {displayString}
        </TypeaheadOption>
      );
    }, this);

    if (areResultsTruncated && resultsTruncatedMessage !== null) {
      const resultsTruncatedClasses = {
        "results-truncated": defaultClassNames,
      };

      resultsTruncatedClasses[customClasses.resultsTruncated] = customClasses.resultsTruncated;

      const resultsTruncatedClassList = cn(resultsTruncatedClasses);

      results.push(
        <li
          className={resultsTruncatedClassList}
          key="results-truncated"
        >
          {resultsTruncatedMessage}
        </li>,
      );
    }

    return (
      <ul
        id={id}
        className={classList}
        role="listbox"
        aria-hidden={!isVisible}
        style={{
          display: isVisible ? "block" : "none",
        }}
      >
        {customValue}
        {results}
      </ul>
    );
  }
}

TypeaheadSelector.propTypes = {
  displayOption: PropTypes.func.isRequired,
  options: PropTypes.array,
  allowCustomValues: PropTypes.number,
  customClasses: PropTypes.shape({
    results: PropTypes.string,
    resultsTruncated: PropTypes.string,
  }),
  customValue: PropTypes.string,
  selectionIndex: PropTypes.number,
  onOptionSelected: PropTypes.func,
  defaultClassNames: PropTypes.bool,
  areResultsTruncated: PropTypes.bool,
  resultsTruncatedMessage: PropTypes.string,
  id: PropTypes.string,
  activeDescendantId: PropTypes.string,
  isVisible: PropTypes.bool,
};

TypeaheadSelector.defaultProps = {
  options: [],
  allowCustomValues: 0,
  customClasses: {},
  customValue: null,
  selectionIndex: null,
  onOptionSelected: () => {},
  defaultClassNames: true,
  areResultsTruncated: false,
  resultsTruncatedMessage: null,
  id: "",
  activeDescendantId: "",
  isVisible: false,
};

export default TypeaheadSelector;
