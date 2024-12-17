// @ts-check

/// <reference path="./../types.js" />

import Field from "../../field.js";
import Fieldset from "../../fieldset.js";

/**
 * @extends Fieldset<Education>
 */
export default class EducationFieldset extends Fieldset {
  /**
   * @param {Education[]} [education]
   */
  constructor(education) {
    super({
      id: "education",
      label: "Образование и квалификация",
      options: education,
    });
  }

  setup() {
    super.setup();

    this.addButton.element.setAttribute("test-id", "add-education");
    this.removeButton.element.setAttribute("test-id", "remove-education");
  }

  /**
   * @param {Education} [value]
   */
  createElement(value) {
    const element = document.createElement("div");

    const upper = document.createElement("div");
    const lower = document.createElement("div");

    const title = new Field({
      name: this.generateUniqueId("title"),
      value: value?.title,
      placeholder: "Введите высшее образование…",
      testId: "education-title",
    });

    const start = new Field({
      name: this.generateUniqueId("date_start"),
      type: "date",
      value: value?.date_start,
      placeholder: "Введите дату начала обучения…",
      testId: "education-date-start",
    });

    const end = new Field({
      name: this.generateUniqueId("date_end"),
      type: "date",
      value: value?.date_end,
      placeholder: "Введите дату окончания обучения…",
      testId: "education-date-end",
    });

    const place = new Field({
      name: this.generateUniqueId("place"),
      value: value?.place,
      placeholder: "Введите место обучения…",
      testId: "education-place",
    });

    const description = new Field({
      name: this.generateUniqueId("description"),
      value: value?.description,
      placeholder: "Введите описание обучения…",
      testId: "education-description",
      multiline: true,
    });

    upper.classList.add("grid-auto-fit");
    lower.classList.add("grid-auto-fit");
    element.classList.add("flow");

    upper.appendChild(title.element);
    upper.appendChild(place.element);

    lower.appendChild(start.element);
    lower.appendChild(end.element);

    element.appendChild(upper);
    element.appendChild(lower);
    element.appendChild(description.element);

    if (this.initialized) {
      requestAnimationFrame(() => {
        title.input.focus();
        title.input.select();
      });
    }

    return element;
  }
}
