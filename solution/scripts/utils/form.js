// @ts-check

import { set } from "./object.js";

/**
 * Serializes a JavaScript object into form data format.
 * 
 * @example
 * const data = serialize({
 *   name: "John",
 *   age: 30,
 *   hobbies: ["Reading", "Traveling"],
 *   address: { city: "New York", zip: "10001" }
 * });
 * 
 * const obj = JSON.stringify(Object.fromEntries(data.entries()))
 * 
 * console.log(obj); // {"name":"John","age":"30","hobbies[0]":"Reading","hobbies[1]":"Traveling","address.city":"New York","address.zip":"10001"}
 * 
 * @param {any} obj - The object to serialize.
 * @param {FormData} fd - The form data instance to append values.
 * @param {string} prefix - The prefix for the keys.
 * @returns {FormData} - The form data instance containing the serialized data.
 */
export function serialize(obj, fd = new FormData(), prefix = "") {
  if (obj === undefined) {
    return fd;
  }

  if (obj instanceof Date) {
    fd.append(prefix, obj.toISOString());
  } else if (Array.isArray(obj) && obj.length) {
    obj.forEach((value, index) => {
      serialize(value, fd, prefix + "[" + index + "]");
    });
  } else if (typeof obj === "function" || typeof obj === "object" && !!obj) {
    Object.keys(obj).forEach((prop) => {
      const value = obj[prop];

      if (Array.isArray(value)) {
        while (prop.length > 2 && prop.lastIndexOf("[]") === prop.length - 2) {
          prop = prop.substring(0, prop.length - 2);
        }
      }

      serialize(value, fd, prefix ? prefix + "." + prop : prop);
    });
  } else {
    fd.append(prefix, obj);
  }

  return fd;
}

/**
 * Deserializes a form data back into a JavaScript object.
 * 
 * @example
 * const fd = new FormData();
 * 
 * fd.set("name", "John");
 * fd.set("age", "30");
 * fd.set("hobbies[0]", "Reading");
 * fd.set("hobbies[1]", "Traveling");
 * fd.set("address.city", "New York");
 * fd.set("address.zip", "10001");
 * 
 * console.log(JSON.stringify(deserialize(fd))); // {"name":"John","age":"30","hobbies":["Reading","Traveling"],"address":{"city":"New York","zip":"10001"}}
 * 
 * @param {FormData} fd - The form data instance to deserialize.
 * @returns {any} - The reconstructed JavaScript object.
 */
export function deserialize(fd) {
  const obj = {};

  for (const path in Object.fromEntries(fd.entries())) {
    set(obj, path, fd.get(path));
  }

  return obj;
}

/**
 * Dumps form into a JavaScript object.
 * 
 * @param {HTMLFormElement} form - The form to deserialize.
 * @returns {any} - The reconstructed JavaScript object.
 */
export function dump(form) {
  const fd = new FormData(form);
  return deserialize(fd);
}
