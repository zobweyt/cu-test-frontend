// @ts-check

/**
 * @param {() => HTMLElement | Promise<HTMLElement>} child
 * @param {HTMLElement} root
 */
export function render(child, root) {
  document.addEventListener("DOMContentLoaded", async () => {
    const element = await Promise.resolve(child());
    root.appendChild(element);
  });
}
