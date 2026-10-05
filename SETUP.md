# Sentence Builder — Setup

## 1. Open the app
Open `sentence-builder.html` in **Chrome or Edge**. Each student types their own name on the
start screen, and it goes at the top of the report. Every report always goes to
**Vannessa_Forkin@bismarckschools.org**. This address is locked: to change it, edit `TEACHER_EMAIL` in both
`sentence-builder.html` and `sentence-builder-email.gs`. Tap ⚙️ to set:
- Sentences per session, prompt type, and a teacher PIN so the student can't change settings

The app works right away. Until step 2 is done, the end of each session shows an
**Open email to teacher** button that opens a pre-filled email.

## 2. Turn on automatic email (one time, about 5 minutes)
1. Go to https://script.google.com → **New project**.
2. Delete the starter code and paste in all of `sentence-builder-email.gs`.
3. *(Optional)* Set `TOKEN` to a secret word, or paste a Google Sheet ID into `SHEET_ID` to log every sentence to a spreadsheet.
4. Pick `testSend` in the function menu → **Run** → approve the permissions. A test email should arrive.
5. **Deploy → New deployment** → type **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** and copy the **Web app URL**.
6. In the app: ⚙️ → **📨 Email setup** → paste the URL and the same secret token → **Send test email**.

Reports are sent from the Google account that deployed the script. If the district blocks
Apps Script, use the **Open email to teacher** button or the CSV export instead.

## How scoring works
| Result | Meaning |
|---|---|
| **Corrected** | The error is gone from the student's corrected sentence |
| **Found, not corrected** | The student changed that spot, but it is still wrong |
| **Not found** | The student didn't change that spot |

"Errors found" = Corrected + Found, not corrected.

## Privacy
- All session data stays in the browser on this computer (⚙️ → 📊 Data has the CSV export and the delete button).
- Spelling is always checked with a built-in 160,000-word English dictionary (Hunspell en_US) that works offline.
  Add classmates' names, pets and local places under ⚙️ → **Allowed words** so they aren't counted as errors.
- If **LanguageTool** is on, it adds stronger grammar checking. Only the sentence text goes to languagetool.org; the student's name is never sent.
  Use ⚙️ → **Test LanguageTool connection** to see whether your school network allows it.
- The report email (with the student's name) goes only through your own Google Apps Script.
