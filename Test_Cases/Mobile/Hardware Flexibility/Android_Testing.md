# Android hardware flexibility - Test Cases

> Note : These are illustrative test cases. Actual implementations may vary depending on device coverage, OS versions, or QA processes.

## Scope
- Layout responsiveness across different screen sizes and orientations
- System-level font scaling and accessibility configurations
- Split-screen and multitasking functionality
- Compatibility with foldable devices and notch displays
- Dark mode and high-contrast UI behavior

## Exclusions
- iOS-specific layout validation – see 


### TC-001-ADEPT-AND – Layout across Android screen sizes
- **Title:** Validate layout rendering on small, medium, and large Android devices
- **Section:** Android Device Adaptability  
- **Priority:** High  
- **Platform:** Android
- **Execution Status:** Passed  
- **Estimated Time:** 1m  
- **Automation:** Manual  
- **TC_NO:** TC-001  
- **Precondition:** Download Instagram application from Play Store or App Store  

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Launch Instagram on <5 inch device screen | Application should display without cutout or overlap |
| 2  | Launch Instagram on 6 inch device screen | Application should display without cutout or overlap |
| 3  | Launch Instagram on a tablet device screen | Application should display without cutout or overlap |
---

### TC-002-ADEPT-AND – Accessibility font scaling
- **Title:** Validate layout with system font scaling enabled
- **Section:** Android Device Adaptability  
- **Priority:** Mid  
- **Platform:** Android
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

### TC-003-ADEPT-AND – Foldable device layout
- **Title:**  Validate layout on foldable Android devices
- **Section:** Android Device Adaptability  
- **Priority:** Mid  
- **Platform:** Android
- **Execution Status:** Passed  
- **Estimated Time:** 1m  
- **Automation:** Manual  
- **TC_NO:** TC-003  
- **Precondition:** Download Instagram application from Play Store or App Store  

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Launch the application in the folded state | Application layout fits compact screen |
| 2  | Unfold the device | Application layout expends and reflects perfectly |
| 3  | Again fold the device | Make sure UI returns to compact layout without glitches |
---

### TC-004-ADEPT-AND – Dark mode and contrast testing
- **Title:**  Validate layout on foldable Android devices
- **Section:** Android Device Adaptability  
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

