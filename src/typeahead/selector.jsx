import React, { Component, PropTypes } from "react";
import TypeaheadOption from "./option";
import createClassList from "../createClassList";

/**
 * Container for the options rendered as part of the autocompletion process
 * of the typeahead
 */
class TypeaheadSelector extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
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

  onMouseOver(event, index) {
    return this.props.onMouseOver(event, index);
  }

  render() {
    const {
      options,
      allowCustomValues,
      disableDefaultClassNames,
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

    const dropdownClassList = createClassList(
      customClasses.results,
      "results",
      disableDefaultClassNames,
    );

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
          onMouseOver={(event) => { this.onMouseOver(event, 0); }}
          activeDescendantId={activeDescendantId}
          disableDefaultClassNames={disableDefaultClassNames}
        >
          {this.props.customValue}
        </TypeaheadOption>
      );
    }

    const results = options.map((result, index) => {
      const displayString = displayOption(result, index);

      return (
        <TypeaheadOption
          key={displayString}
          hover={selectionIndex === (index + customValueOffset)}
          customClasses={customClasses}
          onClick={(event) => { this.onClick(event, result); }}
          onMouseOver={(event) => { this.onMouseOver(event, index); }}
          activeDescendantId={activeDescendantId}
          disableDefaultClassNames={disableDefaultClassNames}
        >
          {displayString}
        </TypeaheadOption>
      );
    });

    if (areResultsTruncated && resultsTruncatedMessage) {
      const resultsTruncatedClassList = createClassList(
        customClasses.resultsTruncated,
        "resultsTruncated",
        disableDefaultClassNames,
      );

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
        className={dropdownClassList}
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
  onMouseOver: PropTypes.func,
  disableDefaultClassNames: PropTypes.bool,
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
  onMouseOver: () => {},
  disableDefaultClassNames: false,
  areResultsTruncated: false,
  resultsTruncatedMessage: null,
  id: "",
  activeDescendantId: "",
  isVisible: false,
};

export default TypeaheadSelector;
