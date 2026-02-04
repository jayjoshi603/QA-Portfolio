## In this I've tested Chrome app and CNN website inside it

```
from appium import webdriver
from typing import Any, Dict
from appium.options.common import AppiumOptions
from appium.webdriver.common.appiumby import AppiumBy

from selenium.webdriver import Keys
import time

cap:Dict[str, Any] = {
    "platformName": "Android",
    "automationName": "uiautomator2",
    "deviceName": "Android",


}

url = "http://localhost:4723"

driver = webdriver.Remote(url, options=AppiumOptions().load_capabilities(cap))
element = driver.find_element(by=AppiumBy.ACCESSIBILITY_ID, value='Chrome')
element.click()
search = driver.find_element(by=AppiumBy.XPATH, value="//*[@text = 'Search or type web address']")
search.send_keys("CNN")
# search.send_keys(Keys.RETURN)
FE = driver.find_element(by=AppiumBy.XPATH, value="//*[@text = 'CNN']")
FE.click()

## To navigate to the website from the search result
website_navigation = driver.find_element(by=AppiumBy.XPATH, value='//android.view.View[@text="CNN"]')
website_navigation.click()
time.sleep(5)

## To return the device dimensions 
deviceSize = driver.get_window_size()
print(deviceSize)
width = deviceSize['width']
height = deviceSize['height']
print(width, height)


## Find a title for the Website
title =driver.title
print(title)

#Navigating to the next page
nav_next_page = driver.find_element(by=AppiumBy.XPATH, value='//android.widget.TextView[@text="Science"]')
nav_next_page.click()
time.sleep(5)

##Opening news stories
Open_Stories = driver.find_element(by=AppiumBy.ID, value="00000000-0000-00f2-0000-4bb5000000ec")
Open_Stories.click()
time.sleep(5)

##Navigating back from the respective page
driver.back()
time.sleep(5)

driver.quit()

```
