import browser from "./browser";

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

function createButton({ onClick, text, image, imageAlt }) {
  // create new button element
  const newButton = document.createElement("div");

  // add button class
  newButton.classList.add("btn");

  // create icon image
  const upImage = document.createElement("img");
  const upImageSrc = browser.extension.getURL(image);
  upImage.classList.add("btn-image");
  upImage.src = upImageSrc;
  upImage.alt = imageAlt;

  // add image to button
  newButton.appendChild(upImage);

  // listeners
  newButton.addEventListener("click", onClick);

  // return new element
  return newButton;
}

function handleNavigation() {
  // display the loader
  const loader = document.querySelector(".flipper-loader");
  if (loader) {
    loader.classList.add("show");
  }

  try {
    // get the new page
    let newPageNumber = pageNumber;

    if (newPageNumber < 0) {
      // go to the end
      newPageNumber = pages.length - 1;
    } else if (newPageNumber - 1 > pages.length) {
      // go to the beginning
      newPageNumber = 0;
    }

    // set the new url
    const to = pages[newPageNumber];

    // update local storage to now so we know when to show a page loader
    browser.storage.local.set({ lastChange: new Date().getTime() }, () => {
      console.log("done updating storage");
    });

    // send a redirect message to background.js with the new url
    browser.runtime.sendMessage({ message: "redirect", url: to.page });
  } catch (e) {
    console.error("navigation error", e.toString());
  }
}

function handleDownClick() {
  // decrement page number and redirect
  pageNumber -= 1;
  handleNavigation();
}

function handleUpClick() {
  // increment page number and redirect
  pageNumber += 1;
  handleNavigation();
}

export function getControls() {
  // create controls
  const downButton = createButton({
    image: "down-arrow.svg",
    imageAlt: "down",
    onClick: handleDownClick,
  });
  const upButton = createButton({
    image: "up-arrow.svg",
    imageAlt: "up",
    onClick: handleUpClick,
  });

  // create a wrapper for the controls
  controlContainer = document.createElement("div");
  controlContainer.classList.add("control-container");

  // add buttons to container
  controlContainer.appendChild(upButton);
  controlContainer.appendChild(downButton);

  return controlContainer;
}
