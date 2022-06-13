# import csv
# from lib2to3.pgen2 import driver
# from bs4 import BeautifulSoup
# from selenium import webdriver

# #Start up the web driver

# driver = webdriver.Chrome('/Users/ersixhangoli/Downloads/chromedriver')
# amazon = 'https://amazon.com'
# url = ''
# # driver.get(url)

# def get_url(search_term):
#     template = 'https://www.amazon.com/s?k={}&sprefix=monitor%2Caps%2C178&ref=nb_sb_ss_ts-doa-p_2_7'
#     search_term = search_term.replace(' ', '+')
#     return template.format(search_term)

# url = get_url('monitor arm')
# # print(url)
# driver.get(url)

# #Extract the collection

# soup = BeautifulSoup(driver.page_source, 'html.parser')

# results = soup.find_all('div', {'data-component-type': 's-search-result'})
# # print(len(results))

# #proportype the result

# item = results[0]
# atag = item.h2.a
# description = atag.text.strip()
# url = amazon + atag.get('href')
# price_parent = item.find('span', 'a-price')
# price = price_parent.find('span', 'a-offscreen').text
# rating = item.i.text

# # generelaize the pattern

# # def extract_record(item):

# #     #description and url
# #     atag = item.h2.a
# #     description = atag.text.strip()
# #     url = amazon + atag.get('href')

# #     #price
# #     price_parent = item.find('span', 'a-price')
# #     price = price_parent.find('span', 'a-offscreen').text

# #     #raiting
# #     rating = item.i.text

# #     result = (description, price, rating, url)

# #     return result

# # records = []
# # results = soup.find_all('div', {'data-component-type': 's-search-result'})

# # for item in results:
# #     records.append(extract_record(item)) 



# #Error handling
# def extract_record(item):
    
#     #description and url
#     atag = item.h2.a
#     description = atag.text.strip()
#     url = amazon + atag.get('href')

#     try:
#         #price
#         price_parent = item.find('span', 'a-price')
#         price = price_parent.find('span', 'a-offscreen').text
#     except AttributeError:
#         return

#     try:
#         #raiting
#         rating = item.i.text
#     except AttributeError:
#         rating = 'N/A'

#     result = (description, price, rating, url)

#     return result

# records = []
# results = soup.find_all('div', {'data-component-type': 's-search-result'})

# for item in results:
#     record = extract_record(item)
#     if record:
#         records.append(record)

# #GEt next page (max 20 for amazon)

# def get_url(search_term):
#     template = 'https://www.amazon.com/s?k={}&sprefix=monitor%2Caps%2C178&ref=nb_sb_ss_ts-doa-p_2_7'
#     search_term = search_term.replace(' ', '+')

#     url = template.format(search_term)
#     url += '&page{}'
#     return url

# #Putting all together

