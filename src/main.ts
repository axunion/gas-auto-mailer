// eslint-disable-next-line @typescript-eslint/no-unused-vars
function main() {
  const sentStatus = "Done";
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const dataRange = sheet.getDataRange();
  const data = dataRange.getValues();

  data.slice(1).forEach((row, index) => {
    const rowNumber = index + 2;
    const recipient = row[0];
    const subject = row[1];
    const body = row[2];
    const statusCell = sheet.getRange(rowNumber, 4);
    const status = statusCell.getValue();

    if (status === sentStatus) {
      console.log(`Skipping row ${rowNumber}: Already sent`);
      return;
    }

    if (recipient && subject && body) {
      try {
        MailApp.sendEmail(recipient, subject, body);
        statusCell.setValue(sentStatus);
      } catch (error) {
        console.error(`Failed to send email to ${recipient}: ${error}`);
        statusCell.setValue(`Error: ${error.message}`);
      }
    } else {
      statusCell.setValue("Missing data");
    }
  });
}
