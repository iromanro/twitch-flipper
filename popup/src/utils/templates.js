import clipboardCopy from 'copy-to-clipboard';

export const defaultTemplates = [
  {
    type: 'bug',
    label: 'Bug',
    placeholder: `Environment:&nbsp
Platform:&nbsp

Steps to reproduce:
1. Navigate to&nbsp
2.&nbsp

Screenshot/video:&nbsp
`,
  },
  {
    type: 'qa-report',
    label: 'QA Report',
    placeholder: `QA Summary:

Platforms Tested:
Chrome
Firefox
Safari

Issues Opened: 0 Total

Issues Reopened: 0 Total

Issues Verified: 0 Total
`,
  },
];

export function formatTemplateString(value) {
  // replace non-breaking space characters with whitespace
  return value.replace(/&nbsp/g, ' ');
}

export function getTemplateLocalStorageKey(templateType) {
  return `qa-ninja-${templateType}-template`;
}

export function saveTemplateToLocalStorage(templateType, value) {
  localStorage.setItem(getTemplateLocalStorageKey(templateType), value);
}

export function getTemplateFromLocalStorage(templateType) {
  return localStorage.getItem(getTemplateLocalStorageKey(templateType));
}

export function copyToClipboard(templateType) {
  const templateDefault = defaultTemplates.find(template => template.type === templateType);
  const { type, placeholder } = templateDefault;
  const templateString = getTemplateFromLocalStorage(type) || placeholder;
  const formattedTemplate = formatTemplateString(templateString);

  // copy twice because of a bug with this dependency in certain browsers
  clipboardCopy(formattedTemplate);
  clipboardCopy(formattedTemplate);
}
