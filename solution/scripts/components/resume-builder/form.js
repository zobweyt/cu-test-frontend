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
    this.resume = resume;

    this.element = document.createElement("form");

    this.name = new Field({
      name: "name",
      value: resume?.name,
      placeholder: "Введите название резюме…",
      autofocus: true,
    });

    this.personal = new PersonalFieldset(resume);

    this.description = new Field({
      name: "description",
      value: resume?.description,
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
    });

    this.setup();
  }

  setup() {
    this.setupElements();
    this.setupLayout();
    this.setupEventListeners();

    this.name.input.focus();
    this.name.input.select();

    requestAnimationFrame(() => {
      this.updateSubmitButtonDisabled();
    });
  }

  setupElements() {
    this.setupFooter();
    this.setupElement();
  }

  setupFooter() {
    // this.footer.classList.add("full-width");
    this.footer.classList.add("flex-group");
    this.footer.classList.add("justify-end");
  }

  setupElement() {
    this.element.classList.add("flow");
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
      this.updateSubmitButtonDisabled.bind(this),
    );
    this.element.addEventListener(
      "input",
      this.updateSubmitButtonDisabled.bind(this),
    );
    this.element.addEventListener(
      "change",
      this.updateSubmitButtonDisabled.bind(this),
    );
    this.element.addEventListener(
      "submit",
      this.handleResumeSubmitEvent.bind(this),
    );
  }

  updateSubmitButtonDisabled() {
    requestAnimationFrame(() => {
      this.submit.element.disabled = !this.element.checkValidity();
    });
  }

  /**
   * @param {SubmitEvent} event
   */
  handleResumeSubmitEvent(event) {
    event.preventDefault();

    this.resume = /** @type {Resume} */ (dump(this.element));
  }
}
