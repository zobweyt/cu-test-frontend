// @ts-check

/**
 * @param {string[]} [extensions]
 */
export function requestSingleFile(extensions) {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");

    input.type = "file";

    if (extensions) {
      input.accept = extensions.join(",");
    }

    input.addEventListener("change", () => {
      const files = input.files;
      if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve(e.target?.result);
        };

        reader.onerror = (e) => {
          reject(new Error("Error reading file"));
        };

        reader.readAsText(file);
      } else {
        reject(new Error("No file selected."));
      }
    });

    input.click();
  });
}
