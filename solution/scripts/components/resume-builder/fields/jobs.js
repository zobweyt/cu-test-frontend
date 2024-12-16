// @ts-check

/// <reference path="./../types.js" />

import Field from "../../field.js";
import Fieldset from "../../fieldset.js";

/**
 * @extends Fieldset<Job>
 */
export default class JobsFieldset extends Fieldset {
  /**
   * @param {Job[]} [jobs]
   */
  constructor(jobs) {
    super({
      id: "jobs",
      label: "Опыт работы",
      options: jobs,
    });
  }

  setup() {
    super.setup();

    this.addButton.element.setAttribute("test-id", "add-job");
    this.removeButton.element.setAttribute("test-id", "remove-job");
  }

  /**
   * @param {Job} [value]
   */
  createElement(value) {
    const element = document.createElement("div");

    const upper = document.createElement("div");
    const lower = document.createElement("div");

    const title = new Field({
      name: this.generateUniqueId("title"),
      value: value?.title,
      placeholder: "Введите должность…",
      testId: "job-title",
    });

    const start = new Field({
      name: this.generateUniqueId("date-start"),
      type: "date",
      value: value?.date_start,
      placeholder: "Введите дату начала работы…",
      testId: "job-date-start",
    });

    const end = new Field({
      name: this.generateUniqueId("date-end"),
      type: "date",
      value: value?.date_end,
      placeholder: "Введите дату окончания работы…",
      testId: "job-date-end",
    });

    const place = new Field({
      name: this.generateUniqueId("place"),
      value: value?.place,
      placeholder: "Введите место работы…",
      testId: "job-place",
    });

    const description = new Field({
      name: this.generateUniqueId("description"),
      value: value?.description,
      placeholder: "Введите описание работы…",
      testId: "jon-description",
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
