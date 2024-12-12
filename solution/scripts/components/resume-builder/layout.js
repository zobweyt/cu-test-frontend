// @ts-check

/// <reference path="./types.js" />

import createResumeBuilderForm from "./form.js";

/**
 * @param {Resume} [resume]
 */
export function createResumeBuilderLayout(resume = undefined) {
  const layout = document.createElement("div");
  layout.classList.add("col");

  const heading = document.createElement("h1");
  heading.textContent = "Конструктор резюме";

  const form = createResumeBuilderForm(resume);

  layout.appendChild(heading);
  layout.appendChild(form);

  return layout;
}
