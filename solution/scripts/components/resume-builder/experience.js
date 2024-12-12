// @ts-check

/// <reference path="./types.js" />

import createField from "../field.js";
import createFieldSet from "../fieldset.js";

/**
 * @param {Job[]} [jobs]
 */
export default function createExperienceFieldSet(jobs = undefined) {
  const fieldset = createFieldSet({
    legend: "Опыт работы",
    testId: "job",
    fieldId: "jobs",
    onAppend: append,
  });

  jobs?.map(createLanguageContainer) || append();

  function append() {
    const container = createLanguageContainer({ title: "Новый опыт работы" });

    container.titleField.input.focus();
    container.titleField.input.select();
  }

  /**
   * @param {Partial<Job>} job
   */
  function createLanguageContainer(job) {
    const container = document.createElement("div");
    container.classList.add("col");

    const titleField = createField({
      name: fieldset.generateFieldName("title"),
      value: job.title,
      label: "Должность",
      placeholder: "Введите должность…",
      testId: fieldset.generateFieldTestId("title"),
    });

    const dateStartField = createField({
      name: fieldset.generateFieldName("date-start"),
      type: "date",
      value: job.date_start,
      label: "Дата начала",
      placeholder: "Введите дату начала работы…",
      testId: fieldset.generateFieldTestId("date-start"),
    });

    const dateEndField = createField({
      name: fieldset.generateFieldName("date-end"),
      type: "date",
      value: job.date_end,
      label: "Дата окончания",
      placeholder: "Введите дату окончания работы…",
      testId: fieldset.generateFieldTestId("date-end"),
    });

    const placeField = createField({
      name: fieldset.generateFieldName("place"),
      value: job.place,
      label: "Место работы",
      placeholder: "Введите место работы…",
      testId: fieldset.generateFieldTestId("place"),
    });

    const descriptionField = createField({
      name: fieldset.generateFieldName("description"),
      value: job.description,
      label: "Описание работы",
      placeholder: "Введите произвольные описание работы…",
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
