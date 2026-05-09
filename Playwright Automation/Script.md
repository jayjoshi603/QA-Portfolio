from playwright.sync_api import sync_playwright
with sync_playwright() as playwright:

    #Launch a new browser instance
    browser = playwright.firefox.launch(headless=False, slow_mo=1000)
    #Create a new page and navigate to Google
    page = browser.new_page()
    page.goto("https://bootswatch.com/default")
    
    #locate a linked element and click on it
    #locators are used to find elements on a page. They can be based on text, role, CSS selectors, etc.
    button = page.get_by_role("button", name="Small button")
    button.highlight()
    button.click()
    slow_mo=1000
    
    #Get heading within the page and print its text content
    heading = page.get_by_role("heading", name="Heading 2")
    heading.highlight()
    print("Heading:", heading.text_content())
    slow_mo=1000
    
    # Locate radio button and click on it
    rbn = page.get_by_role("radio", name="Option two can be something else and selecting it will deselect option one")
    rbn.highlight()
    rbn.click()
    slow_mo=1000
    
    #find perticular text on the page and print it
    page.get_by_text("fine print").highlight()
    #get the url of the current page and print it
    print("Small button:",page.url)
    
    #get Alt text of the image and print it
    # new_tab = browser.new_page()
    # new_tab.goto("https://unsplash.com")
    # image = new_tab.get_by_alt_text("Misty mountains with green slopes and trees")
    # image.highlight()
    # print(image)

    # get by title attribute and print it
    title = page.get_by_title("attribute")
    title.highlight()
    print("Title is:", title)
    slow_mo=1000
    
    #get by css selector and print it
    css_selector = page.locator("css=h1")
    css_selector.highlight()
    print("CSS Selector:", css_selector)
    slow_mo=1000

    by_button = page.locator("button.btn-outline-success")
    by_button.highlight()
    print("By button:", by_button)
    slow_mo=1000

    dropdown_button = page.locator("button#btnGroupDrop2")
    # dropdown_button.highlight()
    dropdown_button.click()

    #read only field such as pre defined email field
    email = page.locator("input[readonly]")
    email.highlight()
    
    #find an element like textbox using pre defined attribute
    textbox = page.locator("input[value='correct value']")
    textbox.highlight()

    #Enter text into a textbox
    email_field = page.locator("input[id='exampleInputEmail1']")
    email_field.fill("abc@gmail.com")
    slow_mo=1000

    #navigate elements using css selector
    css_nav = page.locator("nav.bg-dark a.nav-link.active")
    css_nav.highlight()
    print("CSS Navigation:", css_nav)

    #Select element using xpath and print its text content
    xpath_selector = page.locator("//div[@class='btn-group-vertical']//button[1]")
    xpath_selector.highlight()
    print("XPath Selector:", xpath_selector.text_content())

    #If you want to select all elements using xpth and print their text content
    select_h1 = page.locator("xpath=//h1")
    select_h1.highlight()
    print("All h1 elements:", select_h1.all_text_contents())

    #Select element using Xpath, attribute and it's value [id is attribute and typography is value] and print its text content
    xpath_attr = page.locator("xpath=//h1[ @id='typography']")
    xpath_attr.highlight()
    print("XPath with attribute:", xpath_attr.text_content())

    #Select element using Xpath and text function and print its text content
    xpath_text = page.locator("xpath=//h4 [ text () = 'Heading 4' ]")
    xpath_text.highlight()
    print("XPath with text function:", xpath_text.text_content())


    browser.close()
