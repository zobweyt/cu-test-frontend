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
    })
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

    const title = new Field({
      name: this.generateUniqueId("title"),
      value: value?.title,
      label: "Должность",
      placeholder: "Введите должность…",
      testId: "job-title",
    });

    const start = new Field({
      name: this.generateUniqueId("date-start"),
      type: "date",
      value: value?.date_start,
      label: "Дата начала",
      placeholder: "Введите дату начала работы…",
      testId: "job-date-start",
    });

    const end = new Field({
      name: this.generateUniqueId("date-end"),
      type: "date",
      value: value?.date_end,
      label: "Дата окончания",
      placeholder: "Введите дату окончания работы…",
      testId: "job-date-end",
    });

    const place = new Field({
      name: this.generateUniqueId("place"),
      value: value?.place,
      label: "Место работы",
      placeholder: "Введите место работы…",
      testId: "job-place",
    });

    const description = new Field({
      name: this.generateUniqueId("description"),
      value: value?.description,
      label: "Описание работы",
      placeholder: "Введите произвольные описание работы…",
      testId: "jon-description",
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
