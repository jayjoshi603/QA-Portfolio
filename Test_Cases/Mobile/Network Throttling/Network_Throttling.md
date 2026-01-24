# Mobile Connectivity – Network Throttling Test Scenarios


> Note : These scenarios are illustrative. Actual implementation depends on available tools and project design.


## Scope
- Performance under reduced bandwidth (4G, 5G, throttled Wi-Fi)
- Offline detection and fallback mechanisms
- Retry logic and sync failure handling
- Network switching and reconnection flows
- Behavior with unstable Wi-Fi and mid-transaction interruption

# Out of Scope
- Battery usage → 
- Security → Connectivity_Security.md
- Crash handling → Stability module

# Test Scenarios
### TC-001-Net -– Performance under reduced bandwidth 
- **Title:** Validate Performance under reduced bandwidth (2G, 4G, 5G & WIFI)
- **Section:** Connectivity_Switch
- **Priority:** High  
- **Platform:** Android & iOS
- **Execution Status:** Passed  
- **Estimated Time:** 10m  
- **Automation:** Manual  
- **TC_NO:** TC-001
- **Precondition:** Download Instagram application from Play Store or App Store  

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Device connected via simulator throttled to 2G | Open application and splash screen displays |
| 2  | Open explore page with heavy content | Spinner shows and make sure partial explore page load |
| 3  | Perform setp 1 and 2 with 4G and 5G network | Content should load without any error |
--------------

### TC-002-Net -– Wi-Fi to LTE switch mid-session
- **Title:** Handling network transition
- **Section:** Connectivity_Switch 
- **Priority:** High  
- **Platform:** Android & iOS
- **Execution Status:** Passed  
- **Estimated Time:** 10m  
- **Automation:** Manual  
- **TC_NO:** TC-002
- **Precondition:** Download Instagram application from Play Store or App Store, make sure user connected ti wifi 

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram application and navigate to the feed page | Make sure feed should started loading |
| 2  | Disable wifi and turn on LTE (Mobile data) | Feed should resume loading automatically  |
--------------

### TC-003-Net -– Offline fallback
- **Title:** App behavior without connectivity
- **Section:** Connectivity_Switch 
- **Priority:** High  
- **Platform:** Android & iOS
- **Execution Status:** Passed  
- **Estimated Time:** 5m  
- **Automation:** Manual  
- **TC_NO:** TC-003
- **Precondition:** Download Instagram application from Play Store or App Store, turn off wifi or LTE connection

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram application and navigate to the feed page | Make sure cached data display|
| 2  | Try to scroll the feed page and load new data | User should see "NO Connection" error meesage |
--------------

### TC-004-Net -– Unstable Wi-Fi during load
- **Title:** UI response to intermittent signal
- **Section:** Connectivity_Switch 
- **Priority:** Mid  
- **Platform:** Android & iOS
- **Execution Status:** Passed  
- **Estimated Time:** 5m  
- **Automation:** Manual  
- **TC_NO:** TC-004
- **Precondition:** Download Instagram application from Play Store or App Store, Wi-Fi signal fluctuating (via proxy/router)

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram application and navigate to the Direct message page | Make sure inbox load properly |
| 2  | Open 1:1 chat and send video from the gallery | Spinner appears and retry or “Connection unstable” message shows |
--------------

### TC-005-Net -– Reconnect after timeout
- **Title:** Sync retry after recovery
- **Section:** Connectivity_Switch 
- **Priority:** Mid  
- **Platform:** Android & iOS
- **Execution Status:** Passed  
- **Estimated Time:** 5m  
- **Automation:** Manual  
- **TC_NO:** TC-005
- **Precondition:** Download Instagram application from Play Store or App Store, Wi-Fi signal fluctuating (via proxy/router)

| No | Steps | Expected Result |
|----|-------|----------------|
| 1  | Open Instagram application and navigate to the Direct message page | Make sure inbox load properly |
| 2  | Open 1:1 chat and send video from the gallery and trned off network connection | Spinner appears and retry or “Connection unstable” message shows |
| 3  | Reenable network connection and tap on retry button | Message should send successfully |
--------------
