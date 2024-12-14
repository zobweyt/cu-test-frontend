// @ts-check

/// <reference path="./types.js" />

import { dump } from "../../utils/form.js";
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
    this.element.classList.add("col");
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

    const data = /** @type {Resume} */ (dump(this.form.element));

    alert(JSON.stringify(data, null, 2));
    // console.debug(JSON.stringify(data, null, 2));
    // console.debug(JSON.stringify(JSON.stringify(Object.fromEntries(serialize(data).entries())), null, 2));
  }
}
