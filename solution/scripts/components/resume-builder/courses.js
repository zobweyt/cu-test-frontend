// @ts-check

/// <reference path="./types.js" />

import createField from "../field.js";
import createFieldSet from "../fieldset.js";

/**
 * @param {Course[]} [courses]
 */
export default function createCoursesFieldSet(courses = undefined) {
  const fieldset = createFieldSet({
    legend: "Курсы",
    testId: "course",
    fieldId: "courses",
    onAppend: append,
  });

  courses?.map(createLanguageContainer) || append();

  function append() {
    const container = createLanguageContainer({ title: "Новый курс" });

    container.titleField.input.focus();
    container.titleField.input.select();
  }

  /**
   * @param {Partial<Course>} course
   */
  function createLanguageContainer(course) {
    const container = document.createElement("div");
    container.classList.add("col");

    const titleField = createField({
      name: fieldset.generateFieldName("title"),
      value: course.title,
      label: "Должность",
      placeholder: "Введите высшее образование…",
      testId: fieldset.generateFieldTestId("title"),
    });

    const dateStartField = createField({
      name: fieldset.generateFieldName("date-start"),
      type: "date",
      value: course.date_start,
      label: "Дата начала",
      placeholder: "Введите дату начала обучения…",
      testId: fieldset.generateFieldTestId("date-start"),
    });

    const dateEndField = createField({
      name: fieldset.generateFieldName("date-end"),
      type: "date",
      value: course.date_end,
      label: "Дата окончания",
      placeholder: "Введите дату окончания обучения…",
      testId: fieldset.generateFieldTestId("date-end"),
    });

    const placeField = createField({
      name: fieldset.generateFieldName("place"),
      value: course.place,
      label: "Место обучения",
      placeholder: "Введите место обучения…",
      testId: fieldset.generateFieldTestId("place"),
    });

    container.appendChild(titleField);
    container.appendChild(dateStartField);
    container.appendChild(dateEndField);
    container.appendChild(placeField);

    fieldset.append(container);

    return Object.assign(container, {
      titleField,
      dateStartField,
      dateEndField,
      placeField,
    });
  }

  return fieldset;
}
