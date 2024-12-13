// @ts-check

/**
 * @typedef {Object} FieldProps
 * @property {string} [name]
 * @property {string} [type]
 * @property {string} [value]
 * @property {string} [label]
 * @property {string} [placeholder]
 * @property {string} [testId]
 * @property {boolean} [required]
 * @property {boolean} [autofocus]
 * @property {boolean} [multiline]
 */

export default class Field {
  /**
   * @param {FieldProps} props
   */
  constructor(props) {
    this.options = props;

    this.element = document.createElement("div");

    if (this.options.label) {
      this.label = document.createElement("label");
    }

    this.input = document.createElement(this.options.multiline ? "textarea" : "input");

    this.setup();
  }

  setup() {
    this.setupElements();
    this.setupLayout();
    this.setupEventListeners();
  }

  setupElements() {
    this.setupElement();
    this.setupLabel();
    this.setupInput();
  }

  setupElement() {
    this.element.className = "col";
  }

  setupLabel() {
    if (this.label && this.options.label) {
      this.label.setAttribute("for", this.options.name ?? "");
      this.label.textContent = this.options.label;
    }
  }

  setupInput() {
    if (this.input instanceof HTMLInputElement) {
      this.input.type = this.options.type ?? "text";
    }

    this.input.id = this.options.name ?? "";
    this.input.name = this.options.name ?? "";
    this.input.value = this.options.value ?? "";
    this.input.placeholder = this.options.placeholder ?? "";
    this.input.required = this.options.required ?? false;
    this.input.autofocus = this.options.autofocus ?? false;
    this.input.setAttribute("test-id", this.options.testId ?? "");
  }

  setupLayout() {
    if (this.label) {
      this.element.appendChild(this.label);
    }

    this.element.appendChild(this.input);
  }

  setupEventListeners() {
    this.input.form?.addEventListener("reset", this.reset.bind(this));
  }

  reset() {
    const value = this.options.value;

    if (value) {
      this.input.value = value;
    }
  }
}
