// @ts-check

import ResumeListPage from "../components/resume-list/page.js";
import { render } from "../utils/dom.js";

// @ts-ignore
render(() => new ResumeListPage().element, document.getElementById("app"));
