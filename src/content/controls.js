import { getControls } from "../lib/js/controls";

function init() {
  console.log("initializing controls");

  // content ready, hide loader
  const loader = document.querySelector(".flipper-loader");
  if (loader) {
    loader.classList.remove("show");
  }

  // add control wrapper to nav bar
  const navBar = document.querySelector("nav.top-nav");
  const children = getControls();
  navBar.appendChild(children);
}

init();
