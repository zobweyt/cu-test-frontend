// @ts-check

/**
 * @typedef {Object} ButtonProps
 * @property {string} label
 * @property {"submit" | "reset" | "button"} [type]
 * @property {boolean} [disabled]
 * @property {boolean} [autofocus]
 * @property {string} [testId]
 */

/**
 * 
 * @param {ButtonProps} props
 */
export default function createButton(props) {
  const button = document.createElement("button");

  button.textContent = props.label;
  button.type = props.type || "button";
  button.disabled = props.disabled || false;
  button.autofocus = props.autofocus || false;
  button.setAttribute("test-id", props.testId ?? "");

  return button;
}
