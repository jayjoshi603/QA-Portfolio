This file contain a script which showcase different types of actions which we can using while writing an automation script
-----

```
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Open Firefox browser (make sure geckodriver is installed)
driver = webdriver.Firefox()

# Go to Instagram login page
driver.get("https://www.instagram.com/accounts/login/")
driver.maximize_window()

# Wait for page to load
time.sleep(3)

# Find username and password fields
username = driver.find_element(By.NAME, "username")
password = driver.find_element(By.NAME, "password")

# Enter login details
username.send_keys("reg.qa.03.")
time.sleep(2)
password.send_keys("bug123")
time.sleep(2)

# Click login button
login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
login_button.click()

# Wait to see result
time.sleep(2)

# Print Title
print(driver.title)

#Adding Loging Condition
if driver.title == "Login • Instagram":
    print("Login Successful")
else:
    print("Login Failed")

# Close browser
driver.quit()
```
*Output Video* 

https://github.com/user-attachments/assets/e584d276-dae8-4c8f-83c5-4959d5745d5a




