import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import data from "./data.json";
// import { Typeahead, Tokenizer } from "../lib/react-typeahead";
// import Tokenizer from "../lib/react-typeahead";
import Typeahead from "../lib/typeahead";
import Tokenizer from "../lib/tokenizer";

// console.log(Typeahead);
// console.log(Tokenizer);

// const classNames = {
//   typeahead: "Typeahead--tokenizer",
//   input: "Typeahead-input",
//   results: "Typeahead-results",
//   listItem: "Typeahead-listItem",
//   listAnchor: "Typeahead-listAnchor",
//   hover: "Typeahead-hover",
//   resultsTruncated: "Typeahead-resultsTruncated",
// };

const localProps = {
  // disableDefaultClassNames: true,
  // customClasses: classNames,
  maxVisible: 5,
};

storiesOf("Typeahead", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Typeahead
      {...localProps}
      placeholder="Select a location"
      options={data.places}
    />
  ));

storiesOf("Tokenizer", module)
  .addDecorator(withKnobs)
  .add("Default", () => (
    <Tokenizer
      {...localProps}
      placeholder="Select a location"
      options={data.places}
    />
  ));
