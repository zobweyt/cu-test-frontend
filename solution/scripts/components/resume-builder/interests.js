// @ts-check

/// <reference path="./types.js" />

import createField from "../field.js";
import createFieldSet from "../fieldset.js";

/**
 * @param {Array<string>} [interests] 
 */
export default function createInterestsFieldSet(interests = undefined) {
  const fieldset = createFieldSet({
    legend: "Интересы",
    testId: "interest",
    fieldId: "interests",
    onAppend: append,
  });

  interests?.map(createInterestField) || append();

  function append() {
    const field = createInterestField("Новый интерес");

    field.input.focus();
    field.input.select();
  }

  /**
   * @param {string} value
   */
  function createInterestField(value) {
    const field = createField({
      name: fieldset.generateFieldName(),
      value: value,
      label: "Название",
      placeholder: "Введите свой интерес…",
      testId: fieldset.generateFieldTestId(),
    });

    fieldset.append(field);

    return field;
  }

  return fieldset;
}
