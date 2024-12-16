// @ts-check

/// <reference path="./types.js" />

import ResumeBuilderForm from "./form.js";

export default class ResumeBuilderPage {
  /**
   * @param {Resume} [resume]
   */
  constructor(resume) {
    this.resume = resume;

    this.element = document.createElement("div");
    this.heading = document.createElement("h1");
    this.form = new ResumeBuilderForm(resume);

    this.setup();
  }

  setup() {
    this.setupElements();
    this.setupLayout();
    this.setupEventListeners();
  }

  setupElements() {
    this.setupHeading();
    this.setupElement();
  }

  setupHeading() {
    this.heading.textContent = "Конструктор резюме";
  }

  setupElement() {
    this.element.classList.add("primary-layout");
  }

  setupLayout() {
    this.element.appendChild(this.heading);
    this.element.appendChild(this.form.element);
  }

  setupEventListeners() {
    this.form.element.addEventListener(
      "submit",
      this.generateResume.bind(this),
    );
  }

  /**
   * @param {SubmitEvent} event
   */
  generateResume(event) {
    event.preventDefault();

    alert(JSON.stringify(this.form.resume, null, 2));
    // console.debug(JSON.stringify(this.form.resume, null, 2));
    // console.debug(JSON.stringify(JSON.stringify(Object.fromEntries(serialize(this.form.resume).entries())), null, 2));
  }
}
