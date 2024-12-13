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

    const title = new Field({
      name: this.generateUniqueId("title"),
      value: value?.title,
      label: "Название",
      placeholder: "Введите название курса…",
      testId: "course-title",
    });

    const start = new Field({
      name: this.generateUniqueId("date-start"),
      type: "date",
      value: value?.date_start,
      label: "Дата начала",
      placeholder: "Введите дату начала обучения…",
      testId: "course-date-start",
    });

    const end = new Field({
      name: this.generateUniqueId("date-end"),
      type: "date",
      value: value?.date_end,
      label: "Дата окончания",
      placeholder: "Введите дату окончания обучения…",
      testId: "course-date-end",
    });

    const place = new Field({
      name: this.generateUniqueId("place"),
      value: value?.place,
      label: "Место работы",
      placeholder: "Введите место обучения…",
      testId: "course-place",
    });

    element.appendChild(title.element);
    element.appendChild(start.element);
    element.appendChild(end.element);
    element.appendChild(place.element);

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
