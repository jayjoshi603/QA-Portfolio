## Bug Writing


Overview
- This folder stores software defects identified during manual QA testing. Each issue is documented is an individual Markdown file, providing essential details to help developers understand, reproduce, and resolve the problem. These reports facilitate team communication and contribute to enhancing overall product quality.

## Structure

- Each bug is stored in an individual `.md` file
- Reports cover metadata, title, frequency, reproduction devices, reproduction browsers, reproduction beanch, reproduction steps, expected and actual results, and related resources

## Available Bug Reports

| Defect ID | Title                                                                 | Status                  |
|-----------|------------------------------------------------------------------------|--------------------------|
| [No 001](https://github.com/jayjoshi603/QA-Portfolio/blob/main/Bug_Writing/Native_Application_Bugs.md) | [High Pri] Instagram(Android/iOS) (Production v300): User is able to login when user enter wrong password and press log in button from Instagram login page             | Selected for Development |
| [No 002](https://github.com/jayjoshi603/QA-Portfolio/blob/main/Bug_Writing/Web_Bugs.md) | [Mid Pri] Instagram(Mobile Web / WWW): No action is performed when user tap on the explore button from the left navigation bar | Selected for Development |

## Bug Report Field Descriptions

| Field               | Description                                                             |
|---------------------|-------------------------------------------------------------------------|
| **Title**           | Brief summary of the bug                                                |
| **Frequency**       | frequency of bug reproduction out of 5 |
| **Reproducible accounts** | In which account bug is happening                 |
| **Reproducible devices** | In which devices bug is happening, written with OS version |                                   |
| **Reproducible browsers** | In which browsers bug is happening, written with updatedbrowser version                       |
| **Reproduction Branch** | Added branch in which bug is reproduced such as Release Candidate, Master or Production     |
| **Precondition** | What the system or setup should you need to reproduced perticular bug                        |
| **Steps**   | indicate path about how bug is happening
| **Actual Result**   | What the system did instead [Bug]                                            |
| **Expected Result**   | What actual behaviour should be 
| **Related Test Cases** | Links to relevant manual or automated tests                        |
| **Video/Screenshots/Logs**| Supporting evidence (if available)                                      |
| **Bug Priority**   | How crutial bug is| 
| **Bug Severity**   | How serious issue is|
| **Reported On**     | Date the bug was documented                                             |
| **Reported By**     | Name or ID of the QA analyst who filed the bug                         |
| **Assignee**        | Person responsible for fixing the issue                                 |
