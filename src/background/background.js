import browser from "../lib/js/browser";

browser.runtime.onInstalled.addListener(() => {
  browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: {
              urlMatches: "twitch.tv",
            },
          }),
        ],
        actions: [new browser.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

browser.commands.onCommand.addListener((command) => {
  switch (command) {
    case "copy-bug-template":
      copyToClipboard("bug");
      break;

    case "copy-qa-report-template":
      copyToClipboard("qa-report");
      break;

    default:
  }
});

const networkFilters = {
  urls: ["*://*.twitch.tv/*"],
};
let currentUrl = "";
let tabId;

chrome.webRequest.onCompleted.addListener((details) => {
  const parsedUrl = new URL(details.url);
  console.log(parsedUrl);
  if (currentUrl && currentUrl.indexOf(parsedUrl.pathname) > -1 && tabId) {
    chrome.tabs.sendMessage(tabId, { type: "page-rendered" });
  }
}, networkFilters);

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  tabId = details.tabId;
  currentUrl = details.url;
  console.log(details);
}, networkFilters);

browser.runtime.onMessage.addListener((req, sender, res) => {
  switch (req.message) {
    case "redirect":
      const { url } = req;
      browser.tabs.update({ url });
      break;

    default:
      console.error("unknown message");
  }
});
