import "./styles";

let pageNumber = 0;

class TwitchPage {
  constructor(props) {
    // required properties
    this.page = props.page;
  }
}

const pages = [
  new TwitchPage({ page: "https://www.twitch.tv/ranboolive" }),
  new TwitchPage({ page: "https://www.twitch.tv/sykkuno" }),
  new TwitchPage({ page: "https://www.twitch.tv/xqcow" }),
];

function createButton({ onClick, text }) {
  // create new button element
  const newButton = document.createElement("button");

  // add button class
  newButton.classList.add("btn");

  // additional attributes
  newButton.innerHTML = text;

  // listeners
  newButton.addEventListener("click", onClick);

  // return new element
  return newButton;
}

function handleNavigation() {
  console.log("navigating to page number", pageNumber);

  try {
    // get the new page
    const to = pages[pageNumber];

    // send a redirect message to background.js with the new url
    window.chrome.runtime.sendMessage({ message: "redirect", url: to.page });
  } catch (e) {
    console.error("navigation error", e.toString());
  }
}

function handleDownClick(event) {
  // decrement page number and redirect
  pageNumber -= 1;
  handleNavigation();
}

function handleUpClick(event) {
  // increment page number and redirect
  pageNumber += 1;
  handleNavigation();
}

function init() {
  console.log("initializing content script");

  // create controls
  const downButton = createButton({
    onClick: handleDownClick,
    text: "DOWN",
  });
  const upButton = createButton({
    onClick: handleUpClick,
    text: "UP",
  });

  // create a wrapper for the controls
  controlContainer = document.createElement("div");
  controlContainer.classList.add("control-container");

  // add buttons to container
  controlContainer.appendChild(upButton);
  controlContainer.appendChild(downButton);

  // add control wrapper to nav bar
  const navBar = document.querySelector("nav.top-nav");
  navBar.appendChild(controlContainer);
}

init();

chrome.runtime.onMessage.addListener(function (request) {
  if (request && request.type === "page-rendered") {
    console.log("page changed");
    // call method which gets fired as if new page is opened
  }
});
