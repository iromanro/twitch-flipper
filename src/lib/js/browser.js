function getBrowser() {
  if (!window.browser) {
    window.browser = window.chrome;
  }

  return window.browser;
}

export const browser = getBrowser();
export default browser;
