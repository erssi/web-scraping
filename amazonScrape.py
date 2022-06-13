import csv
from lib2to3.pgen2 import driver
from unittest import result
from bs4 import BeautifulSoup
from selenium import webdriver

amazon_base_url = 'https://amazon.com'
ebay_base_url = 'https://www.ebay.com'

def amazon_get_url(base_url, search_term):
    template = base_url + '/s?k={}&sprefix=monitor%2Caps%2C178&ref=nb_sb_ss_ts-doa-p_2_7'
    search_term = search_term.replace(' ', '+')

    url = template.format(search_term)
    url += '&page{}'
    return url

def ebay_get_url(base_url, search_term):
    template = base_url + '/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw={}&_sacat=0&LH_TitleDesc=0&_odkw=monitor&_osacat=0'
    search_term = search_term.replace(' ', '+')

    url = template.format(search_term)
    return url

#Error handling
def extract_amazon_record(item):
    
    #description and url
    
    try:
        #atag
        atag = item.h2.a
    except AttributeError:
        atag = 'N/A'
    
    try:
        description = atag.text.strip()
    except AttributeError:
        description = 'N/A'

    try:
        url = amazon_base_url + atag.get('href')
    except AttributeError:
        url = 'N/A'


    try:
        #price
        price_parent = item.find('span', 'a-price')
        price = price_parent.find('span', 'a-offscreen').text
    except AttributeError:
        return

    try:
        #raiting
        rating = item.i.text
    except AttributeError:
        rating = 'N/A'

    try:
        #image
        image = item.img.get('src')
    except AttributeError:
        image = 'N/A'

    result = (description, image, price, rating, url)

    return result

def extract_ebay_record(item, image):

    # print('item.a   ', item.find('div', {'class': 's-item__image-wrapper'}))

    #description and url
    try:
        #atag
        atag = item.a
    except AttributeError:
        atag = 'N/A'
    
    try:
        description = atag.h3.text.strip()
    except AttributeError:
        description = 'N/A'

    try:
        url = ebay_base_url + atag.get('href')
    except AttributeError:
        url = 'N/A'


    try:
        #price
        price_grand_parent = item.find('div', {'class': 's-item__details clearfix'})
        price_parent = price_grand_parent.find('div', {'class':'s-item__detail s-item__detail--primary'})
        price = price_parent.find('span', {'class':'s-item__price'}).text
    except AttributeError:
        return

    try:
        #raiting
        rating = item.i.text
    except AttributeError:
        rating = 'N/A'

    try:
        #image
        image = image.get('src')
    except AttributeError:
        image = 'N/A'

    result = (description, image, price, rating, url)

    return result




def main(base_url,search_term):
    #start webdriver
    driver = webdriver.Chrome('/Users/ersixhangoli/Downloads/chromedriver')

    records = []

    if base_url == amazon_base_url:
        url = amazon_get_url(base_url, search_term)
        for page in (1, 21):
            driver.get(url.format(page))
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            results = soup.find_all('div', {'data-component-type': 's-search-result'})

        for item in results:
            record = extract_amazon_record(item)
            if record: 
                records.append(record)
        driver.close()
    elif base_url == ebay_base_url:
        url = ebay_get_url(base_url, search_term)


        for page in (1, 21):
            driver.get(url.format(page))
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            results = soup.find_all('div', {'class': 's-item__info clearfix'})
            image = soup.find_all('img', {'class': 's-item__image-img'})
        for item in range(len(results)):
            record = extract_ebay_record(results[item], image[item])
            if record: 
                records.append(record)
        driver.close()


    

#save to csv
    with open('results.csv', 'w', newline= '', encoding= 'utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Description', 'Image', 'Price', 'Rating', 'Url'])
        writer.writerows(records)

main(amazon_base_url,'iphone 12')
