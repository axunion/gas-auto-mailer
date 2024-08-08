// eslint-disable-next-line @typescript-eslint/no-unused-vars
function main() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const dataRange = sheet.getDataRange();
  const data = dataRange.getValues();

  data.slice(1).forEach((row, index) => {
    const recipient = row[0];
    const subject = row[1];
    const body = row[2];

    if (recipient && subject && body) {
      try {
        MailApp.sendEmail(recipient, subject, body);
        sheet.getRange(index, 1, 1, 3).setBackground("gray");
      } catch (error) {
        console.error(`Failed to send email to ${recipient}: ${error}`);
      }
    }
  });
}
