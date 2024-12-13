// @ts-check

import Button from "./button.js";

/**
 * @template T
 * @typedef {Object} FieldsetProps
 * @property {string} [id]
 * @property {string} [label]
 * @property {T[]} [options]
 */

/**
 * @template T
 */
export default class Fieldset {
  /**
   * @param {FieldsetProps<T>} [props]
   */
  constructor(props) {
    this.props = props;

    this.element = document.createElement("fieldset");
    this.legend = document.createElement("legend");
    this.controls = document.createElement("div");
    this.addButton = new Button({ label: "Добавить" });
    this.removeButton = new Button({ label: "Удалить" });
    this.ul = document.createElement("ul");

    this.setup();
  }

  setup() {
    this.setupElements();
    this.setupLayout();
    this.setupEventListeners();

    requestAnimationFrame(() => {
      this.reset();
    })

    requestAnimationFrame(() => {
      this.initialized = true;
    })
  }

  setupElements() {
    this.setupElement();
    this.setupLegend();
    this.setupControls();
    this.setupUList();
  }

  setupElement() {
    this.element.className = "col";
  }

  setupLegend() {
    if (this.props?.label) {
      this.legend.textContent = this.props?.label;
    }
  }

  setupUList() {
    this.ul.className = "col";
  }

  setupControls() {
    this.controls.className = "row";
  }

  setupLayout() {
    this.setupControlsLayout();
    this.setupFieldsetLayout();
  }

  setupControlsLayout() {
    this.controls.appendChild(this.addButton.element);
    this.controls.appendChild(this.removeButton.element);
  }

  setupFieldsetLayout() {
    this.element.appendChild(this.legend);
    this.element.appendChild(this.controls);
    this.element.appendChild(this.ul);
  }

  setupEventListeners() {
    this.addButton.element.addEventListener("click", this.add.bind(this));
    this.removeButton.element.addEventListener("click", this.remove.bind(this));
    this.element.form?.addEventListener("reset", this.reset.bind(this));
  }

  add() {
    const element = this.createElement();

    this.appendLIElement(element);
  }

  /**
   * @param {HTMLElement} child 
   */
  appendLIElement(child) {
    const li = this.createLIElement(child);

    this.ul.appendChild(li);
    this.updateRemoveButtonDisabled();
  }

  /**
   * @param {HTMLElement} child 
   */
  createLIElement(child) {
    const li = document.createElement("li");

    li.appendChild(child);

    return li;
  }

  remove() {
    const child = this.ul.lastElementChild;

    if (child) {
      this.ul.removeChild(child);
      this.updateRemoveButtonDisabled();
    }
  }

  reset() {
    while (this.ul.lastElementChild) {
      this.remove();
    }

    if (this.props?.options) {
      this.props?.options.map((value) => {
        const element = this.createElement(value);
        this.appendLIElement(element);
      });
    } else {
      this.add();
    }
  }

  /**
   * @param {Partial<T>} [value]
   * @returns {HTMLElement}
   */
  createElement(value) {
    const id = this.generateUniqueId();
    const input = document.createElement("input");

    input.id = id;
    input.name = id;

    if (typeof value === "string") {
      input.value = value;
    }

    return input;
  }

  /**
   * @param {string} [name]
   */
  generateUniqueId(name) {
    return `${this.props?.id}[${this.ul.childElementCount}]${name ? "." + name : ""}`;
  }

  updateRemoveButtonDisabled() {
    this.removeButton.element.disabled = !this.ul.childElementCount;
  }
}
