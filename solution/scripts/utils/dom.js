// @ts-check

/**
 * 
 * @param {() => HTMLElement} child 
 * @param {HTMLElement} root 
 */
export function render(child, root) {
  document.addEventListener("DOMContentLoaded", () => {
    root.appendChild(child());
  });
}
