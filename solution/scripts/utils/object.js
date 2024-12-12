// @ts-check

/**
 * Sets a value at a specified path within an object.
 *
 * @example
 * const obj = {};
 * set(obj, 'x.y[0].z', 42);
 * console.log(JSON.stringify(obj)); // {"x":{"y":[{"z":42}]}}
 *
 * @param {any} obj - The object to be modified.
 * @param {string} path - A string representing the path to the property where the value should be set (e.g., "a[0].b"). 
 * @param {any} value - The value to set at the specified path. This can be of any type.
 */
export const set = (obj, path, value) => {
  path = path.replaceAll("[", ".[");
  const keys = path.split(".");

  for (let i = 0; i < keys.length; i++) {
    let currentKey = keys[i];
    let nextKey = keys[i + 1];

    if (currentKey.includes("[")) {
      // @ts-ignore
      currentKey = parseInt(currentKey.substring(1, currentKey.length - 1));
    }
    if (nextKey && nextKey.includes("[")) {
      // @ts-ignore
      nextKey = parseInt(nextKey.substring(1, nextKey.length - 1));
    }

    if (typeof nextKey !== "undefined") {
      // @ts-ignore
      obj[currentKey] = obj[currentKey] ? obj[currentKey] : (isNaN(nextKey) ? {} : []);
    } else {
      obj[currentKey] = value;
    }

    obj = obj[currentKey];
  }
};
