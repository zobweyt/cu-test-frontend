// @ts-check

/**
 * @typedef {Object} CheckboxProps
 * @property {string} [name]
 * @property {string} [label]
 * @property {string} [testId]
 * @property {boolean} [required]
 * @property {boolean} [autofocus]
 */

export default class Checkbox {
  /**
   * @param {CheckboxProps} props
   */
  constructor(props) {
    this.options = props;

    this.element = document.createElement("div");

    this.input = document.createElement("input");

    this.value = document.createElement("span");
    this.value.classList.add("sr-only");

    if (this.options.label) {
      this.label = document.createElement("label");
    }

    this.setup();
  }

  setup() {
    this.setupElements();
    this.setupLayout();
  }

  setupElements() {
    this.setupElement();
    this.setupLabel();
    this.setupInput();
  }

  setupElement() {
    this.element.classList.add("flex-group");
  }

  setupLabel() {
    if (this.label && this.options.label) {
      this.label.textContent = this.options.label;
      this.label.setAttribute("for", this.options.name ?? "");
    }
  }

  setupInput() {
    this.input.type = "checkbox";
    this.input.id = this.options.name ?? "";
    this.input.name = this.options.name ?? "";
    this.input.required = this.options.required ?? false;
    this.input.autofocus = this.options.autofocus ?? false;
    this.input.setAttribute("test-id", this.options.testId ?? "");
  }

  setupLayout() {
    this.element.appendChild(this.input);

    if (this.label) {
      this.element.appendChild(this.label);
    }

    this.element.appendChild(this.value);
  }
}
