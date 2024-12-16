// @ts-check

import ResumeBuilderPage from "../components/resume-builder/page.js";
import { render } from "../utils/dom.js";

// @ts-ignore
render(() => new ResumeBuilderPage().element, document.getElementById("app"));
