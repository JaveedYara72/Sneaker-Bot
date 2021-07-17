import requests
import logging
import sys

def success(webhook_url, product_name, store, product_url, size):
    """ 
    This method prepares an embed for successful checkout
    :params: webhook_url(str), product_name(str), store(str), product_image_link(str), product_url(str), size(str)
    :return: None
    """
    from datetime import datetime
    time_now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    data = {
      "username": "Astro",
      "avatar_url": "https://images-ext-2.discordapp.net/external/Z9cspU_D3oXscSSBgLcbpdCnD1Z28iQU_1NFRhpkrfw/%3Fsize%3D128/https/cdn.discordapp.com/icons/808860719860416532/59c4e8cf1bf028a70057ea763a9f6473.webp",
      "content": "",
      "embeds": [
        {
          "title": "Successful Checkout",
          "color": 15200230,
          "timestamp": str(datetime.utcnow()),
          "author": {
            "name": "Successful Checkout",
            "url": product_url,
          },
          "image": {},
          "footer": {
            "text": "Astro",
            "icon_url": "https://images-ext-2.discordapp.net/external/Z9cspU_D3oXscSSBgLcbpdCnD1Z28iQU_1NFRhpkrfw/%3Fsize%3D128/https/cdn.discordapp.com/icons/808860719860416532/59c4e8cf1bf028a70057ea763a9f6473.webp"
          },
          "fields": [
            {
              "name": "Date Time",
              "value": time_now,
              "inline": True
            },
            {
              "name": "Store",
              "value":  store,
              "inline": True
            },
            {
              "name": "Product",
              "value": product_name,
              "inline": True
            },
            {
              "name": "Size",
              "value": size,
              "inline": True
            }
          ]
        }
      ]
    }
    result = requests.post(webhook_url, json = data)
    try:
        result.raise_for_status()
    except requests.exceptions.HTTPError as err:
        print(err)
    else:
        print("Payload delivered successfully, code {}.".format(result.status_code))

def failure(webhook_url, product_name, store, product_url, size):
    """ 
    This method prepares an embed for failed checkout
    :params: webhook_url(str), product_name(str), store(str), product_image_link(str), product_url(str), size(str), reason(str)
    :return: None
    """
    from datetime import datetime
    time_now = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    data = {
      "username": "Astro",
      "avatar_url": "https://images-ext-2.discordapp.net/external/Z9cspU_D3oXscSSBgLcbpdCnD1Z28iQU_1NFRhpkrfw/%3Fsize%3D128/https/cdn.discordapp.com/icons/808860719860416532/59c4e8cf1bf028a70057ea763a9f6473.webp",
      "content": "",
      "embeds": [
        {
          "title": "Checkout failed",
          "color": 13841974,
          "timestamp": str(datetime.utcnow()),
          "description": "Something went wrong while processing the task",
          "url": "",
          "footer": {
            "text": "Astro",
            "icon_url": "https://images-ext-2.discordapp.net/external/Z9cspU_D3oXscSSBgLcbpdCnD1Z28iQU_1NFRhpkrfw/%3Fsize%3D128/https/cdn.discordapp.com/icons/808860719860416532/59c4e8cf1bf028a70057ea763a9f6473.webp"
          },
          "fields": [
            {
              "name": "Date Time",
              "value": time_now,
              "inline": True
            },
            {
              "name": "Store",
              "value": store,
              "inline": True
            },
            {
              "name": "Product",
              "value": product_name,
              "inline": True
            },
            {
              "name": "Size",
              "value": size,
              "inline": True
            }
          ]
        }
      ]
    }
    result = requests.post(webhook_url, json = data)
    try:
        result.raise_for_status()
    except requests.exceptions.HTTPError as err:
        print(err)
    else:
        print("Payload delivered successfully, code {}.".format(result.status_code))
    
# For testing purposes only, remove at the time of production
#failure("https://discord.com/api/webhooks/780885201931862097/p0PeNc9y5tASzoRaW9aL16tzWYMxinecqxM9gtmp4u3pP7xzD8LCBdnoPl9ghwquo97B", "Test", "Test", "https://images-ext-2.discordapp.net/external/Z9cspU_D3oXscSSBgLcbpdCnD1Z28iQU_1NFRhpkrfw/%3Fsize%3D128/https/cdn.discordapp.com/icons/808860719860416532/59c4e8cf1bf028a70057ea763a9f6473.webp", "https://images-ext-2.discordapp.net/external/Z9cspU_D3oXscSSBgLcbpdCnD1Z28iQU_1NFRhpkrfw/%3Fsize%3D128/https/cdn.discordapp.com/icons/808860719860416532/59c4e8cf1bf028a70057ea763a9f6473.webp", "Test", "Test")
#success("https://discord.com/api/webhooks/780885201931862097/p0PeNc9y5tASzoRaW9aL16tzWYMxinecqxM9gtmp4u3pP7xzD8LCBdnoPl9ghwquo97B", "Test", "Test", "https://images-ext-2.discordapp.net/external/Z9cspU_D3oXscSSBgLcbpdCnD1Z28iQU_1NFRhpkrfw/%3Fsize%3D128/https/cdn.discordapp.com/icons/808860719860416532/59c4e8cf1bf028a70057ea763a9f6473.webp", "https://images-ext-2.discordapp.net/external/Z9cspU_D3oXscSSBgLcbpdCnD1Z28iQU_1NFRhpkrfw/%3Fsize%3D128/https/cdn.discordapp.com/icons/808860719860416532/59c4e8cf1bf028a70057ea763a9f6473.webp", "Test")
