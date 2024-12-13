// @ts-check

/// <reference path="./../types.js" />

import Field from "../../field.js";
import Fieldset from "../../fieldset.js";

/**
 * @extends {Fieldset<Language>}
 */
export default class LanguagesFieldset extends Fieldset {
  /**
   * @param {Language[]} [languages]
   */
  constructor(languages) {
    super({
      id: "languages",
      label: "Языки",
      options: languages,
    });
  }

  setup() {
    super.setup();

    this.addButton.element.setAttribute("test-id", "add-language");
    this.removeButton.element.setAttribute("test-id", "remove-language");
  }

  /**
   * @param {Partial<Language>} [value] 
   */
  createElement(value) {
    const element = document.createElement("div");

    const name = new Field({
      name: this.generateUniqueId("name"),
      value: value?.name,
      label: "Название",
      placeholder: "Введите название языка…",
      testId: "language-name",
    });

    const level = new Field({
      name: this.generateUniqueId("level"),
      value: value?.level,
      label: "Уровень",
      placeholder: "Введите уровень владения языком…",
      testId: "language-level",
    });;

    element.append(name.element);
    element.append(level.element);

    element.classList.add("row");

    if (this.initialized) {
      requestAnimationFrame(() => {
        name.input.focus();
        name.input.select();
      });
    }

    return element;
  }
}
