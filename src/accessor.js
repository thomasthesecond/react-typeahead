export default class Accessor {
  static identityFunction(input) {
    return input;
  }

  generateAccessor(field) {
    return function(object) { return object[field]; };
  }

  generateOptionToStringFor(prop) {
    if (typeof prop === "string") {
      return this.generateAccessor(prop);
    } else if (typeof prop === "function") {
      return prop;
    } else {
      return Accessor.identityFunction;
    }
  }

  valueForOption(option, object) {
    if (typeof option === "string") {
      return object[option];
    } else if (typeof option === "function") {
      return option(object);
    } else {
      return object;
    }
  }
};
