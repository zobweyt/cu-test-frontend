// @ts-check

/**
 * @typedef {Object} FieldProps
 * @property {string} name
 * @property {string} [type]
 * @property {string} [value]
 * @property {string} label
 * @property {string} [placeholder]
 * @property {string} [testId]
 * @property {boolean} [required]
 * @property {boolean} [autofocus]
 * @property {boolean} [multiline]
 */

/**
 * 
 * @param {FieldProps} props
 */
export default function createField(props) {
  const field = document.createElement("div");
  field.className = "col";

  const label = document.createElement("label");
  label.setAttribute("for", props.name);
  label.textContent = props.label;

  const input = document.createElement(props.multiline ? "textarea" : "input");

  if (input instanceof HTMLInputElement) {
    input.type = props.type ?? "text";
  }

  input.id = props.name;
  input.name = props.name;
  input.value = props.value ?? "";
  input.placeholder = props.placeholder ?? "";
  input.required = props.required ?? false;
  input.autofocus = props.autofocus ?? false;
  input.setAttribute("test-id", props.testId ?? "");

  field.appendChild(label);
  field.appendChild(input);

  return Object.assign(field, {
    label,
    input,
  });
}
