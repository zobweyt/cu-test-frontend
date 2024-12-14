// @ts-check

/// <reference path="./types.js" />

import { dump } from "../../utils/form.js";
import Button from "../button.js";
import Field from "../field.js";
import CoursesFieldset from "./fields/courses.js";
import EducationFieldset from "./fields/education.js";
import InterestsFieldset from "./fields/interests.js";
import JobsFieldset from "./fields/jobs.js";
import LanguagesFieldset from "./fields/languages.js";
import PersonalFieldset from "./fields/personal.js";

export default class ResumeBuilderForm {
  /**
   * @param {Resume} [resume]
   */
  constructor(resume) {
    this.element = document.createElement("form");

    this.name = new Field({
      name: "name",
      value: resume?.name ?? "Новое резюме",
      label: "Название формы:",
      placeholder: "Введите название формы…",
      autofocus: true,
    });

    this.personal = new PersonalFieldset(resume);

    this.description = new Field({
      name: "description",
      value: resume?.description,
      label: "Описание:",
      placeholder: "Введите описание о себе…",
      testId: "personal-description",
      multiline: true,
    });

    this.interests = new InterestsFieldset(resume?.interests);
    this.languages = new LanguagesFieldset(resume?.languages);
    this.jobs = new JobsFieldset(resume?.jobs);
    this.education = new EducationFieldset(resume?.education);
    this.courses = new CoursesFieldset(resume?.courses);

    this.footer = document.createElement("div");

    this.submit = new Button({
      type: "submit",
      label: "Сгенерировать резюме",
      testId: "generate-resume",
      disabled: true,
    });

    this.setup();
  }

  setup() {
    this.setupElements();
    this.setupLayout();
    this.setupEventListeners();

    this.name.input.focus();
    this.name.input.select();
  }

  setupElements() {
    this.setupFooter();
    this.setupElement();
  }

  setupFooter() {
    this.footer.classList.add("row");
  }

  setupElement() {
    this.element.classList.add("col");
    this.element.setAttribute("test-id", "resume-builder");
  }

  setupLayout() {
    this.setupFooterLayout();
    this.setupElementLayout();
  }
  setupFooterLayout() {
    this.footer.appendChild(this.submit.element);
  }

  setupElementLayout() {
    this.element.appendChild(this.name.element);
    this.element.appendChild(this.personal.element);
    this.element.appendChild(this.description.element);
    this.element.appendChild(this.interests.element);
    this.element.appendChild(this.languages.element);
    this.element.appendChild(this.jobs.element);
    this.element.appendChild(this.education.element);
    this.element.appendChild(this.courses.element);
    this.element.appendChild(this.footer);
  }

  setupEventListeners() {
    this.element.addEventListener(
      "reset",
      this.updateSubmitButtonState.bind(this),
    );
    this.element.addEventListener(
      "input",
      this.updateSubmitButtonState.bind(this),
    );
    this.element.addEventListener(
      "change",
      this.updateSubmitButtonState.bind(this),
    );
    this.element.addEventListener("submit", this.generateResume.bind(this));
  }

  updateSubmitButtonState() {
    requestAnimationFrame(() => {
      this.submit.element.disabled = !this.element.checkValidity();
    });
  }

  /**
   * @param {SubmitEvent} event
   */
  generateResume(event) {
    event.preventDefault();

    const data = /** @type {Resume} */ (dump(this.element));

    alert(JSON.stringify(data, null, 2));
    // console.debug(JSON.stringify(data, null, 2));
    // console.debug(JSON.stringify(JSON.stringify(Object.fromEntries(serialize(data).entries())), null, 2));
  }
}
