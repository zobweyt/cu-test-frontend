// @ts-check

/// <reference path="./types.js" />

import { dump, serialize } from "../../utils/form.js";
import createButton from "../button.js";
import createField from "../field.js";
import createCoursesFieldSet from "./courses.js";
import createEducationFieldSet from "./education.js";
import createExperienceFieldSet from "./experience.js";
import createInterestsFieldSet from "./interests.js";
import createLanguagesFieldSet from "./languages.js";

/**
 * @param {string} [value] 
 */
export function createResumeNameField(value = "Новое резюме") {
  return createField({
    name: "name",
    value: value,
    label: "Название формы:",
    placeholder: "Введите название формы…",
    autofocus: true,
  });
}

/**
 * @param {string} [value] 
 */
export function createDescriptionField(value = undefined) {
  return createField({
    name: "description",
    value: value,
    label: "Описание:",
    placeholder: "Введите описание о себе…",
    testId: "personal-description",
    multiline: true,
  })
}

/**
 * @param {string} [value] 
 */
export function createUsernameField(value = undefined) {
  return createField({
    name: "username",
    value: value,
    label: "ФИО:",
    placeholder: "Введите своё ФИО…",
    testId: "personal-info",
    required: true,
  });
}

/**
 * @param {string} [value] 
 */
export function createBirthdayField(value = undefined) {
  return createField({
    name: "birthday",
    type: "date",
    value: value,
    label: "Дата рождения:",
    placeholder: "Введите свою дату рождения…",
    testId: "personal-info",
  });
}

/**
 * @param {string} [value] 
 */
export function createCityField(value = undefined) {
  return createField({
    name: "city",
    value: value,
    label: "Город:",
    placeholder: "Введите свой город проживания…",
    testId: "personal-info",
  });
}

/**
 * @param {string} [value] 
 */
export function createPhoneField(value = undefined) {
  return createField({
    name: "tel",
    type: "tel",
    value: value,
    label: "Номер телефона:",
    placeholder: "Введите свой номер телефона…",
    testId: "personal-info",
  });
}

/**
 * @param {string} [value] 
 */
export function createEmailField(value = undefined) {
  return createField({
    name: "email",
    type: "email",
    value: value,
    label: "Email:",
    placeholder: "Введите свой email…",
    testId: "personal-info",
  });
}

/**
 * @param {HTMLFormElement} form
 */
export function createResumeBuilderFormFooter(form) {
  const footer = document.createElement("div");
  footer.classList.add("row");

  const submit = createButton({
    type: "submit",
    label: "Сгенерировать резюме",
    testId: "generate-resume",
    disabled: !form.checkValidity(),
  });

  const reset = createButton({
    type: "reset",
    label: "Сбросить",
  });

  footer.appendChild(submit);
  footer.appendChild(reset);

  form.addEventListener("reset", updateSubmitState);
  form.addEventListener("input", updateSubmitState);
  form.addEventListener("change", updateSubmitState);

  function updateSubmitState() {
    requestAnimationFrame(() => {
      submit.disabled = !form.checkValidity();
    });
  }

  return Object.assign(footer, {
    submit,
    reset,
  })
}

/**
 * @param {Resume} [resume]
 */
export default function createResumeBuilderForm(resume = undefined) {
  /**
   * @param {SubmitEvent} event
   */
  function generateResume(event) {
    event.preventDefault();

    const data = /** @type {Resume} */ (dump(form));

    alert(JSON.stringify(data, null, 2));
    // console.debug(JSON.stringify(data, null, 2));
    // console.debug(JSON.stringify(JSON.stringify(Object.fromEntries(serialize(data).entries())), null, 2));
  }

  const form = document.createElement("form");
  form.classList.add("col");
  form.setAttribute("test-id", "resume-builder");

  form.appendChild(createResumeNameField(resume?.name));
  form.appendChild(createUsernameField(resume?.username));
  form.appendChild(createBirthdayField(resume?.birthday));
  form.appendChild(createCityField(resume?.city));
  form.appendChild(createPhoneField(resume?.tel));
  form.appendChild(createEmailField(resume?.email));
  form.appendChild(createDescriptionField(resume?.description));
  form.appendChild(createInterestsFieldSet(resume?.interests));
  form.appendChild(createLanguagesFieldSet(resume?.languages));
  form.appendChild(createExperienceFieldSet(resume?.jobs));
  form.appendChild(createEducationFieldSet(resume?.education));
  form.appendChild(createCoursesFieldSet(resume?.courses));
  form.appendChild(createResumeBuilderFormFooter(form));

  form.addEventListener("submit", generateResume);

  return form;
}
