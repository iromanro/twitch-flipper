import getBrowser from './utils/browser';
import { copyToClipboard } from './utils/templates';

const browser = getBrowser();

browser.runtime.onInstalled.addListener(() => {
  browser.declarativeContent.onPageChanged.removeRules(undefined, () => {
    browser.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new browser.declarativeContent.PageStateMatcher({
            pageUrl: {
              urlMatches: '.*',
            },
          }),
        ],
        actions: [new browser.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

browser.commands.onCommand.addListener(command => {
  switch (command) {
    case 'copy-bug-template':
      copyToClipboard('bug');
      break;

    case 'copy-qa-report-template':
      copyToClipboard('qa-report');
      break;

    default:
  }
});
