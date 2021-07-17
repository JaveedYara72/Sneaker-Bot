# Need colorama for printing colored values 
from termcolor import colored
from colorama import init, Fore, Back, Style
from datetime import datetime
import requests
import time
import platform
machine = platform.node()

# Manual imports
import proxy
import profile
import task
import kidsfootlocker_chrome as kfc_c
import footlockercom_chrome as flc_c
import footlockerca_chrome as fca_c
import data_crawler as dc
import webhook as wh
init()

# GLOBAL VARIABLES
DEBUG = True
VERSION = "0.01"
WEBHOOK = ""

TASKS = {}
PROFILES = {}
PROXIES = {}


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

def welcome_page():
    """
    This module is used for printing welcome page only
    :return: None
    """
    logger.color(
"""
_______       _____                   _____________________ 
___    |________  /_____________      ___    |___  _/_  __ \\
__  /| |_  ___/  __/_  ___/  __ \     __  /| |__  / _  / / /
_  ___ |(__  )/ /_ _  /   / /_/ /     _  ___ |_/ /  / /_/ /
/_/  |_/____/ \__/ /_/    \____/      /_/  |_/___/  \____/
""", "red"
    )

def menu_list():
    """
    This module prints all the options that a user can choose from
    :return: choice (int)
    """
    print("""
[AstroAIO] """ + VERSION + """ - Ready
[AstroAIO] Welcome """)

    print("""
[1] Run Tasks
[2] Create Tasks
[3] Create Profiles
[4] Create Proxylist
[5] Delete Tasks
[6] Delete Profiles
[7] Delete Proxy List
[8] Show all Tasks
[9] Show all Profiles  
[10] Show all Proxylist
[11] Change Webhook
[0] Exit
    """)
    choice = None
    try:
        choice = int(input("Enter choice: "))
    except ValueError as e:
        if DEBUG:
            print(e)
        else:
            logger.error("Please enter numbers only")
    return choice

def update_webhook():
    """
    This module updates the webhook along with a sample embed
    :library: discord.js, datetime, requests
    :return: success(bool)
    """
    if WEBHOOK == "":
        print("Old webhook: None")
    else:
        print("Old webhook: " + WEBHOOK)

    new_webhook = input("New webhook:")

    # POST EMBED TO NEW WEBHOOK 
    # Test webhook https://discord.com/api/webhooks/805370046183637002/gogAsis3D2yk-USieieJb6jz7qzymYMvSAk3Gk_xeimLHW5gabvKO3-gzdMQyXPm20z3
    data = {
    "username": "Astro AIO",
    "content": "",
    "embeds": [
        {
        "title": "Webhook Added!",
        "color": 15200230,
        "timestamp": str(datetime.utcnow()),
        "footer": {
            "text": "Astro AIO",
            "icon_url": "https://images-ext-2.discordapp.net/external/Z9cspU_D3oXscSSBgLcbpdCnD1Z28iQU_1NFRhpkrfw/%3Fsize%3D128/https/cdn.discordapp.com/icons/808860719860416532/59c4e8cf1bf028a70057ea763a9f6473.webp"
        },
        }
    ]
}
    try:
        result = requests.post(new_webhook, json = data)
        result.raise_for_status()
    except requests.exceptions.MissingSchema as err:
        if DEBUG:
            print(err)
        else:
            logger.error("\nSomething went wrong while setting up the webhook. Reason - Wrong webhook")
    except requests.exceptions.HTTPError as err:
        if DEBUG:
            print(err)
        else:
            logger.error("\nSomething went wrong while setting up the webhook. Reason - Internet issue")
    else:
        logger.success("\nWebhook sent successfully, code {}.".format(result.status_code))

def choice_handler(choice):
    """
    This module handles menu choice and execute functions accordingly
    :params: choice(int)
    :return: None
    """

    global TASKS, PROFILES, PROXIES
    if choice == 1:
        # Run Task
        success_counter, failure_counter = 0, 0
        for TASK in TASKS:
            if(TASKS[TASK]['store'] == '1'):
                try:
                    if(TASKS[TASK]['proxy'] == ""):
                        kfc_c.initialize(TASKS[TASK],PROFILES[TASKS[TASK]['profile']],None)            
                    else:
                        kfc_c.initialize(TASKS[TASK],PROFILES[TASKS[TASK]['profile']],PROXIES[TASK])            
                    success_counter += 1
                    del TASKS[TASK]
                except Exception as error:
                    # Failure webhook
                    product_name = dc.view_details(TASKS[TASK]['link'], TASKS[TASK]['store'])
                    wh.failure("https://discord.com/api/webhooks/840126009272827915/3vSZIbophnQJzbG1XZx0PDSSJAyOb0tuXqzV1qCcL4UWb2JGYpuZnPODUWBoGbijKhAs",product_name,TASKS[TASK]['store'],TASKS[TASK]['link'],TASKS[TASK]['size'])
                    logger.error(error)
                    failure_counter += 1
            elif(TASKS[TASK]['store'] == '2'):
                try:
                    if(TASKS[TASK]['proxy'] == ""):
                        flc_c.initialize(TASKS[TASK],PROFILES[TASKS[TASK]['profile']],None)            
                    else:
                        flc_c.initialize(TASKS[TASK],PROFILES[TASKS[TASK]['profile']],PROXIES[TASK])    
                    success_counter += 1
                    del TASKS[TASK]
                except Exception as error:
                    # Failure webhook
                    product_name = dc.view_details(TASKS[TASK]['link'], TASKS[TASK]['store'])
                    wh.failure("https://discord.com/api/webhooks/840126009272827915/3vSZIbophnQJzbG1XZx0PDSSJAyOb0tuXqzV1qCcL4UWb2JGYpuZnPODUWBoGbijKhAs",product_name,TASKS[TASK]['store'],TASKS[TASK]['link'],TASKS[TASK]['size'])
                    logger.error(error)
                    failure_counter += 1
            elif(TASKS[TASK]['store'] == '3'):
                try:
                    if(TASKS[TASK]['proxy'] == ""):
                        fca_c.initialize(TASKS[TASK],PROFILES[TASKS[TASK]['profile']],None)            
                    else:
                        fca_c.initialize(TASKS[TASK],PROFILES[TASKS[TASK]['profile']],PROXIES[TASK])    
                    fca_c.initialize(TASKS[TASK],PROFILES[TASKS[TASK]['profile']],PROXIES[TASK])
                    success_counter += 1
                    del TASKS[TASK]
                except Exception as error:
                    # Failure webhook
                    product_name = dc.view_details(TASKS[TASK]['link'], TASKS[TASK]['store'])
                    wh.failure("https://discord.com/api/webhooks/840126009272827915/3vSZIbophnQJzbG1XZx0PDSSJAyOb0tuXqzV1qCcL4UWb2JGYpuZnPODUWBoGbijKhAs",product_name,TASKS[TASK]['store'],TASKS[TASK]['link'],TASKS[TASK]['size'])
                    logger.error(error)
                    failure_counter += 1
            else:
                logger.error("Invalid choice")
                print(TASKS, PROFILES, PROXIES)
                choice = menu_list()
        logger.warning("Number of success:" + str( success_counter))
        logger.error("Number of failure:" + str(failure_counter))
    elif choice == 2:
        TASKS = task.task_add(TASKS) # Create Tasks
    elif choice == 3:
        PROFILES = profile.profile_add(PROFILES) # Create Profiles
    elif choice == 4:
        PROXIES = proxy.proxy_add(PROXIES) # Create Proxy List
    elif choice == 5:
        TASKS = task.task_remove(TASKS) # Delete Tasks
    elif choice == 6:
        PROFILES = profile.profile_remove(PROFILES) # Delete Profiles
    elif choice == 7:
        PROXIES = proxy.proxy_remove(PROXIES) # Delete Proxy List
    elif choice == 8:
        task.show_tasks(TASKS) # show Profiles
    elif choice == 9:
        profile.show_profiles(PROFILES) # Show Tasks
    elif choice == 10:
        proxy.proxy_show(PROXIES)
    elif choice == 11:
        update_webhook()
    elif choice == 0:
        exit(0)
    else:
        logger.error("Invalid choice")
    # print(TASKS, PROFILES, PROXIES)
    choice = menu_list()
    print(choice)
    choice_handler(choice)

welcome_page()
choice = menu_list()
choice_handler(choice)
