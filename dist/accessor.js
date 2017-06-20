"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Accessor = function () {
  function Accessor() {
    _classCallCheck(this, Accessor);
  }

  _createClass(Accessor, [{
    key: "generateAccessor",
    value: function generateAccessor(field) {
      return function (object) {
        return object[field];
      };
    }
  }, {
    key: "generateOptionToStringFor",
    value: function generateOptionToStringFor(prop) {
      if (typeof prop === "string") {
        return this.generateAccessor(prop);
      } else if (typeof prop === "function") {
        return prop;
      } else {
        return Accessor.identityFunction;
      }
    }
  }, {
    key: "valueForOption",
    value: function valueForOption(option, object) {
      if (typeof option === "string") {
        return object[option];
      } else if (typeof option === "function") {
        return option(object);
      } else {
        return object;
      }
    }
  }], [{
    key: "identityFunction",
    value: function identityFunction(input) {
      return input;
    }
  }]);

  return Accessor;
}();

exports.default = Accessor;
;