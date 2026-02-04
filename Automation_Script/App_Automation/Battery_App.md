## In this section we are just simply testing a navigation scenario

```
from appium import webdriver
from typing import Any, Dict
from appium.options.common import AppiumOptions
from appium.webdriver.common.appiumby import AppiumBy

cap:Dict[str, Any] = {
    "platformName": "Android",
    "automationName": "uiautomator2",
    "deviceName": "Android",
    "appPackage": "com.android.settings",
    "appActivity": ".Settings",

}

url = "http://localhost:4723"

driver = webdriver.Remote(url, options=AppiumOptions().load_capabilities(cap))
element = driver.find_element(by=AppiumBy.XPATH, value='//*[@text="Battery"]')

element.click()
driver.quit()

```


https://github.com/user-attachments/assets/9807f69e-2b4e-4b24-93f8-d0eb20a996cc


