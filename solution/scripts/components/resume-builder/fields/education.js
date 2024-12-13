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
    })
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

    const title = new Field({
      name: this.generateUniqueId("title"),
      value: value?.title,
      label: "Название",
      placeholder: "Введите высшее образование…",
      testId: "education-title",
    });

    const start = new Field({
      name: this.generateUniqueId("date-start"),
      type: "date",
      value: value?.date_start,
      label: "Дата начала",
      placeholder: "Введите дату начала обучения…",
      testId: "education-date-start",
    });

    const end = new Field({
      name: this.generateUniqueId("date-end"),
      type: "date",
      value: value?.date_end,
      label: "Дата окончания",
      placeholder: "Введите дату окончания обучения…",
      testId: "education-date-end",
    });

    const place = new Field({
      name: this.generateUniqueId("place"),
      value: value?.place,
      label: "Место работы",
      placeholder: "Введите место обучения…",
      testId: "education-place",
    });

    const description = new Field({
      name: this.generateUniqueId("description"),
      value: value?.description,
      label: "Описание работы",
      placeholder: "Введите произвольные описание места обучения…",
      testId: "education-description",
      multiline: true,
    });

    element.appendChild(title.element);
    element.appendChild(start.element);
    element.appendChild(end.element);
    element.appendChild(place.element);
    element.appendChild(description.element);

    element.classList.add("col");

    if (this.initialized) {
      requestAnimationFrame(() => {
        title.input.focus();
        title.input.select();
      });
    }

    return element;
  }
}
