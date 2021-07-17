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
import data_crawler as dc
from random import choice

machine = platform.node()
init()

class Logger:
    """
    This class handles colored printing over the console
    :params: None
    :return: None
    :object: 'astro-app'
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

def task_add(TASKS):
    """
    This module is used for adding tasks into the main app
    :param: TASKS (dict)
    :return: TASKS (dict)
    """
    task_name = input("Enter task name: ")
    print("Enter task data -> \n")
    task_data = {}
    task_data['name'] = input("Enter task name: ")
    logger.info("""
        Available stores:
        1. Kids Footlocker (https://www.kidsfootlocker.com))
        2. Footlocker (https://www.footlocker.com))
        3. FootlockerCA (https://www.footlocker.ca))
    """)
    task_data['store'] = input("Enter choice: ")
    task_data['profile'] = input("Enter profile you want this task to be associated with: ")
    task_data['proxy'] = input("Enter proxy group name. Leave blank for system default: ")
    task_data['link'] = input("Enter product link: ")
    task_data['product'] = dc.view_details(task_data['link'], task_data['store'])
    task_data['size'] = input("Enter product size value: ")
    TASKS[task_name] = task_data
    logger.success("Task added successfully!")
    return TASKS

def task_remove(TASKS):
    """
    This module is used for removing tasks from the main app
    :param: TASKS (dict)
    :return: TASKS (dict)
    """
    task_name = input("Enter task name: ")

    try:
        del TASKS[task_name]
        logger.success("Task removed successfully!")
    except KeyError as e:
        print(e) # Debug statement. Remove in production
        logger.error("Can't find this task name")

    return TASKS

def show_tasks(TASKS):
    """
    This module is used for showing all the tasks on the main app
    :param: TASKS (dict)
    :return: None
    """
    try:
        logger.info(TASKS)
    except Exception as e:
        logger.error("Can't find a Task with this name")
