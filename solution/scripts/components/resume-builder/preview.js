// @ts-check

/// <reference path="./types.js" />

import {
  addResume,
  getLocationResumeId,
  saveResumeToID,
} from "../../utils/storage.js";
import Button from "../button.js";

export default class ResumeBuilderPreview {
  /**
   * @param {Resume} resume
   */
  constructor(resume) {
    this.resume = resume;

    this.hide = new Button({
      label: "Назад",
      testId: "back-button",
      variant: "secondary",
    });

    this.save = new Button({
      label: "Сохранить",
      testId: "save-button",
    });

    this.personalDescriptionContainer = document.createElement("div");
    this.personalDescriptionContainer.setAttribute(
      "test-id",
      "resume-main-section",
    );
    this.personalDescriptionContainer.classList.add("personal-description");

    this.element = document.createElement("div");
    this.preview = document.createElement("div");
    this.footer = document.createElement("div");
    this.footer.classList.add("flex-group");
    this.footer.classList.add("justify-between");

    this.firstMainInfo = document.createElement("article");
    this.firstMainInfo.classList.add("first-main-info");
    this.firstMainInfo.setAttribute("test-id", "resume-main-article");

    this.avatar = document.createElement("img");
    this.avatar.src = "/assets/avatar.jpg";
    this.avatar.classList.add("profile-image");

    this.firstMainSection = document.createElement("section");
    this.firstMainSection.setAttribute("test-id", "resume-main-section");
    this.firstMainSectionHeading = document.createElement("h2");
    this.firstMainSectionHeading.textContent = "Личные данные";
    this.firstMainSectionHeading.classList.add("first-main-info__heading");
    this.firstMainSectionDivider = document.createElement("hr");

    this.usernameContainer = document.createElement("div");
    // this.usernameContainer.setAttribute("test-id", "resume-main-section");
    this.usernameContainer.classList.add("personal-info__section");
    this.usernameHeading = document.createElement("h3");
    this.usernameHeading.textContent = "ФИО";
    this.usernameHeading.classList.add("first-main-info__bold");
    this.username = document.createElement("span");
    this.username.textContent = this.resume.username;
    this.username.classList.add("first-main-info__p");
    this.usernameContainer.appendChild(this.usernameHeading);
    this.usernameContainer.appendChild(this.username);

    this.birthdayContainer = document.createElement("div");
    // this.birthdayContainer.setAttribute("test-id", "resume-main-section");
    this.birthdayContainer.classList.add("personal-info__section");
    this.birthdayHeading = document.createElement("h3");
    this.birthdayHeading.textContent = "Дата рождения";
    this.birthdayHeading.classList.add("first-main-info__bold");
    this.birthday = document.createElement("span");
    this.birthday.textContent = this.resume.birthday
      ? Intl.DateTimeFormat("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(Date.parse(this.resume.birthday || ""))
      : "";

    this.birthday.classList.add("first-main-info__p");

    if (this.resume.birthday) {
      this.birthdayContainer.appendChild(this.birthdayHeading);
      this.birthdayContainer.appendChild(this.birthday);
    }

    this.cityContainer = document.createElement("div");
    // this.cityContainer.setAttribute("test-id", "resume-main-section");
    this.cityContainer.classList.add("personal-info__section");
    this.cityHeading = document.createElement("h3");
    this.cityHeading.textContent = "Город";
    this.cityHeading.classList.add("first-main-info__bold");
    this.city = document.createElement("span");
    this.city.textContent = this.resume.city || "";
    this.city.classList.add("first-main-info__p");
    if (this.resume.city) {
      this.cityContainer.appendChild(this.cityHeading);
      this.cityContainer.appendChild(this.city);
    }

    this.telContainer = document.createElement("div");
    // this.telContainer.setAttribute("test-id", "resume-main-section");
    this.telContainer.classList.add("personal-info__section");
    this.telHeading = document.createElement("h3");
    this.telHeading.textContent = "Номер телефона";
    this.telHeading.classList.add("first-main-info__bold");
    this.tel = document.createElement("span");
    this.tel.textContent = this.resume.tel || "";
    this.tel.classList.add("first-main-info__p");
    if (this.resume.tel) {
      this.telContainer.appendChild(this.telHeading);
      this.telContainer.appendChild(this.tel);
    }

    this.emailContainer = document.createElement("div");
    // this.emailContainer.setAttribute("test-id", "resume-main-section");
    this.emailContainer.classList.add("personal-info__section");
    this.emailHeading = document.createElement("h3");
    this.emailHeading.textContent = "Email";
    this.emailHeading.classList.add("first-main-info__bold");
    this.email = document.createElement("span");
    this.email.textContent = this.resume.email || "";
    this.email.classList.add("first-main-info__p");
    if (this.resume.email) {
      this.emailContainer.appendChild(this.emailHeading);
      this.emailContainer.appendChild(this.email);
    }

    if (this.resume.interests?.filter(Boolean)?.length) {
      this.interestsContainer = document.createElement("section");
      this.interestsContainer.setAttribute("test-id", "resume-main-section");
      this.interestsHeading = document.createElement("h2");
      this.interestsHeading.classList.add("first-main-info__heading");
      this.interestsHeading.textContent = "Интересы";
      this.interestsContainerDivider = document.createElement("hr");
      this.interestsUList = document.createElement("ul");
      this.interestsUList.classList.add("first-main-info__ul");

      this.resume.interests?.filter(Boolean).forEach((interest) => {
        const li = document.createElement("li");
        li.textContent = interest;
        li.classList.add("first-main-info__bold");
        this.interestsUList && this.interestsUList.appendChild(li);
      });

      this.interestsContainer.appendChild(this.interestsHeading);
      this.interestsContainer.appendChild(this.interestsContainerDivider);
      this.interestsContainer.appendChild(this.interestsUList);
    }

    const langs = this.resume.languages?.filter((l) => l.name && l.level);
    if (langs?.length) {
      this.languagesContainer = document.createElement("div");
      this.languagesContainer.setAttribute("test-id", "resume-main-section");
      this.languagesHeading = document.createElement("h2");
      this.languagesHeading.classList.add("first-main-info__heading");
      this.languagesHeading.textContent = "Языки";
      this.languagesContainerDivider = document.createElement("hr");
      this.languagesUList = document.createElement("ul");
      this.languagesUList.classList.add("first-main-info__ul");

      langs.forEach((language) => {
        const li = document.createElement("li");
        li.classList.add("flex-group");
        li.classList.add("justify-between");
        const nameSpan = document.createElement("span");
        nameSpan.textContent = language.name;
        nameSpan.classList.add("first-main-info__bold");
        li.appendChild(nameSpan);
        const levelSpan = document.createElement("span");
        levelSpan.textContent = language.level;
        levelSpan.classList.add("first-main-info__p");
        li.appendChild(levelSpan);
        this.languagesUList && this.languagesUList.appendChild(li);
      });

      this.languagesContainer.appendChild(this.languagesHeading);
      this.languagesContainer.appendChild(this.languagesContainerDivider);
      this.languagesContainer.appendChild(this.languagesUList);
    }

    this.secondMainInfo = document.createElement("article");
    this.secondMainInfo.classList.add("second-main-info");
    this.secondMainInfoheading = document.createElement("h2");
    this.secondMainInfoheading.textContent = this.resume.username;
    this.secondMainInfoDivider = document.createElement("hr");
    this.description = document.createElement("p");
    this.description.innerText = this.resume.description ?? "";
    this.description.classList.add("second-main-info__description");

    this.secondMainInfo.setAttribute("test-id", "resume-main-article");

    this.personalDescriptionContainer.append(this.secondMainInfoheading);
    this.personalDescriptionContainer.append(this.secondMainInfoDivider);
    this.personalDescriptionContainer.append(this.description);
    this.secondMainInfo.append(this.personalDescriptionContainer);

    const jbs = this.resume.jobs
      ?.filter((j) => j.title)
      .sort((a, b) => Date.parse(b.date_start) - Date.parse(a.date_start));

    if (jbs?.length) {
      this.jobsContainer = document.createElement("div");
      this.jobsContainer.setAttribute("test-id", "resume-main-section");
      this.jobsHeading = document.createElement("h3");
      this.jobsHeading.textContent = "Опыт работы";
      this.jobsContainerDivider = document.createElement("hr");
      this.jobsUList = document.createElement("ul");
      jbs.forEach((job) => {
        const li = document.createElement("li");
        li.classList.add("flow");
        li.classList.add("job-list-item");
        const titleWrapper = document.createElement("div");
        titleWrapper.classList.add("flex-group");
        titleWrapper.classList.add("justify-between");
        const titleSpan = document.createElement("span");
        titleSpan.classList.add("item-title");
        titleSpan.textContent = job.title;
        titleWrapper.appendChild(titleSpan);
        if (job.date_start) {
          const datesSpan = document.createElement("span");
          datesSpan.classList.add("item-dates");
          const start = job.date_start
            ? Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              }).format(Date.parse(job.date_start))
            : "";
          const end = job.date_end
            ? Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              }).format(Date.parse(job.date_end))
            : "наст. время";
          datesSpan.textContent = `${start} — ${end}`;
          titleWrapper.appendChild(datesSpan);
        }
        li.appendChild(titleWrapper);
        const placeSpan = document.createElement("p");
        placeSpan.classList.add("place");
        placeSpan.textContent = job.place;

        li.appendChild(placeSpan);
        const descriptionSpan = document.createElement("p");
        descriptionSpan.innerText = job.description;
        descriptionSpan.classList.add("description");
        li.appendChild(descriptionSpan);
        this.jobsUList && this.jobsUList.appendChild(li);
      });
      this.jobsContainer.appendChild(this.jobsHeading);
      this.jobsContainer.appendChild(this.jobsContainerDivider);
      this.jobsContainer.appendChild(this.jobsUList);
      this.secondMainInfo.append(this.jobsContainer);
    }

    const eds = this.resume.education
      ?.filter((e) => e.title)
      .sort((a, b) => Date.parse(b.date_start) - Date.parse(a.date_start));

    if (eds?.length) {
      this.educationContainer = document.createElement("div");
      this.educationContainer.setAttribute("test-id", "resume-main-section");
      this.educationHeading = document.createElement("h3");
      this.educationHeading.textContent = "Образование и квалификация";
      this.educationContainerDivider = document.createElement("hr");
      this.educationUList = document.createElement("ul");
      eds.forEach((education) => {
        const li = document.createElement("li");
        li.classList.add("flow");
        const titleWrapper = document.createElement("div");
        titleWrapper.classList.add("flex-group");
        titleWrapper.classList.add("justify-between");
        const titleSpan = document.createElement("span");
        titleSpan.classList.add("item-title");
        titleSpan.textContent = education.title;
        titleWrapper.appendChild(titleSpan);
        if (education.date_start) {
          const datesSpan = document.createElement("span");
          datesSpan.classList.add("item-dates");
          const start = education.date_start
            ? Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              }).format(Date.parse(education.date_start))
            : "";
          const end = education.date_end
            ? Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              }).format(Date.parse(education.date_end))
            : "наст. время";
          datesSpan.textContent = `${start} — ${end}`;
          titleWrapper.appendChild(datesSpan);
        }
        li.appendChild(titleWrapper);
        const placeSpan = document.createElement("p");
        placeSpan.textContent = education.place;
        placeSpan.classList.add("place");

        li.appendChild(placeSpan);
        const descriptionSpan = document.createElement("p");
        descriptionSpan.innerText = education.description;
        descriptionSpan.classList.add("description");
        li.appendChild(descriptionSpan);
        this.educationUList && this.educationUList.appendChild(li);
      });
      this.educationContainer.appendChild(this.educationHeading);
      this.educationContainer.appendChild(this.educationContainerDivider);
      this.educationContainer.appendChild(this.educationUList);
      this.secondMainInfo.append(this.educationContainer);
    }

    const crs = this.resume.courses
      ?.filter((e) => e.title)
      .sort((a, b) => Date.parse(b.date_start) - Date.parse(a.date_start));

    if (crs?.length) {
      this.coursesContainer = document.createElement("div");
      this.coursesContainer.setAttribute("test-id", "resume-main-section");
      this.coursesHeading = document.createElement("h3");
      this.coursesHeading.textContent = "Курсы";
      this.coursesContainerDivider = document.createElement("hr");
      this.coursesUList = document.createElement("ul");
      crs.forEach((course) => {
        const li = document.createElement("li");
        li.classList.add("flow");
        li.classList.add("course-item");
        const titleWrapper = document.createElement("div");
        titleWrapper.classList.add("flex-group");
        titleWrapper.classList.add("justify-between");
        const titleSpan = document.createElement("span");
        titleSpan.classList.add("item-title");
        titleSpan.textContent = course.title;
        titleWrapper.appendChild(titleSpan);
        if (course.date_start) {
          const datesSpan = document.createElement("span");
          datesSpan.classList.add("item-dates");
          const start = course.date_start
            ? Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              }).format(Date.parse(course.date_start))
            : "";
          const end = course.date_end
            ? Intl.DateTimeFormat("ru-RU", {
                month: "long",
                year: "numeric",
              }).format(Date.parse(course.date_end))
            : "наст. время";
          datesSpan.textContent = `${start} — ${end}`;
          titleWrapper.appendChild(datesSpan);
        }
        li.appendChild(titleWrapper);
        const placeSpan = document.createElement("p");
        placeSpan.textContent = course.place;
        placeSpan.classList.add("place");

        li.appendChild(placeSpan);
        this.coursesUList && this.coursesUList.appendChild(li);
      });
      this.coursesContainer.appendChild(this.coursesHeading);
      this.coursesContainer.appendChild(this.coursesContainerDivider);
      this.coursesContainer.appendChild(this.coursesUList);

      this.secondMainInfo.append(this.coursesContainer);
    }

    this.setup();
  }

  setup() {
    this.setupElements();
    this.setupLayout();
  }

  setupElements() {
    this.setupElement();
    this.setupPreview();
  }

  setupElement() {
    this.element.classList.add("flow");
  }

  setupPreview() {
    this.preview.classList.add("resume-main-content");
    this.preview.setAttribute("test-id", "resume-main-content");
  }

  setupLayout() {
    this.firstMainSection.appendChild(this.firstMainSectionHeading);
    this.firstMainSection.appendChild(this.firstMainSectionDivider);
    this.firstMainSection.appendChild(this.usernameContainer);
    this.firstMainSection.appendChild(this.birthdayContainer);
    this.firstMainSection.appendChild(this.cityContainer);
    this.firstMainSection.appendChild(this.telContainer);
    this.firstMainSection.appendChild(this.emailContainer);
    this.firstMainInfo.appendChild(this.avatar);
    this.firstMainInfo.appendChild(this.firstMainSection);
    this.interestsContainer &&
      this.firstMainInfo.appendChild(this.interestsContainer);
    this.languagesContainer &&
      this.firstMainInfo.appendChild(this.languagesContainer);
    this.preview.appendChild(this.firstMainInfo);
    this.preview.appendChild(this.secondMainInfo);
    this.element.appendChild(this.preview);
    this.footer.appendChild(this.hide.element);
    this.footer.appendChild(this.save.element);
    this.element.appendChild(this.footer);

    this.save.element.addEventListener(
      "click",
      this.saveResumeToLocalStorage.bind(this),
    );
  }

  /**
   *
   * @param {MouseEvent} event
   */
  saveResumeToLocalStorage(event) {
    event.preventDefault();

    const id = getLocationResumeId();

    if (id) {
      saveResumeToID(id, this.resume);
    } else {
      addResume(this.resume);
    }

    window.location.href = "/all";
  }
}
