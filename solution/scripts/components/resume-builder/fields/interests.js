// @ts-check

/// <reference path="./../types.js" />

import Field from "../../field.js";
import Fieldset from "../../fieldset.js";

/**
 * @extends {Fieldset<string>}
 */
export default class InterestsFieldset extends Fieldset {
  /**
   * @param {string[]} [interests]
   */
  constructor(interests) {
    super({
      id: "interests",
      label: "Интересы",
      options: interests,
    });
  }

  setup() {
    super.setup();

    this.addButton.element.setAttribute("test-id", "add-interest");
    this.removeButton.element.setAttribute("test-id", "remove-interest");
  }

  /**
   * @param {string} [value]
   */
  createElement(value) {
    const field = new Field({
      name: this.generateUniqueId(),
      value: value,
      placeholder: "Введите свой интерес…",
      testId: "interest",
    });

    if (this.initialized) {
      requestAnimationFrame(() => {
        field.input.focus();
        field.input.select();
      });
    }

    return field.element;
  }
}
