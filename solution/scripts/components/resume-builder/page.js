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
  }

  setupElements() {
    this.setupHeading();
    this.setupElement();
  }

  setupHeading() {
    this.heading.textContent = "Конструктор резюме";
  }

  setupElement() {
    this.element.classList.add("col");
  }

  setupLayout() {
    this.element.appendChild(this.heading);
    this.element.appendChild(this.form.element);
  }
}
