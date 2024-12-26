// @ts-check

import { addResume } from "../../utils/storage.js";
import Button from "../button.js";
import Checkbox from "../checkbox.js";

export default class CopyDialog {
  /**
   * @param {string} id
   * @param {Resume} resume
   */
  constructor(id, resume) {
    this.resume = resume;

    this.heading = document.createElement("h1");
    this.heading.textContent = "Копирование резюме";

    this.element = document.createElement("dialog");
    this.element.classList.add("flow");
    this.element.id = id;

    this.close = new Button({
      label: "Закрыть",
      variant: "secondary",
      testId: "copy-modal__cancel",
    });

    this.close.element.addEventListener("click", () => this.element.close());

    this.copy = new Button({
      label: "Скопировать",
      testId: "copy-modal__copy",
    });

    this.copy.element.addEventListener("click", this.copyResume.bind(this));

    this.personalInfoCheckbox = new Checkbox({
      label: "Личные данные (ФИО, дата рождения, город, адрес, телефон, почта)",
      name: `${id}-personal-info-checkbox`,
      testId: "copy-modal__checkbox",
    });

    this.aboutCheckbox = new Checkbox({
      label: "О себе",
      name: `${id}-about-checkbox`,
      testId: "copy-modal__checkbox",
    });

    this.interestsCheckbox = new Checkbox({
      label: "Интересы",
      name: `${id}-interests-checkbox`,
      testId: "copy-modal__checkbox",
    });

    this.languagesCheckbox = new Checkbox({
      label: "Языки",
      name: `${id}-languages-checkbox`,
      testId: "copy-modal__checkbox",
    });

    this.jobsCheckbox = new Checkbox({
      label: "Опыт работы",
      name: `${id}-jobs-checkbox`,
      testId: "copy-modal__checkbox",
    });

    this.educationCheckbox = new Checkbox({
      label: "Образование",
      name: `${id}-education-checkbox`,
      testId: "copy-modal__checkbox",
    });

    this.coursesCheckbox = new Checkbox({
      label: "Курсы",
      name: `${id}-courses-checkbox`,
      testId: "copy-modal__checkbox",
    });

    this.footer = document.createElement("div");
    this.footer.classList.add("flex-group");
    this.footer.classList.add("justify-end");

    this.footer.append(this.close.element);
    this.footer.append(this.copy.element);

    this.element.append(this.heading);
    this.element.append(this.personalInfoCheckbox.element);
    this.element.append(this.aboutCheckbox.element);
    this.element.append(this.interestsCheckbox.element);
    this.element.append(this.languagesCheckbox.element);
    this.element.append(this.jobsCheckbox.element);
    this.element.append(this.educationCheckbox.element);
    this.element.append(this.coursesCheckbox.element);
    this.element.append(this.footer);
  }

  copyResume() {
    const newResume = /** @type {Resume} */ ({});
    newResume.name = this.resume.name;

    if (this.personalInfoCheckbox.input.checked) {
      newResume.username = this.resume.username;
      newResume.birthday = this.resume.birthday;
      newResume.city = this.resume.city;
      newResume.email = this.resume.email;
      newResume.tel = this.resume.tel;
    }

    if (this.aboutCheckbox.input.checked) {
      newResume.description = this.resume.description;
    }

    if (this.interestsCheckbox.input.checked) {
      newResume.interests = this.resume.interests;
    }

    if (this.languagesCheckbox.input.checked) {
      newResume.languages = this.resume.languages;
    }

    if (this.jobsCheckbox.input.checked) {
      newResume.jobs = this.resume.jobs;
    }

    if (this.educationCheckbox.input.checked) {
      newResume.education = this.resume.education;
    }

    if (this.coursesCheckbox.input.checked) {
      newResume.courses = this.resume.courses;
    }

    const id = addResume(newResume);
    this.element.close();
    window.location.href = `/?id=${id}`;
  }
}
