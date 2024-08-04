type EmaiTemplateData = { [key: string]: string | number };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formatEmailTemplate(template: string, data: EmaiTemplateData): string {
  const placeholderRegex = /\{\{(.*?)\}\}/g;

  return template.replace(placeholderRegex, (match, key) => {
    key = key.trim();
    return data[key] ? String(data[key]) : match;
  });
}
