// @ts-check

import createButton from "./button.js";

/**
 * @typedef {Object} FieldsetProps
 * @property {string} legend
 * @property {string} testId
 * @property {string} fieldId
 * @property {VoidFunction} [onAppend]
 */

/**
 * @param {FieldsetProps} props
 */
export default function createFieldSet(props) {
  const fieldset = document.createElement("fieldset");
  fieldset.classList.add("col");

  const legend = document.createElement("legend");
  legend.textContent = props.legend;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("row");

  const addButton = createButton({
    label: "Добавить",
    testId: `add-${props.testId}`,
  });

  const removeButton = createButton({
    label: "Удалить последнее",
    testId: `remove-${props.testId}`
  });

  const itemsList = document.createElement("div");
  itemsList.classList.add("col");

  buttonsContainer.appendChild(addButton);
  buttonsContainer.appendChild(removeButton);

  fieldset.appendChild(legend);
  fieldset.appendChild(buttonsContainer);
  fieldset.appendChild(itemsList);

  addButton.addEventListener("click", add);
  removeButton.addEventListener("click", pop);

  function add() {
    props?.onAppend?.();
  }

  function pop() {
    const lastElementChild = itemsList.lastElementChild;

    if (!lastElementChild) {
      return;
    }

    itemsList.removeChild(lastElementChild);
    updateRemoveButtonDisabledState();
  }

  /**
   * @param {HTMLElement} child 
   */
  function append(child) {
    itemsList.appendChild(child);
    updateRemoveButtonDisabledState();
  }

  function updateRemoveButtonDisabledState() {
    removeButton.disabled = !itemsList.childElementCount;
  }

  function generateFieldName(name = "") {
    return `${props.fieldId}[${itemsList.childElementCount}]${name ? "." + name : ""}`;
  }

  function generateFieldTestId(name = "") {
    return `${props.testId}${name ? "-" + name : ""}`;
  }

  return Object.assign(fieldset, {
    pop,
    append,
    generateFieldName,
    generateFieldTestId,
  });
}
