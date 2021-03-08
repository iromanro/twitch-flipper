console.log("Hello from your Chrome extension!");

// Add left/right buttons
var navBar = document.body.getElementsByClassName("top-nav__menu")[0].getElementsByClassName("tw-justify-content-end")[0];
var prevBtn=document.createElement("BUTTON");
var nextBtn=document.createElement("BUTTON");
navBar.prepend(prevBtn);
navBar.prepend(nextBtn);
prevBtn.innerText="Prev";
nextBtn.innerText="Next";

chrome.runtime.onMessage.addListener(function(request) {
  if (request && request.type === 'page-rendered') {
    console.log("page changed")
    // call method which gets fired as if new page is opened
  }
});