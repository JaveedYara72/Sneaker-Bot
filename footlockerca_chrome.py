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
from random import choice
import webhook as wh
import data_crawler as dc

machine = platform.node()

class Logger:
    """
    This class handles colored printing over the console
    :params: None
    :return: None
    :object: 'astro-aio'
    """
    def __init__(self,app):
        self.app = app
    def info(self,message):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', 'yellow'))
    def warning(self,message):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', 'green'))
    def error(self,message):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', 'red'))
    def custom_color(self,message,custom_color):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', custom_color))
logger = Logger("astro-aio")

# GLOBAL VARIABLES
PATH = "..\..\drivers\chromedriver.exe"
DEBUG = False # Turned off if the application is not running on development 

def show_sizes(TASK,driver):
    """
    This module is used to show sizes available
    :params: TASK(dict), driver(selenium instance)
    :return: None
    """
    # val = input('Enter Your Size: ')
    val = TASK['size'] 

    size_btn = None
    try:
        size_btn = driver.find_element_by_xpath("//SPAN[@class='c-form-label-content'][text()='{}']".format(val))
        size_btn.click()
        logger.warning("Size Entered")
        time.sleep(5) 
    except Exception as error:
        logger.error("Something went wrong while selecting sizes")
        if DEBUG:
            logger.error("Error:" + str(error))

def main_func(TASK,PROFILE,driver):
    """ 
    This module covers the functionality required to checkout for this footlockerca.com 
    :params: TASK(dict), PROFILE(dict), driver(selenium instance)
    :return: None
    """
    link = TASK['link']
    driver.get("{}".format(str(link)))

    logger.warning("Connected Successfully")

    # Check for pop up
    try:
        close_btn = WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH, "//*[@id='bluecoreEmailCaptureForm']/div/div[2]/div[11]/button")))
        close_btn = driver.find_element_by_xpath("//*[@id='bluecoreEmailCaptureForm']/div/div[2]/div[11]/button")
        close_btn.click()
        logger.warning("The Pop up has been Found and closed")
    except Exception as error:
        logger.error("The Pop Wasn't Found, Continuing Shopping! ")

    # Show Sizes
    show_sizes(TASK,driver)

    add_to_cart = None
    try:
        add_to_cart = WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH, "(//BUTTON[@type='submit'][text()='Add To Cart'])[2]")))
        add_to_cart = driver.find_element_by_xpath("(//BUTTON[@type='submit'][text()='Add To Cart'])[2]")
        add_to_cart.click()
        logger.warning("Added to Cart")
        post_captcha(PROFILE,driver,TASK)
        time.sleep(5)
    except Exception as error:
        logger.error("It wasn't added to cart, the button wasn't found.")
        if DEBUG:
            logger.warning("Error: " + str(error))

def post_captcha(PROFILE,driver,TASK):
    """
    This module covers all the operations required after adding to cart
    :params: PROFILE(dict), driver(selenium instance)
    :Return: None
    """
    # View Cart Button
    try:
        view_cart_btn = WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH,"//A[@class='Button Button--alt fullWidth'][text()='View Cart']")))
        view_cart_btn = driver.find_element_by_xpath("//A[@class='Button Button--alt fullWidth'][text()='View Cart']")
        time.sleep(10)
        view_cart_btn.click()
    except Exception as error:
        logger.error("View Cart Button was not clickable")
        if DEBUG:
            logger.warning("Error: " + str(error))

    # Use Guest Checkout
    try:
        guest_checkout_btn = WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH,"//A[@role='button'][text()='Guest Checkout']")))
        guest_checkout_btn = driver.find_element_by_xpath("//A[@role='button'][text()='Guest Checkout']")
        time.sleep(10)
        guest_checkout_btn.click()
        logger.warning("Checking Out as a Guest!. ")
    except Exception as error:
        logger.error("Guest Checkout Was not Possible")
        if DEBUG:
            logger.warning("Error: " + str(error))

    # Fill Up the Forms
    try:
        WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH,"//SECTION[@id='step1']")))
        logger.info('Filling up the Form now..')

        firstname = PROFILE['first_name']
        lastname = PROFILE['last_name']
        email = PROFILE['email']
        phone = PROFILE['phone']

        driver.find_element_by_xpath("//INPUT[@id='ContactInfo_text_firstName']").send_keys("{}".format(firstname)) # firstname
        driver.find_element_by_xpath("//INPUT[@id='ContactInfo_text_lastName']").send_keys("{}".format(lastname))  # lastname
        driver.find_element_by_xpath("//INPUT[@id='ContactInfo_email_email']").send_keys("{}".format(email))    # email
        driver.find_element_by_xpath("//INPUT[@id='ContactInfo_tel_phone']").send_keys("{}".format(phone))    # phone number

        driver.find_element_by_xpath("//INPUT[@id='ContactInfo_tel_phone']").send_keys(Keys.RETURN)
        logger.info('Considering we are not selecting the Country')
        logger.warning('Filled up the Main Form! ')
    except Exception as error:
        logger.error("The bot was not able to fill the First Form")
        if DEBUG:
            logger.warning("Error: " + str(error))

    # 2.Package Options Logic
    try:
        logger.info('2. Entering Package options Logic')
        WebDriverWait(driver,15).until(EC.presence_of_element_located((By.XPATH,"//SECTION[@id='step2']")))

        address = PROFILE['address']
        postal = PROFILE['postal']
        city = PROFILE['city']
        province = PROFILE['province']

        driver.find_element_by_xpath("//INPUT[@id='ShippingAddress_text_line1']").send_keys("{}".format(address)) # shipping address
        driver.find_element_by_xpath("//INPUT[@id='ShippingAddress_text_postalCode']").send_keys("{}".format(postal)) # Postal Code
        driver.find_element_by_xpath("//INPUT[@id='ShippingAddress_text_town']").send_keys("{}".format(city))    # city
        
        # province logic
        select_province_btn = driver.find_element_by_id("ShippingAddress_select_region")
        drp = Select(select_province_btn)
        logger.info("Provinces that are available to ship to, (currently) : ")
        all_options = drp.options
        for provinces in all_options:
            logger.info(provinces.text)
        logger.info("Please Enter the Name of Province exactly as per given in above. Check your spellings, if wrong, website might reject it... ")
        try:
            logger.info("Enter the Province: ")
            province_val = province
            drp.select_by_visible_text("{}".format(province_val))
            logger.info('Province Entered as {}'.format(province_val))
        except Exception as error:
            logger.error("You might have entered the wrong Value, please Recheck it.")
            if DEBUG:
                logger.error("ERROR: "+ str(error))
    except Exception as error:
        logger.error("Something went wrong while Entering Details in 2nd form")
        if DEBUG:
            logger.error("ERROR: " + str(error))

    # Save and Continue
    try:
        driver.find_element_by_css_selector("#step2 > div.Checkout-fulfillment > div.ButtonWrapper.gutter--flush > button").click()
        logger.warning("The Second Form was Filled Successfully! ")
    except Exception as error:
        logger.error("Second Form's Submit Button was not Found! ")
        if DEBUG:
            logger.error("ERROR: " + str(error))


    # 3.Payment Logic
    try:
        WebDriverWait(driver,20).until(EC.presence_of_element_located((By.XPATH,"//SECTION[@id='step3']")))
        logger.warning("Step 3 found, Payment Info to be Given Input. ")
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

        logger.warning("Card Details Entered, proceeding to Checking out and placing the order. ")
        logger.warning("Proceeding to Checkout... ")

    except Exception as error:
        logger.error("Something Went Wrong while Entering the Payment Details")
        if DEBUG:
            logger.error("ERROR: " + str(error))

    # 5.Final Confirmation
    try:
        checkout_btn = driver.find_element_by_xpath("//BUTTON[@aria-describedby='placeOrderDescription'][text()='Place Order']")
        checkout_btn.click()
        logger.warning("Place Order Clicked")
        # WEBHOOK INTEGRATION - GOES HERE
        
        product_name = dc.view_details(TASK['link'], TASK['store'])
        wh.success(TASK['link'],product_name,TASK['store'],TASK['link'],TASK['size'])
    except Exception as error:
        logger.error("Something Went Wrong while clicking Place Order Button ")
        if DEBUG:
            logger.error("ERROR: " + str(error))

def initialize(TASK,PROFILE, PROXY):
    """
    This module is responsible for initializing selenium instance. 
    :params: TASK(dict), PROFILE(dict), PROXY(dict)
    :return: None
    """

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
