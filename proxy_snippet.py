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

PATH = ".\chromedriver.exe"
    
proxies_avail = [
    "123.123.123.123:8000",
    "123.123.123.123:8100",
    "123.123.123.123:8200",
    "123.123.123.123:8300",
]
proxy_use = random.choice(proxies_avail)

def eg(proxies_avail):
    for i in range(0, len(proxies_avail)):
        try:
            print("Proxy selected: {}".format(proxies_avail[i]))
            options = webdriver.ChromeOptions()
            options.add_argument('--proxy-server={}'.format(proxies_avail[i]))
            user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"    
            options.headless = False
            # options.add_argument('--proxy-server=%s' % PROXY)
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
            options.add_argument("start-maximized")
            options.add_experimental_option("excludeSwitches", ["enable-automation"])
            options.add_experimental_option('useAutomationExtension', False)
            driver = webdriver.Chrome(options=options, executable_path=PATH)
            driver.get("https://www.footlocker.com/product/nike-air-force-1-07-le-mens/W2288111.html")
            if (WebDriverWait(driver,45).until(EC.presence_of_element_located(By.XPATH, "(//BUTTON[@type='submit'][text()='Add To Cart'])[2]"))):
                break
        except Exception:
            driver.quit()
