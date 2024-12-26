// @ts-check

/// <reference path="./../components/resume-builder/types.js" />

export function randomID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const LOCAL_STORAGE_RESUMES_KEY = "resumes";

/**
 * @returns {Object<string, Resume>}
 */
export function getResumes() {
  const obj = localStorage.getItem(LOCAL_STORAGE_RESUMES_KEY);
  return obj ? JSON.parse(obj) : {};
}

/**
 * @param {string} id
 * @returns {Resume | undefined}
 */
export function getResume(id) {
  const resumes = getResumes();
  return resumes[id];
}

/**
 * @param {Resume} resume
 */
export function addResume(resume) {
  const id = randomID();
  const resumes = getResumes();

  resumes[id] = resume;
  localStorage.setItem(LOCAL_STORAGE_RESUMES_KEY, JSON.stringify(resumes));

  return id;
}

/**
 * @param {string} id
 * @param {Resume} resume
 */
export function saveResumeToID(id, resume) {
  const resumes = getResumes();

  resumes[id] = resume;
  localStorage.setItem(LOCAL_STORAGE_RESUMES_KEY, JSON.stringify(resumes));

  return id;
}

/**
 * @param {string} id
 */
export function deleteResume(id) {
  const resumes = getResumes();
  delete resumes[id];
  localStorage.setItem(LOCAL_STORAGE_RESUMES_KEY, JSON.stringify(resumes));
}

export function getLocationResumeId() {
  const url = new URL(window.location.href);
  return url.searchParams.get("id");
}

export function getLocationResume() {
  const id = getLocationResumeId();

  return (id && getResume(id)) || undefined;
}
