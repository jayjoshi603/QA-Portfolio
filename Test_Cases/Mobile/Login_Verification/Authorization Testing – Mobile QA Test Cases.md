# Authorization Testing – Mobile QA Test Cases

This section covers the test cases related to application verification, ensuring proper enforcement of access control policies.
---

## 🎯 Scope

1. Vertical and horizontal privilege escalation  
2. Dark and light mode coverage  
3. UI and colour identification  
4. Focused on casing sensitivity  
5. Clipboard copy and paste action  
6. Special symbols and emoji support 

-----
**Out of Scope:**
- Accessibility testing [Talkback & Voiceover]

---

## 🧪 Test Cases

### TC-001 IG_Login (Android / iOS) – Vertical and Horizontal Privilege Escalation
- **Title:** Device Orientation Testing  
- **Section:** Login Page  
- **Priority:** High  
- **Platform:** Android & iOS  
- **Execution Status:** Passed  
- **Estimated Time:** 1m  
- **Automation:** Manual  
- **TC_NO:** TC-001  
- **Precondition:** Download Instagram application from Play Store or App Store  

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram and change your device orientation to landscape | Application should stay in horizontal mode |
| 2  | Turn on auto rotate from the device’s setting and perform the first case | Application should stay in horizontal mode |

---

### TC-002 IG_Login (Android / iOS) – Dark and Light Mode Coverage
- **Title:** System Theme Testing  
- **Section:** Login Page  
- **Priority:** High  
- **Platform:** Android & iOS  
- **Execution Status:** Passed  
- **Estimated Time:** 2m  
- **Automation:** Manual  
- **TC_NO:** TC-002  
- **Precondition:** Download Instagram application from Play Store  

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram and navigate to the login page | Username and password fields should show with prewritten text and login button should be visible |
| 2  | Turn on Turn on dark mode from the device settings and navigate to the login page | Application should turned into dark mode theme
-----
### TC-003 IG_Login (Android / iOS) – Focus on Casing Sensitivity
- **Title:** Focus on Casing Sensitivity  
- **Section:** Login Page  
- **Priority:** High  
- **Platform:** Android & iOS  
- **Execution Status:** Passed  
- **Estimated Time:** 5m  
- **Automation:** Manual  
- **TC_NO:** TC-003  
- **Precondition:** Download Instagram application from Play Store  

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram and navigate to the login page | Make sure user should open application without crash
| 2  | Try to enter usename in capital latters |  User should received a message that 'Please enter correct password'
| 3  | Enter keywords from your password into capital latters |  User should received a message that 'Please enter correct password'

---

### TC-004 IG_Login (Android / iOS) – Clipboard Copy and Paste Actions
- **Title:** Adding Username and Password from Clipboard  
- **Section:** Login Page  
- **Priority:** Mid  
- **Platform:** Android & iOS  
- **Execution Status:** Passed  
- **Estimated Time:** 2m  
- **Automation:** Manual  
- **TC_NO:** TC-004  
- **Precondition:** Download Instagram application from Play Store or App Store

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram and navifgato the login page  | Make sure user should open application without crash
| 2  |  Press & hold on usename field and make sure you can see the 'Clipboard' option. |  User should able to paste copied username from the clipboard
| 3  | Try to paste copied password into password field  |  User should received a message that 'Please enter correct password'




