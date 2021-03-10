// import css in content.js only
import "../lib/css";

import { getControls } from "../lib/js/controls";
import browser from "../lib/js/browser";

// the allowed threshold of time to consider showing a fullscreen loader
const loaderThresholdMs = 1000;

function showLoader() {
  // create loader element
  const loader = document.createElement("div");
  loader.classList.add("flipper-loader");
  loader.classList.add("show");

  // append to the only element available at this point
  document.documentElement.appendChild(loader);

  // get control component and append to loader
  const children = getControls();
  loader.appendChild(children);
}

function init() {
  console.log("initializing content");

  // conditionally display a page loader
  browser.storage.local.get("lastChange", (result) => {
    if (result && result.lastChange) {
      try {
        const lastChange = parseInt(result.lastChange, 10);
        const now = parseInt(new Date().getTime(), 10);

        if (lastChange + loaderThresholdMs >= now) {
          showLoader();
        }
      } catch (e) {
        console.log("loader error", e.toString());
      }
    }
  });
}

init();
