# iOS hardware flexibility - Test Cases

> Note : These are illustrative test cases. Actual implementations may vary depending on device coverage, OS versions, or QA processes.

## Scope
- Layout responsiveness across different screen sizes and orientations
- System-level font scaling and accessibility configurations
- Split-screen and multitasking functionality
- Compatibility with notch displays
- Dark mode and high-contrast UI behavior

## Exclusions
- Android-specific layout validation – [see](https://github.com/jayjoshi603/QA-Portfolio/blob/b0c22b720fa3622ff1390106adfb5d6fc5c02bca/Test_Cases/Mobile/Hardware%20Flexibility/Android_Testing.md)


### TC-001-ADEPT-AND – Layout across iOS screen sizes
- **Title:** Validate layout rendering on small, medium, and large Android devices
- **Section:** iOS Device Adaptability  
- **Priority:** High  
- **Platform:** iOS
- **Execution Status:** Passed  
- **Estimated Time:** 1m  
- **Automation:** Manual  
- **TC_NO:** TC-001  
- **Precondition:** Download Instagram application from Play Store or App Store  

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Launch Instagram on iPhone SE device | Application should display without cutout or overlap |
| 2  | Launch Instagram on iPhone 15 device | Application should display without cutout or overlap |
| 3  | Launch Instagram on iPhone 17 Pro Max device | Application should display without cutout or overlap |
| 3  | Launch Instagram on iPad | Application should display without cutout or overlap |
---

### TC-002-ADEPT-AND – Accessibility font scaling
- **Title:** Validate layout with system font scaling enabled
- **Section:** iOS Device Adaptability  
- **Priority:** Mid  
- **Platform:** iOS
- **Execution Status:** Passed  
- **Estimated Time:** 1m  
- **Automation:** Manual  
- **TC_NO:** TC-002  
- **Precondition:** Download Instagram application from Play Store or App Store  

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Set device font to large and open the Instagram application | Application font size should increased |
| 2  | Navigate through the screens | Content remains readable and accessible |
---

### TC-002-ADEPT-AND – Accessibility font scaling
- **Title:** Validate layout with system font scaling enabled
- **Section:** iOS Device Adaptability  
- **Priority:** Mid  
- **Platform:** iOS
- **Execution Status:** Passed  
- **Estimated Time:** 1m  
- **Automation:** Manual  
- **TC_NO:** TC-002  
- **Precondition:** Download Instagram application from Play Store or App Store  

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Set device font to large and open the Instagram application | Application font size should increased |
| 2  | Navigate through the screens | Content remains readable and accessible |
---

### TC-003-ADEPT-AND – Notch device layout
- **Title:**  Validate layout on foldable Android devices
- **Section:** iOS Device Adaptability  
- **Priority:** Mid  
- **Platform:** iOS
- **Execution Status:** Passed  
- **Estimated Time:** 1m  
- **Automation:** Manual  
- **TC_NO:** TC-003  
- **Precondition:** Download Instagram application from Play Store or App Store  

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Launch the application in the notch device screen | Application layout fits the screen |
| 2  | Launch the application on dynamic island device | Application layout fits the screen |
---

### TC-004-ADEPT-AND – Dark mode and contrast testing
- **Title:**  Validate layout on foldable Android devices
- **Section:** iOS Device Adaptability  
- **Priority:** Mid  
- **Platform:** Android
- **Execution Status:** Passed  
- **Estimated Time:** 1m  
- **Automation:** Manual  
- **TC_NO:** TC-003  
- **Precondition:** Download Instagram application from Play Store or App Store 

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Enable dark mode from the device settings | Application switches to the dark theme |
| 2  | Launch the application | Application UI elements adaput to dark background |
| 3  | Enable high contrast mode from the device setting and launch the application | Make sure Text and icons remain visible and readable |
---
