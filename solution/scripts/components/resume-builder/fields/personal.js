// @ts-check

/// <reference path="./../types.js" />

import Field from "../../field.js";

export default class PersonalFieldset {
  /**
   * @param {Resume} [resume]
   */
  constructor(resume) {
    this.element = document.createElement("div");
    this.element.classList.add("flow");

    this.username = new Field({
      name: "username",
      value: resume?.username,
      placeholder: "Введите своё ФИО…",
      testId: "personal-info",
      required: true,
    });

    this.birthday = new Field({
      name: "birthday",
      type: "date",
      value: resume?.birthday,
      placeholder: "Введите свою дату рождения…",
      testId: "personal-info",
    });

    this.city = new Field({
      name: "city",
      value: resume?.city,
      placeholder: "Введите свой город проживания…",
      testId: "personal-info",
    });

    this.tel = new Field({
      name: "tel",
      type: "tel",
      value: resume?.tel,
      placeholder: "Введите свой номер телефона…",
      testId: "personal-info",
    });

    this.email = new Field({
      name: "email",
      type: "email",
      value: resume?.email,
      placeholder: "Введите свой email…",
      testId: "personal-info",
    });

    this.setup();
  }

  setup() {
    this.setupLayout();
  }

  setupLayout() {
    this.element.appendChild(this.username.element);
    this.element.appendChild(this.birthday.element);
    this.element.appendChild(this.city.element);
    this.element.appendChild(this.tel.element);
    this.element.appendChild(this.email.element);
  }
}
