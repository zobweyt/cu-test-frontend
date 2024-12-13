// @ts-check

/**
 * @typedef {Object} ButtonProps
 * @property {string} label
 * @property {"submit" | "reset" | "button"} [type]
 * @property {boolean} [disabled]
 * @property {boolean} [autofocus]
 * @property {string} [testId]
 */

export default class Button {
  /**
   * @param {ButtonProps} props
   */
  constructor(props) {
    this.element = document.createElement("button");

    this.element.textContent = props.label;
    this.element.type = props.type || "button";
    this.element.disabled = props.disabled || false;
    this.element.autofocus = props.autofocus || false;
    this.element.setAttribute("test-id", props.testId ?? "");
  }
}