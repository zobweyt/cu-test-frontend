// @ts-check

/// <reference path="./types.js" />

import createField from "../field.js";
import createFieldSet from "../fieldset.js";

/**
 * @param {Language[]} [languages]
 */
export default function createLanguagesFieldSet(languages = undefined) {
  const fieldset = createFieldSet({
    legend: "Языки",
    testId: "language",
    fieldId: "languages",
    onAppend: append,
  });

  languages?.map(createLanguageContainer) || append();

  function append() {
    const container = createLanguageContainer({ name: "Новый язык" });

    container.nameField.input.focus();
    container.nameField.input.select();
  }

  /**
   * @param {Partial<Language>} language
   */
  function createLanguageContainer(language) {
    const container = document.createElement("div");
    container.classList.add("col");

    const nameField = createField({
      name: fieldset.generateFieldName("name"),
      value: language.name,
      label: "Название",
      placeholder: "Введите название языка…",
      testId: fieldset.generateFieldTestId("name"),
    });

    const levelField = createField({
      name: fieldset.generateFieldName("level"),
      value: language.level,
      label: "Уровень",
      placeholder: "Введите уровень владения языком…",
      testId: fieldset.generateFieldTestId("level"),
    });

    container.appendChild(nameField);
    container.appendChild(levelField);

    fieldset.append(container);

    return Object.assign(container, {
      nameField,
      levelField,
    });
  }

  return fieldset;
}
