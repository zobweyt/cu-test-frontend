// @ts-check

/// <reference path="./../types.js" />

import Field from "../../field.js";
import Fieldset from "../../fieldset.js";

/**
 * @extends Fieldset<Course>
 */
export default class CoursesFieldset extends Fieldset {
  /**
   * @param {Course[]} [courses]
   */
  constructor(courses) {
    super({
      id: "courses",
      label: "Курсы",
      options: courses,
    })
  }

  setup() {
    super.setup();

    this.addButton.element.setAttribute("test-id", "add-course");
    this.removeButton.element.setAttribute("test-id", "remove-course");
  }

  /**
   * @param {Course} [value]
   */
  createElement(value) {
    const element = document.createElement("div");

    const upper = document.createElement("div");
    const lower = document.createElement("div");

    const title = new Field({
      name: this.generateUniqueId("title"),
      value: value?.title,
      placeholder: "Введите название курса…",
      testId: "course-title",
    });

    const start = new Field({
      name: this.generateUniqueId("date_start"),
      type: "date",
      value: value?.date_start,
      placeholder: "Введите дату начала обучения…",
      testId: "course-date-start",
    });

    const end = new Field({
      name: this.generateUniqueId("date_end"),
      type: "date",
      value: value?.date_end,
      placeholder: "Введите дату окончания обучения…",
      testId: "course-date-end",
    });

    const place = new Field({
      name: this.generateUniqueId("place"),
      value: value?.place,
      placeholder: "Введите место обучения…",
      testId: "course-place",
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

    if (this.initialized) {
      requestAnimationFrame(() => {
        title.input.focus();
        title.input.select();
      });
    }

    return element;
  }
}
