import json
from selenium import webdriver 
import time 
import platform 
from termcolor import colored
from colorama import init, Fore, Back, Style
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.select import Select
from selenium.webdriver.support.ui import Select
from selenium.webdriver.firefox.options import Options
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import random
import requests
import webhook as wh
import data_crawler as dc

from random import choice

machine = platform.node()
init()

# Development Webhook
PATH = "..\..\drivers\chromedriver.exe"
url = "https://discord.com/api/webhooks/824223507213844551/zI3wHf3z9hO8y8HL1-N7zvmm9GcRa5rPhwp4gMli_Kh1HiKkQlX2SXo1KlFgGlJvHa Ox" # needs to be changed
DEBUG = False

# Production Webhook
# url = ""
# debug = False



class Logger:
    def __init__(self,app):
        self.app = app
    def info(self,message):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', 'yellow'))
    def warning(self,message):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', 'green'))
    def error(self,message):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', 'red'))
    def color(self,message,color):
        print(colored(f'{message}', "blue"))
logger = Logger("astro-aio")

def show_sizes(TASK,driver):
    val = TASK['size'] 
    # val = "07.5"
    size_btn = None
    try:
        # size_btn = driver.find_element_by_xpath("//SPAN[@class='c-form-label-content'][text()='{}']".format(val))
        size_btn = driver.find_element_by_xpath("//SPAN[@class='c-form-label-content'][text()='{}']".format(val))
        size_btn.click()
        logger.warning("Size Entered")
        time.sleep(5) 
    except Exception as error:
        logger.info("Something went wrong while selecting sizes")
        if DEBUG:
            logger.error("Error:" + str(error))

def payment(PROFILE,driver,TASK):
    
    # First Form Logic
    try:
        WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH,"//SECTION[@id='step1']")))
        logger.info("Filling Contact Information form")

        firstname = PROFILE['first_name']
        lastname = PROFILE['last_name']
        email = PROFILE['email'] 
        phone = PROFILE['phone']

        driver.find_element_by_xpath("//INPUT[@id='ContactInfo_text_firstName']").send_keys("{}".format(firstname)) # firstname
        time.sleep(3)
        driver.find_element_by_xpath("//INPUT[@id='ContactInfo_text_lastName']").send_keys("{}".format(lastname))  # lastname
        time.sleep(3)
        driver.find_element_by_xpath("//INPUT[@id='ContactInfo_email_email']").send_keys("{}".format(email))    # email
        time.sleep(3)
        driver.find_element_by_xpath("//INPUT[@id='ContactInfo_tel_phone']").send_keys("{}".format(phone))    # phone number
        time.sleep(3)
        
        driver.find_element_by_xpath("//INPUT[@id='ContactInfo_tel_phone']").send_keys(Keys.RETURN)
        logger.info(" Contact Information form filled")
    except Exception as error:
        logger.info("Something Went Wrong")
        if DEBUG:
            logger.error("Error: " + str(error))
    
    # Second Form - Package Options Logic
    try:
        WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH,"//SECTION[@id='step2']")))
        logger.info("Filling package options logic")

        address = PROFILE['address']
        postal = PROFILE['postal']

        driver.find_element_by_xpath("//INPUT[@id='ShippingAddress_text_line1']").send_keys("{}".format(address)) # shipping address
        time.sleep(3)
        driver.find_element_by_xpath("//INPUT[@id='ShippingAddress_text_postalCode']").send_keys("{}".format(postal)) # Postal Code
        time.sleep(5)
        driver.find_element_by_css_selector("#step2 > div.Checkout-fulfillment > div.ButtonWrapper.gutter--flush > button").click() # Save and continue
        try:
            WebDriverWait(driver,15).until(EC.presence_of_element_located((By.CSS_SELECTOR,".ButtonWrapper > button:nth-child(1))")))
            driver.find_element_by_css_selector(".ButtonWrapper > button:nth-child(1))").click()
        except Exception as error:
            logger.info("Second Confirm Button wasn't found, continuing with the transaction process")
        logger.warning("Completed Filling Package Options Form")

        # pop up confirm
        try:
            WebDriverWait(driver,15).until(EC.presence_of_element_located((By.CSS_SELECTOR,"#AddressLookup > div.Buttons.col.col-full > button")))
            time.sleep(3)
            driver.find_element_by_css_selector("#AddressLookup > div.Buttons.col.col-full > button").click()
            logger.info('First popup was closed')
            logger.warning("Confirming the Package Options")
        except Exception as error:
            logger.info("The pop up didn't execute")
        
        try:
            WebDriverWait(driver,15).until(EC.presence_of_element_located((By.LINK_TEXT,"Save & Continue")))
            driver.find_element_by_link_text("Save & Continue").click()
            logger.info("Second pop was closed - 1")
            time.sleep(5)
        except Exception as error:
            if DEBUG:
                logger.error("Dev Error: " + str(error))
        
        try:
            WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH,"//SPAN[@aria-label='close']")))
            driver.find_element_by_xpath("//SPAN[@aria-label='close']").click()
            logger.info("Second pop up was closed - 2")
            time.sleep(5)
        except Exception as error:
            if DEBUG:
                logger.error("Dev Error: " + str(error))
            
        try:
            WebDriverWait(driver,15).until(EC.presence_of_element_located((By.CSS_SELECTOR,"#AddressLookup > div.Buttons.col.col-full > button]")))
            driver.find_element_by_css_selector("#AddressLookup > div.Buttons.col.col-full > button]").click()
            logger.info("Second pop up was closed - 3")
            time.sleep(5)
        except Exception as error:
            if DEBUG:
                logger.error("Dev Error: " + str(error))
                
        try:
            WebDriverWait(driver,15).until(EC.presence_of_element_located((By.LINK_TEXT,"Save & Continue")))
            driver.find_element_by_link_text("Save & Continue").click()
            logger.info("Second pop was closed - 1 after 3")
            time.sleep(5)
        except Exception as error:
            if DEBUG:
                logger.error("Dev Error: " + str(error))
        

    except Exception as error:
        logger.info("Something Went Wrong")
        if DEBUG:
            logger.error("Error: "+ str(error))

        # consider these 2 options
        driver.find_element_by_xpath("//INPUT[@id='ShippingAddress_text_town']").send_keys("NEW YORK") # City

        # # Select Country from the dropdown list
        # WebDriverWait(driver,15).until(EC.presence_of_element_located((By.ID,"ContactInfo_select_country")))
        # select_country_btn = driver.find_element_by_id("ContactInfo_select_country")
        # drp = Select(select_country_btn)
        # logger.info("Countries that are available to ship to, (currently) : ")
        # all_options = drp.options
        # for country in all_options:
        #     logger.info(country.text)
        # logger.info("Please Enter the Country Name exactly as per given in above. Check your spellings, if wrong, website might reject it... ")
        # logger.info("Enter the Country: ")
        # country_val = input()
        # drp.select_by_visible_text("{}".format(country_val))
        # logger.info('Country Entered as {}'.format(country_val))
        # submit_btn1 = driver.find_element_by_xpath("")
        # submit_btn1.click()
        # logger.info("The First Form was Filled Successfully! ")

    #     # State Dropdown select
    #     select_state_btn = driver.find_element_by_id("ShippingAddress_select_region")
    #     drp = Select(select_state_btn)
    #     logger.info("States that are available to ship to, (currently) : ")
    #     all_options = drp.options
    #     for provinces in all_options:
    #         logger.info(provinces.text)
    #         logger.info("Please Enter the Name of Province exactly as per given in above. Check your spellings, if wrong, website might reject it... ")
    #     try:
    #         logger.info("Enter the Province: ")
    #         # province_val = input()
    #         state_val = "New York"
    #         drp.select_by_visible_text("{}".format(state_val))
    #         logger.info('state Entered as {}'.format(state_val))
    #         driver.find_element_by_css_selector("step2 > div.Checkout-fulfillment > div.ButtonWrapper.gutter--flush > button").click() # Save and continue
    #         logger.warning("Completed Filling Package Options Form")
    #     except Exception as error:
    #         logger.info("You might have entered the wrong Value, please Recheck it.")
    #         if DEBUG:
    #             logger.error("ERROR: "+ str(error))
    # except Exception as error:
    #         logger.error("Something went wrong while Entering Details in 2nd form")
    #         if DEBUG:
    #             logger.error("ERROR: " + str(error))

    # Card Details
    try:
        time.sleep(10)
        WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH,"//SECTION[@id='step3']")))
        logger.warning('Filling the Payment Details')

        card_number = PROFILE['card_number']
        card_expiry_month = PROFILE['card_expiry_month']
        card_expiry_year = PROFILE['card_expiry_year']
        card_cvv = PROFILE['card_cvv']
        
        
        card_iframe = driver.find_element_by_xpath('/html/body/div[1]/div/main/div/div[2]/div/section/section[3]/div[2]/div[2]/div/div[1]/form/div[2]/div/div[1]/div[1]/span/iframe')
        month_iframe = driver.find_element_by_xpath('/html/body/div[1]/div/main/div/div[2]/div/section/section[3]/div[2]/div[2]/div/div[1]/form/div[2]/div/div[1]/div[2]/div[1]/span/iframe')                                             
        year_iframe = driver.find_element_by_xpath('/html/body/div[1]/div/main/div/div[2]/div/section/section[3]/div[2]/div[2]/div/div[1]/form/div[2]/div/div[1]/div[2]/div[2]/span/iframe')
        csc_iframe = driver.find_element_by_xpath('/html/body/div[1]/div/main/div/div[2]/div/section/section[3]/div[2]/div[2]/div/div[1]/form/div[2]/div/div[1]/div[2]/div[3]/span/iframe')
            
            
        driver.switch_to.frame(card_iframe)
        driver.find_element_by_tag_name('input').send_keys(card_number)
        driver.switch_to.default_content()
        time.sleep(3)
        
        
        driver.switch_to.frame(month_iframe)    
        driver.find_element_by_tag_name('input').send_keys(card_expiry_month)
        driver.switch_to.default_content()    
        time.sleep(3)
        
        driver.switch_to.frame(year_iframe)
        driver.find_element_by_tag_name('input').send_keys(card_expiry_year)
        driver.switch_to.default_content()
        time.sleep(3)
        
        driver.switch_to.frame(csc_iframe)     
        driver.find_element_by_tag_name('input').send_keys(card_cvv)
        driver.switch_to.default_content()
        time.sleep(3) 

        logger.warning("Proceeding to Checkout... ")
    except Exception as error:
        logger.info("Something Went Wrong")
        if DEBUG:
            logger.error("ERROR: " + str(error))
    
    # final Place order Button
    try:
        time.sleep(3)
        driver.find_element_by_xpath("//BUTTON[@aria-describedby='placeOrderDescription'][text()='Place Order']").click()
        logger.warning("Placed The Order")
        
        product_name = dc.view_details(TASK['link'], TASK['store'])
        wh.success(TASK['link'],product_name,TASK['store'],TASK['link'],TASK['size'])
    except Exception as error:
        logger.info("Something Was Wrong")
        if DEBUG:
            logger.error("Error: " + str(error))

def main_func(TASK,PROFILE,driver):
        link = TASK['link']
        driver.get("{}".format(str(link)))

        logger.warning("Connected Successfully")

        # Check for pop up and close it.
        try:
            close_btn = WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH, "//*[@id='bluecoreEmailCaptureForm']/div/div[2]/div[11]/button")))
            close_btn = driver.find_element_by_xpath("//*[@id='bluecoreEmailCaptureForm']/div/div[2]/div[11]/button")
            close_btn.click()
            logger.warning("The Pop up has been Found and closed")
        except Exception as error:
            logger.info("Pop Up Wasn't Found!")
            if DEBUG:
                logger.error("ERROR: " + str(error))

        # close the notification
        try:
            close_btn = WebDriverWait(driver,10).until(EC.presence_of_element_located((By.XPATH,"(//SPAN[@class='Icon'])[1]")))
            close_btn = driver.find_element_by_xpath("(//SPAN[@class='Icon'])[1]")
            close_btn.click()
            logger.warning("Closed the Notifications")
        except Exception as error:
            logger.info("Notification button was not closed")
            if DEBUG:
                logger.error("Error: " + str(error))


        # Agree to policy updates
        try:
            policy_update = WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH,"//*[@id='touAgreeBtn']")))
            policy_update = driver.find_element_by_xpath("//*[@id='touAgreeBtn']")
            policy_update.click()
            logger.warning("Agreed to the new Policy Updates, Proceeding to Selecting Size")
        except Exception as error:
            logger.error("Something Went Wrong")
            if DEBUG:
                logger.error("ERROR: " + str(error))

        # Show Sizes
        show_sizes(TASK,driver)

        # Add To Cart
        add_to_cart = None
        try:
            add_to_cart = WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH, "//BUTTON[@type='submit'][text()='Add To Cart']")))
            add_to_cart = driver.find_element_by_xpath("//BUTTON[@type='submit'][text()='Add To Cart']")
            add_to_cart.click()
            logger.warning("Added to Cart")
            time.sleep(5)
        except Exception as error:
            logger.error("Something Went Wrong")
            if DEBUG:
                logger.error("Error: " + str(error))

        # View Cart Button
        view_cart = None
        try:
            view_cart = WebDriverWait(driver,10).until(EC.presence_of_element_located((By.XPATH,"//A[@class='Button Button--alt fullWidth'][text()='View Cart']")))
            view_cart = driver.find_element_by_xpath("//A[@class='Button Button--alt fullWidth'][text()='View Cart']")
            view_cart.click()
        except Exception as error:
            logger.error("Something Went Wrong")
            if DEBUG:
                logger.error("Error: " + str(error))
        
        # guest checkout
        guest_checkout = None
        try:
            time.sleep(5)
            guest_checkout = WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH,"//A[@role='button'][text()='Guest Checkout']")))
            # guest_checkout = driver.find_element_by_xpath("//A[@role='button'][text()='Guest Checkout']")
            # guest_checkout.click()
            guest_checkout = driver.find_element_by_xpath("//A[@role='button'][text()='Guest Checkout']")
            driver.execute_script("arguments[0].click();", guest_checkout)
            time.sleep(5)
            # element = WebDriverWait(driver, 20).until(EC.element_to_be_clickable((By.XPATH, "//A[@role='button'][text()='Guest Checkout']"))
            # ActionChains(driver).move_to_element(element).click().perform() 
        except Exception as error:
            logger.error("Something Went Wrong")
            if DEBUG:
                logger.error('Error: ' + str(error))

        # payment logic
        payment(PROFILE,driver,TASK)



# DRIVER CODE
# if __name__ == '__main__':
def initialize(TASK,PROFILE,PROXY):
    options = webdriver.ChromeOptions()
    user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"

    
    if PROXY != None:
        proxy_choice = random.choice(PROXY['proxy'])
        options.add_argument('--proxy-server={}'.format(proxy_choice))
    
    options.headless = True
    options.add_argument(f'user-agent={user_agent}')
    options.add_argument("--window-size=1920,1080")
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--allow-running-insecure-content')
    options.add_argument("--disable-extensions")
    options.add_argument("--proxy-server='direct://'")
    options.add_argument("--proxy-bypass-list=*")
    options.add_argument("--start-maximized")
    options.add_argument('--disable-gpu')
    options.add_argument("--log-level=3")
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--no-sandbox')
    
    driver = webdriver.Chrome(executable_path=PATH,chrome_options=options)
    main_func(TASK,PROFILE,driver)
    # main_func("https://www.footlocker.com/product/nike-air-force-1-07-le-mens/W2288111.html")
    


