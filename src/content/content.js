// import css in content.js only
import "../lib/css";

import { getControls } from "../lib/js/controls";

function init() {
  console.log("initializing content");

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

init();
