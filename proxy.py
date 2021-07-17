# Proxy Handler
# Logger imports
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

machine = platform.node()
init()

class Logger:
    """
    This class handles colored printing over the console
    :params: None
    :return: None
    :object: 'astro-aio'
    """
    def __init__(self,app):
        self.app = app
    def success(self,message):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', 'green'))
    def info(self,message):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', 'blue'))
    def warning(self,message):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', 'yellow'))
    def error(self,message):
        print(colored(f'[{time.asctime(time.localtime())}] [{machine}] [{self.app}] {message}', 'red'))
    def color(self,message,color):
        print(colored(f'{message}', color))
logger = Logger("astro-app")

def proxy_add(PROXIES):
    """
    This module is used for adding a proxy list into the main app
    :param: PROXIES (dict)
    :return: PROXIES (dict)
    """
    proxy_group = input("Enter proxy list name: ")
    lines = []    
    while True:    
        line = input("Enter Your Proxies: ")    
        if line:    
            lines.append(line)    
        else:    
            break    
    proxy_str = '\n'.join(lines)    
    proxy_list = proxy_str.split("\n")

    PROXIES[proxy_group] = {'proxy': proxy_list}
    logger.success("Proxy added successfully")
    return PROXIES

def proxy_remove(PROXIES):
    """
    This module is used for remove a proxy list from the main app
    :param: PROXIES (dict)
    :return: proxies (dict)
    """
    proxy_group = input("Enter proxy list name: ")
    try:
        del PROXIES[proxy_group]
        logger.success("Proxy removed successfully")
    except KeyError as e:
        print(e) # Debug statement. Remove in production
        logger.error("Can't find this proxy group")

    return PROXIES

def proxy_show(PROXIES):
    """
    This module is used for show a proxy list from the main app
    :param: PROXIES (dict)
    :return: None 
    """
    try:
        logger.success(PROXIES)
    except KeyError as e:
        logger.error("Can't find this proxy group")

