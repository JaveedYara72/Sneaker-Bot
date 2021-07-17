# Profile Handler
# Need to handle profile according to the foot sites
# Logger imports
import platform
from termcolor import colored
from colorama import init, Fore, Back, Style
import time

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

def profile_add(PROFILES):
    """
    This module is used for adding profiles into the main app
    :param: PROFILES (dict)
    :return: PRFOILES (dict)
    """
    profile_name = input("Enter profile name: ")
    print("Enter profile data\n")
    profile_data = {}
    profile_data['first_name'] = input("Enter First name: ")
    profile_data['last_name'] = input("Enter Last name: ")
    profile_data['email'] = input("Enter Email address: ")
    profile_data['phone'] = input("Enter phone: ")
    profile_data['address'] = input("Enter Shipping address: ")
    profile_data['city']  = input("Enter your city: ")
    profile_data['state'] = input('Enter your state/province: ')
    profile_data['province'] = input('Enter your province. (Only required for CA), Please enter the details starting with a Capital Letter : ')
    profile_data['postal'] = input("Enter postal Code: ")
    profile_data['country'] = input("Enter country: ")
    

    # Payment Details
    profile_data['card_number'] = input("Enter your credit/debit card number: ")
    profile_data['card_expiry_month'] = input("Enter your credit/debit card expiry month: ")
    profile_data['card_expiry_year'] = input("Enter your credit/debit card expiry year: ")
    profile_data['card_cvv'] = input("Enter your credit/debit card cvv: ")
    

    PROFILES[profile_name] = profile_data
    logger.success("Profile added successfully")
    return PROFILES

def profile_remove(PROFILES):
    """
    This module is used for removing profiles from the main app
    :param: PROFILES (dict)
    :return: PRFOILES (dict)
    """
    profile_name = input("Enter profile name: ")

    try:
        del PROFILES[profile_name]
        logger.success("Profile removed successfully")
    except KeyError as e:
        print(e) # Debug statement. Remove in production
        logger.error("Can't find this profile name")

    return PROFILES

def show_profiles(PROFILES):
    """
    This module is used for showing all the profiles from the main app
    :param: PROFILES (dict)
    :return: PRFOILES (dict)
    """

    try:
        logger.info(PROFILES)
    except Exception as e:
        logger.error("Can't find a Profile with this name")

