// @ts-check

import { deleteResume, getResumes } from "../../utils/storage.js";
import Button from "../button.js";
import CopyDialog from "./copy-dialog.js";

export default class ResumeListPage {
  constructor() {
    this.selectedResumeIDs = [];

    this.element = this.createElement();
    this.header = this.createHeader();
    this.ul = this.createUList();
    this.selectionMenu = this.createSelectionMenu();

    this.setupLayout();
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("primary-layout");
    return element;
  }

  createHeader() {
    const header = document.createElement("header");

    header.classList.add("flex-group");
    header.classList.add("justify-between");

    const heading = this.createHeading();
    const addResumeButton = this.createAddResumeButton();

    header.append(heading, addResumeButton.element);

    return header;
  }

  createHeading() {
    const heading = document.createElement("h1");
    heading.textContent = "Мои резюме";
    return heading;
  }

  createAddResumeButton() {
    const button = new Button({
      label: "+",
      title: "Добавить",
      variant: "bezelled-primary",
      testId: "add-resume",
    });

    button.element.addEventListener("click", () => {
      window.location.href = "/";
    });

    return button;
  }

  createUList() {
    const ul = document.createElement("ul");
    ul.classList.add("resume-list");

    const resumes = getResumes();

    const resumeEntries = Object.entries(resumes).reverse();

    for (const [id, resume] of resumeEntries) {
      const li = this.createLI(id, resume);
      ul.append(li);
    }

    return ul;
  }

  /**
   * @param {string} id
   * @param {Resume} resume
   */
  createLI(id, resume) {
    const li = document.createElement("li");
    li.classList.add("resume-list__item");
    li.setAttribute("test-id", "resume-item");

    const heading = this.createLIHeading(id, resume);
    const menu = this.createLIActionsMenu(id, resume);

    li.append(heading, menu);

    return li;
  }

  /**
   * @param {string} id
   * @param {Resume} resume
   */
  createLIHeading(id, resume) {
    const heading = document.createElement("div");
    heading.classList.add("flex-group");
    heading.classList.add("items-center");

    const checkbox = this.createLICheckbox(id);
    const h2 = this.createLITitle(resume);

    heading.append(checkbox, h2);

    return heading;
  }

  /**
   * @param {string} id
   */
  createLICheckbox(id) {
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.setAttribute("test-id", "resume-checkbox");

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        this.selectedResumeIDs.push(id);
      } else {
        const index = this.selectedResumeIDs.indexOf(id);
        if (index > -1) {
          this.selectedResumeIDs.splice(index, 1);
        }
      }

      this.updateSelectionMenu();
    });

    return checkbox;
  }

  /**
   * @param {Resume} resume
   */
  createLITitle(resume) {
    const h2 = document.createElement("h2");

    h2.setAttribute("test-id", "resume-title");
    h2.classList.add("resume-list__item__title");
    h2.innerText = resume.name || resume.username;

    return h2;
  }

  /**
   * @param {string} id
   * @param {Resume} resume
   */
  createLIActionsMenu(id, resume) {
    const root = document.createElement("div");
    root.classList.add("popover-wrapper");

    const content = this.createLIActionsMenuContent(id, resume);

    const trigger = new Button({
      label: "…",
      variant: "secondary",
      title: "Действия",
      testId: "resume-actions",
    });

    // trigger.element.setAttribute("popovertarget", this.formatMenuID(id));
    trigger.element.classList.add("resume-list__item__menu-trigger");

    trigger.element.addEventListener("click", () => {
      if (root.contains(content)) {
        content.remove();
      } else {
        root.append(content);
      }
    });

    root.append(trigger.element);

    return root;
  }

  /**
   * @param {string} id
   * @param {Resume} resume
   */
  createLIActionsMenuContent(id, resume) {
    const content = document.createElement("div");
    content.role = "menu";
    content.classList.add("popover");
    content.classList.add("resume-list__item__menu-content");
    // content.id = this.formatMenuID(id);

    const open = new Button({
      label: "Открыть",
      variant: "bezelled-primary",
      testId: "resume-actions__open",
    });

    open.element.addEventListener("click", () => {
      window.location.href = `/?id=${id}`;
    });

    const copy = new Button({
      label: "Копировать",
      variant: "secondary",
      testId: "resume-actions__copy",
    });
    const copyDialog = new CopyDialog(id, resume);

    copy.element.addEventListener("click", () => {
      copyDialog.element.showModal();
    });

    const remove = new Button({
      label: "Удалить",
      variant: "bezelled-destructive",
      testId: "resume-actions__delete",
    });

    remove.element.addEventListener("click", () => {
      deleteResume(id);
      window.location.reload();
    });

    content.append(open.element, copy.element, remove.element, copyDialog.element);

    return content;
  }

  // /**
  //  * @param {string} id
  //  */
  // formatMenuID(id) {
  //   return `menu-${id}`;
  // }

  createSelectionMenu() {
    const wrapper = document.createElement("div");

    wrapper.classList.add("flex-group");
    wrapper.classList.add("justify-between");

    const selectedText = document.createElement("span");
    selectedText.textContent = `Выбрано: ${this.selectedResumeIDs.length}`;

    const deleteResumesButton = new Button({
      label: "Удалить выбранные",
      testId: "delete-resumes",
      variant: "bezelled-destructive",
    });

    deleteResumesButton.element.addEventListener("click", () => {
      this.selectedResumeIDs.map(deleteResume);
      window.location.reload();
    });

    wrapper.append(selectedText, deleteResumesButton.element);

    return wrapper;
  }

  setupLayout() {
    this.element.append(this.header, this.ul);
  }

  updateSelectionMenu() {
    if (this.selectedResumeIDs.length) {
      const menu = this.createSelectionMenu();
      if (this.menu) {
        this.menu.replaceWith(menu);
      } else {
        this.element.append(menu);
      }
      this.menu = menu;
    } else if (this.menu) {
      this.element.removeChild(this.menu);
      this.menu = undefined;
    }
  }
}
