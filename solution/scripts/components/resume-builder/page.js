// @ts-check

/// <reference path="./types.js" />

import { getLocationResume } from "../../utils/storage.js";
import ResumeBuilderForm from "./form.js";
import ResumeBuilderPreview from "./preview.js";

export default class ResumeBuilderPage {
  constructor() {
    this.resume = getLocationResume();

    this.element = this.createElement();
    this.heading = this.createHeading();
    this.form = this.createForm(this.resume);

    this.setupLayout();
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("primary-layout");
    return element;
  }

  createHeading() {
    const heading = document.createElement("h1");
    heading.textContent = this.resume?.username || "Конструктор резюме";
    return heading;
  }

  /**
   * @param {Resume} [resume]
   */
  createForm(resume) {
    const form = new ResumeBuilderForm(resume);
    form.element.addEventListener("submit", this.showPreview.bind(this));
    return form;
  }

  createPreview() {
    if (this.form.resume === undefined) {
      return;
    }

    const preview = new ResumeBuilderPreview(this.form.resume);
    preview.hide.element.addEventListener("click", this.hidePreview.bind(this));
    return preview;
  }

  setupLayout() {
    this.element.append(this.heading, this.form.element);
  }

  showPreview() {
    this.preview = this.createPreview();

    if (this.preview) {
      this.form.element.replaceWith(this.preview.element);
    }
  }

  hidePreview() {
    this.preview?.element.replaceWith(this.form.element);
  }
}
