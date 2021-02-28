export default function getBrowser() {
  if (!window.browser) {
    window.browser = window.chrome;
  }

  return window.browser;
}
