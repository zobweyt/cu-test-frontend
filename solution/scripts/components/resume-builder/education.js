// @ts-check

/// <reference path="./types.js" />

import createField from "../field.js";
import createFieldSet from "../fieldset.js";

/**
 * @param {Education[]} [education]
 */
export default function createEducationFieldSet(education = undefined) {
  const fieldset = createFieldSet({
    legend: "Образование и квалификация",
    testId: "education",
    fieldId: "education",
    onAppend: append,
  });

  education?.map(createLanguageContainer) || append();

  function append() {
    const container = createLanguageContainer({ title: "Новое образование" });

    container.titleField.input.focus();
    container.titleField.input.select();
  }

  /**
   * @param {Partial<Education>} education
   */
  function createLanguageContainer(education) {
    const container = document.createElement("div");
    container.classList.add("col");

    const titleField = createField({
      name: fieldset.generateFieldName("title"),
      value: education.title,
      label: "Должность",
      placeholder: "Введите высшее образование…",
      testId: fieldset.generateFieldTestId("title"),
    });

    const dateStartField = createField({
      name: fieldset.generateFieldName("date-start"),
      type: "date",
      value: education.date_start,
      label: "Дата начала",
      placeholder: "Введите дату начала обучения…",
      testId: fieldset.generateFieldTestId("date-start"),
    });

    const dateEndField = createField({
      name: fieldset.generateFieldName("date-end"),
      type: "date",
      value: education.date_end,
      label: "Дата окончания",
      placeholder: "Введите дату окончания обучения…",
      testId: fieldset.generateFieldTestId("date-end"),
    });

    const placeField = createField({
      name: fieldset.generateFieldName("place"),
      value: education.place,
      label: "Место обучения",
      placeholder: "Введите место обучения…",
      testId: fieldset.generateFieldTestId("place"),
    });

    const descriptionField = createField({
      name: fieldset.generateFieldName("description"),
      value: education.description,
      label: "Описание обучения",
      placeholder: "Введите произвольные описание места обучения…",
      testId: fieldset.generateFieldTestId("description"),
      multiline: true,
    });

    container.appendChild(titleField);
    container.appendChild(dateStartField);
    container.appendChild(dateEndField);
    container.appendChild(placeField);
    container.appendChild(descriptionField);

    fieldset.append(container);

    return Object.assign(container, {
      titleField,
      dateStartField,
      dateEndField,
      placeField,
      descriptionField,
    });
  }

  return fieldset;
}
