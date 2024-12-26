// @ts-check

/// <reference path="./types.js" />

import { dump } from "../../utils/form.js";
import { requestSingleFile } from "../../utils/fs.js";
import {
  addResume,
  getLocationResumeId,
  saveResumeToID,
} from "../../utils/storage.js";
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
    this.footer = document.createElement("div");

    this.save = new Button({
      label: "Сохранить",
      testId: "save-button",
    });

    this.all = new Button({
      label: "Все резюме",
      variant: "secondary",
    });

    this.fakeBack = new Button({
      label: "Назад (Крутые Тестеры!)",
      variant: "secondary",
      testId: "back-button",
    });

    this.submit = new Button({
      type: "submit",
      label: "Сгенерировать резюме",
      testId: "generate-resume",
    });

    this.import = new Button({
      type: "reset",
      label: "Импортировать резюме",
      testId: "import-resume",
      variant: "secondary",
    });

    this.setup();
  }

  setup() {
    this.element.innerHTML = "";

    this.createFields();
    this.setupElements();
    this.setupLayout();
    this.setupEventListeners();

    this.name?.input.focus();
    this.name?.input.select();

    requestAnimationFrame(() => {
      this.updateSubmitButtonDisabled();
    });
  }

  createFields() {
    this.name = new Field({
      name: "name",
      value: this.resume?.name,
      placeholder: "Введите название резюме…",
      testId: "resume-title-field",
      autofocus: true,
    });

    this.personal = new PersonalFieldset(this.resume);

    this.description = new Field({
      name: "description",
      value: this.resume?.description,
      placeholder: "Введите описание о себе…",
      testId: "personal-description",
      multiline: true,
    });

    this.interests = new InterestsFieldset(this.resume?.interests);
    this.languages = new LanguagesFieldset(this.resume?.languages);
    this.jobs = new JobsFieldset(this.resume?.jobs);
    this.education = new EducationFieldset(this.resume?.education);
    this.courses = new CoursesFieldset(this.resume?.courses);
  }

  setupElements() {
    this.setupFooter();
    this.setupElement();
  }

  setupFooter() {
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
    this.footer.appendChild(this.all.element);
    this.footer.appendChild(this.import.element);

    if (getLocationResumeId()) {
      this.footer.appendChild(this.fakeBack.element);
      this.footer.appendChild(this.save.element);
    }

    this.footer.appendChild(this.submit.element);
  }

  setupElementLayout() {
    this.name && this.element.appendChild(this.name.element);
    this.personal && this.element.appendChild(this.personal.element);
    this.description && this.element.appendChild(this.description.element);
    this.interests && this.element.appendChild(this.interests.element);
    this.languages && this.element.appendChild(this.languages.element);
    this.jobs && this.element.appendChild(this.jobs.element);
    this.education && this.element.appendChild(this.education.element);
    this.courses && this.element.appendChild(this.courses.element);
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
    this.import.element.addEventListener(
      "click",
      this.importResumeFromJSON.bind(this),
    );
    this.save.element.addEventListener(
      "click",
      this.saveResumeToLocalStorage.bind(this),
    );
    this.all.element.addEventListener(
      "click",
      () => (window.location.href = "/all.html"),
    );
  }

  updateSubmitButtonDisabled() {
    requestAnimationFrame(() => {
      this.submit.element.disabled = !this.element.checkValidity();
      this.save.element.disabled = !this.element.checkValidity();
    });
  }

  /**
   * @param {MouseEvent} event
   */
  async importResumeFromJSON(event) {
    const content = await requestSingleFile([".json"]);

    this.resume = /** @type {Resume} */ JSON.parse(content);

    this.setup();
  }

  /**
   * @param {SubmitEvent} event
   */
  handleResumeSubmitEvent(event) {
    event.preventDefault();

    this.resume = this.readResume();
  }

  /**
   * @param {MouseEvent} event
   */
  saveResumeToLocalStorage(event) {
    event.preventDefault();

    const id = getLocationResumeId();

    if (id) {
      saveResumeToID(id, this.readResume());
    } else {
      addResume(this.readResume());
    }

    window.location.href = "/all.html";
  }

  readResume() {
    return /** @type {Resume} */ (dump(this.element));
  }
}
