import { getIndexes } from "./getIndexes";
import { groupBy } from "./groupBy";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function main() {
  const ss = SpreadsheetApp.openById("");
  const sheet = ss.getSheetByName("");

  if (!sheet) {
    throw new Error(`Sheet not found.`);
  }

  const template = "";
  const sheetData = sheet.getDataRange().getValues();
  const headers = sheetData[0];
  const rows = sheetData.slice(1);
  const columnIndex = getIndexes(headers, [""]).pop();
  const retrieveIndexes = getIndexes(headers, [""]);
  const groupedData = groupBy({ rows, columnIndex, retrieveIndexes });

  for (const [key, values] of Object.entries(groupedData)) {
    const data = { name: key, list: values.map((v) => v).join(", ") };
    const recipient = "";
    const subject = "";
    const body = formatEmailTemplate(template, data);

    MailApp.sendEmail(recipient, subject, body);
  }
}
