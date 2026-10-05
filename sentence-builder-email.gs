/**
 * Sentence Builder — email + data logger (Google Apps Script)
 *
 * Receives a finished session from sentence-builder.html, emails the report
 * to the teacher, and (optionally) appends one row per sentence to a Google Sheet.
 * See SETUP.md for deployment steps.
 */

// Every report goes to this one address and nowhere else, whatever the app sends.
const TEACHER_EMAIL = 'Vannessa_Forkin@bismarckschools.org';

// Optional password. Leave '' to turn it off; if you set one, type the same value into the app's "Secret token" box.
const TOKEN = '';

// Optional: paste a Google Sheet ID to log every sentence (leave '' to skip).
// The ID is the long string in the sheet URL: docs.google.com/spreadsheets/d/<ID>/edit
const SHEET_ID = '';

const HEADERS = ['Date', 'Student', 'Sentence #', 'Prompt', 'Original sentence', 'Student corrected sentence',
  'Errors made', 'Errors found', 'Errors corrected', 'Errors not found', '% corrected', 'Error details',
  'New errors introduced', 'Seconds writing', 'Seconds correcting'];

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (TOKEN && d.token !== TOKEN) return out_({ ok: false, error: 'bad token' });

    MailApp.sendEmail({
      to: TEACHER_EMAIL,
      subject: String(d.subject || 'Sentence Builder report').slice(0, 200),
      htmlBody: String(d.html || ''),
      body: String(d.text || ''),
      name: 'Sentence Builder'
    });

    if (SHEET_ID && Array.isArray(d.rows) && d.rows.length) {
      const sh = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
      if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
      d.rows.forEach(r => sh.appendRow(r));
    }
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the editor to grant the email permission and send yourself a test.
function testSend() {
  MailApp.sendEmail(TEACHER_EMAIL,'Sentence Builder – script test', 'The Apps Script can send email.');
}
