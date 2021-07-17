from bs4 import BeautifulSoup as bs4
import requests

def view_details(url, option):
    """
    This module basically details of a product (name, size, price)
    :params: url(str), option(int)
    :return: None
    """
    if option == '1':  # For CA
        ca_page = requests.get(url)
        if ca_page.status_code == 200:
        # Continue searching for elements
            ca_soup = bs4(ca_page.content, 'lxml')
            product_name = ca_soup.find('span', {'class':'ProductName-primary' })
            product_name = product_name.get_text()
            price = ca_soup.find('span', {'class': 'ProductPrice-final'})
            price = price.get_text()
            li_all_sizes, li_unavailable_sizes = [], []
            all_sizes = ca_soup.find_all('span', {'class': 'c-form-label-content'})
            for each in all_sizes:
                if each.get_text() != "":
                    li_all_sizes.append(each.get_text())
            unavailable_sizes = ca_soup.find_all('div', {'class': "c-form-field c-form-field--radio c-form-field--disabled c-form-field--unavailable ProductSize"})
            for each in unavailable_sizes:
                if each.get_text() != "":
                    li_unavailable_sizes.append(each.find('span').get_text())

            print("Product name: " + product_name) 
            print("Price: " + price) 
            print("Available sizes:", set(li_all_sizes) - set(li_unavailable_sizes))
            print("Unavailable sizes:", li_unavailable_sizes)
            print("All sizes:", li_all_sizes)
            return product_name
        else:
            print("Failed to load the page elements") 
    elif option == '2':  # For com
        com_page = requests.get(url)
        if com_page.status_code == 200: # Continue searching for elements
            com_soup = bs4(com_page.content, 'html.parser')
            product_name = com_soup.find('div', {'class': 'Product-header'})
            product_name = product_name.find('button')['aria-label'].split("-")[1]
            price = com_soup.find('span', {'class': 'ProductPrice'})
            price = price.get_text()
            li_all_sizes, li_unavailable_sizes = [], []
            all_sizes = com_soup.find_all('span', {'class': 'c-form-label-content'})
            for each in all_sizes:
                if each.get_text() != "":
                    li_all_sizes.append(each.get_text())
            unavailable_sizes = com_soup.find_all('div', {'class': "c-form-field c-form-field--radio c-form-field--disabled c-form-field--unavailable ProductSize"})
            for each in unavailable_sizes:
                if each.get_text() != "":
                    li_unavailable_sizes.append(each.find('span').get_text())

            print("Product name: " + product_name) 
            print("Price: " + price) 
            print("Available sizes:", set(li_all_sizes) - set(li_unavailable_sizes))
            print("Unavailable sizes:", li_unavailable_sizes)
            print("All sizes:", li_all_sizes)
            return product_name
        else:
            print("Failed to load the page")
    elif option == '3':  # For kids
        kids_page = requests.get(url)
        if kids_page.status_code == 200: # Continue searching for elements
            kids_soup = bs4(kids_page.content, 'html.parser')
            product_name = kids_soup.find('div', {'class': 'Product-header'})
            product_name = product_name.find('button')['aria-label'].split("-")[1]
            price = kids_soup.find('span', {'class': 'ProductPrice'})
            price = price.get_text()
            li_all_sizes, li_unavailable_sizes = [], []
            all_sizes = kids_soup.find_all('span', {'class': 'c-form-label-content'})
            for each in all_sizes:
                if each.get_text() != "":
                    li_all_sizes.append(each.get_text())
            unavailable_sizes = kids_soup.find_all('div', {'class': "c-form-field c-form-field--radio c-form-field--disabled c-form-field--unavailable ProductSize"})
            for each in unavailable_sizes:
                if each.get_text() != "":
                    li_unavailable_sizes.append(each.find('span').get_text())

            print("Product name: " + product_name) 
            print("Price: " + price) 
            print("Available sizes:", set(li_all_sizes) - set(li_unavailable_sizes))
            print("Unavailable sizes:", li_unavailable_sizes)
            print("All sizes:", li_all_sizes)
            return product_name
        else:
            print("Failed to load the page")

