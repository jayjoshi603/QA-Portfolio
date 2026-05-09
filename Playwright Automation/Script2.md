# In this we're learning different mouse actions like click, double click, right click, hover and drag and drop.

``` from playwright.sync_api import sync_playwright
with sync_playwright() as playwright:
    #Launch a new browser instance
    browser = playwright.firefox.launch(headless=False, slow_mo=1000)
    #Create a new page and navigate to Google
    page = browser.new_page()
    page.goto("https://bootswatch.com/default")

    #locate a linked element and click on it / using dbclick(delay-500) - it will perform double click action with a delay of 500ms between the clicks
    btn1 = page.get_by_role("button", name="Large button")
    btn1.highlight()
    btn1.click()
    slow_mo=1000

    #Hover button and click on it
    btn2 = page.locator("button.btn-outline-primary")
    btn2.highlight()
    btn2.hover()
    slow_mo=1000

    #text action for input field / You can use input.clear() to clear the existing text before filling in new text.
    input_field = page.get_by_label("Email address")
    input_field.highlight()
    slow_mo=1000

    enter_mail = page.get_by_placeholder("Enter email")
    enter_mail.highlight()
    enter_mail.fill("abc@gmail.com")
    slow_mo=1000

    #Fetch Valid Value from the textbox
    valid_input = page.get_by_label("Valid input")
    valid_input.highlight()
    
    valid_input = page.get_by_label("Valid input").first
    print("Valid input:", valid_input.input_value())
    slow_mo=1000

    #Selecting different radio buttons
    rb1 = page.get_by_label("Option one is this and that—be sure to include why it's great")
    rb2 = page.get_by_label("Option two can be something else and selecting it will deselect option one")
    rb1.highlight()
    rb1.click()
    slow_mo=1000
    rb2.highlight()
    rb2.click()
    slow_mo=1000

    #Checked and Unchecked state of the checkbox
    checkbox1 = page.get_by_label("Default checkbox")
    checkbox1.highlight()
    checkbox2 = page.get_by_label("Checked checkbox")
    checkbox2.highlight()
    checkbox1.check()
    checkbox2.check()
    slow_mo=1000
    checkbox1.uncheck()
    checkbox2.uncheck()
    slow_mo=1000

    #Toggle action for checkbox for eg. toggle on and toggle off
    toggle_checkbox1 = page.get_by_label(" Default switch checkbox input")
    toggle_checkbox1.highlight()
    toggle_checkbox1.uncheck()
    toggle_checkbox1.check()
    slow_mo=1000
    toggle_checkbox2 = page.get_by_label("Checked switch checkbox input")
    toggle_checkbox2.highlight()
    toggle_checkbox2.uncheck()
    toggle_checkbox2.check()
    slow_mo=1000

    #Selecting an option from dropdown
    dropdown = page.get_by_label("Example select")
    dropdown.highlight()
    dropdown.click()
    dropdown.select_option("2")
    slow_mo=1000
    # dropdown_option = page.get_by_role("option", name="3")
    # dropdown_option.highlight()
    # dropdown_option.click()
    # slow_mo=1000

    #Selecting multiple options from dropdown
    multi_select = page.get_by_label("Example multiple select")
    multi_select.highlight()
    multi_select.select_option(["1", "3", "5"])
    

    #Select Links from the dropdown menu
    dropdown_button = page.locator("button#btnGroupDrop1")
    dropdown_button.highlight()
    dropdown_button.click()
    dropdown_option1 = page.locator("div.dropdown-menu:visible a:text('Dropdown link')").last
    # dropdown_option1.highlight()
    dropdown_option1.click()
    slow_mo=1000

    #upload file using file chooser
    file_upload = page.get_by_label("Default file input example")
    file_upload.highlight()
    upload_btn = page.locator("button", has_text="Browse...")
    upload_btn.set_input_files("C:/Users/jay12/Downloads/cover_letter.pdf")
    slow_mo=1000
    
    browser.close()
```
