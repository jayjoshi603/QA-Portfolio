# ♿️ Voiceover Accessibility – iOS Test Cases
-----

> Note : This section include focus, label and interaction realated test cases which tester is going to perform using iOS Voiceover

-----

## Scope

These TalkBack test cases cover:
1. User can set focus on elements by swiping fingers or directly tapping on elements.
2. Voiceover announcement when user set focus on images and icons
3. Label announcements on each elements [checkbox, button, text field, etc.]
5. Interactions on elements [checkbox, button, text field, etc.]

## Out Of scope
1. Functional testing of the application
2. Android talkback is excluded, If you want to see you can find here : [Talkback_Cases.md](https://github.com/jayjoshi603/QA-Portfolio/blob/4cd6fe65f23704363bf979a3a3224906b7ca8cfc/Test_Cases/Mobile/Accessibility/Talkback_Cases.md)


## 🧪 Test Cases
-------
## TC-001-Talkback - User can set focus on each element from Login page
- **Title:** User can set focus on each element from Login page 
- **Section:** Login Page  
- **Priority:** High  
- **Platform:** Android
- **Execution Status:** Not run  
- **Estimated Time:** 5m  
- **Automation:** Manual  
- **TC_NO:** TC-001  
- **Precondition:** Download Instagram application from Play Store or App Store and turn on [voiceover](https://support.apple.com/en-in/guide/iphone/iph3e2e415f/ios) from the device setting

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram and navigate ot the login page | Make sure login page rander properly |
| 2  | Swipe left to right and set focus on 'Username' textbox, 'Password' textbox and Login button | Focus should set on each listed elements |

---
## TC-002-Talkback - Label announcement on elements from Login page
- **Title:** Label announcement on elements from Login page
- **Section:** Login Page  
- **Priority:** High  
- **Platform:** Android
- **Execution Status:** Not run  
- **Estimated Time:** 2m  
- **Automation:** Manual  
- **TC_NO:** TC-002  
- **Precondition:** Download Instagram application from Play Store or App Store and turn on [voiceover](https://support.apple.com/en-in/guide/iphone/iph3e2e415f/ios) from the device setting

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram and navigate ot the login page | Make sure login page rander properly |
| 2  | Swipe left to right and set focus on 'Username' textbox, 'Password' textbox and Login button | 'Username' textbox, 'Password' textbox, Login button label is announced aloud by Voiceover |

-------------
## TC-003-Talkback - User can Interact with focused on each element from Login page
- **Title:** Label announcement on elements from Login page
- **Section:** Login Page  
- **Priority:** High  
- **Platform:** Android
- **Execution Status:** Not run  
- **Estimated Time:** 5m 
- **Automation:** Manual  
- **TC_NO:** TC-003
- **Precondition:** Download Instagram application from Play Store or App Store and turn on [voiceover](https://support.apple.com/en-in/guide/iphone/iph3e2e415f/ios) from the device setting

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram and navigate ot the login page | Make sure login page rander properly |
| 2  | Enter username, password and double tap on Login button by setting focus on it | User should login into the application |

-------------
## TC-004-Talkback - Image have descriptive content description
- **Title:** Images are announced with alternative text
- **Section:** Home Page  
- **Priority:** Mid  
- **Platform:** Android
- **Execution Status:** Not run  
- **Estimated Time:** 5m 
- **Automation:** Manual  
- **TC_NO:** TC-004
- **Precondition:** Download Instagram application from Play Store or App Store and turn on [voiceover](https://support.apple.com/en-in/guide/iphone/iph3e2e415f/ios) from the device setting

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram and navigate ot the login page | Make sure login page rander properly |
| 2  | Enter username, password and double tap on Login button by setting focus on it | User should login into the application |
| 3  | Swipe left to right and set focus on any image from the feed page | Voiceover announces the image description | 

