from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
from selenium import webdriver
import requests

app = Flask(__name__)

@app.route("/amazon-scrape", methods=['POST'])
def amazon():
    request_data = request.get_json()
    results = amazon_scrape(request_data['search'])
    return results

@app.route("/ebay-scrape", methods=['POST'])
def ebay():
    request_data = request.get_json()
    results = ebay_scrape(request_data['search'])
    return results

@app.route("/aliexpress-scrape", methods=['POST'])
def ali_expres():
    request_data = request.get_json()
    results = ali_expres_scrape(request_data['search'])
    return results


def amazon_scrape(search_term):
    
    url = 'https://amazon.com/s?k=' + search_term
    amazonRecords = []
    browser = requests.get(url,
                             headers = {
                                'authority': 'www.amazon.com',
                                'pragma': 'no-cache',
                                'cache-control': 'no-cache',
                                'dnt': '1',
                                'upgrade-insecure-requests': '1',
                                'user-agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
                                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                                'sec-fetch-site': 'none',
                                'sec-fetch-mode': 'navigate',
                                'sec-fetch-dest': 'document',
                                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'})
    soup = BeautifulSoup(browser.text, 'html.parser')
    results = soup.find_all('div', {'data-component-type': 's-search-result'})

    for item in results:
        record = extract_amazon_record(item)
        if record: 
             amazonRecords.append(record)
    return jsonify(amazonRecords) 

def ebay_scrape(search_term):
    template = 'https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2334524.m570.l1313&_nkw={}&_sacat=0&LH_TitleDesc=0&_odkw=monitor&_osacat=0'
    search_term = search_term.replace(' ', '+')
    url = template.format(search_term)
    ebayRecords = []
    browser = requests.get(url,headers = {
                                'authority': 'www.amazon.com',
                                'pragma': 'no-cache',
                                'cache-control': 'no-cache',
                                'dnt': '1',
                                'upgrade-insecure-requests': '1',
                                'user-agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36',
                                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                                'sec-fetch-site': 'none',
                                'sec-fetch-mode': 'navigate',
                                'sec-fetch-dest': 'document',
                                'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8'})
    soup = BeautifulSoup(browser.text, 'html.parser')
    results = soup.find_all('div', {'class': 's-item__info clearfix'})
    image = soup.find_all('img', {'class': 's-item__image-img'})


    for item in range(len(results)):
        record = extract_ebay_record(results[item], image[item])
        if record: 
            ebayRecords.append(record)
    return jsonify(ebayRecords)

def ali_expres_scrape(search_term):

    template ='https://www.aliexpress.com/wholesale?catId=0&initiative_id=SB_20220614113010&SearchText={}'
    search_term = search_term.replace(' ', '+')
    url = template.format(search_term)
    aliExpresRecords = []

    browser = webdriver.Chrome('/Users/ersixhangoli/Downloads/chromedriver')
    browser.get(url)
    soup = BeautifulSoup(browser.page_source, 'html.parser')

    results = soup.find_all('a', {'class': '_3t7zg _2f4Ho'})

    for item in results:
        record = extract_ali_expres_record(item)
        if record: 
            aliExpresRecords.append(record)

    return jsonify(aliExpresRecords)



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
        url = 'https://amazon.com' + atag.get('href')
    except AttributeError:
        url = 'N/A'

    try:
        #price
        price_parent = item.find('span', 'a-price')
        price = price_parent.find('span', 'a-offscreen').text
    except AttributeError:
        price = 'N/A'

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

    return {'description': description, 'image': image, 'price': price, 'rating': rating, 'url': url, 'type': 'amazon'}

def extract_ebay_record(item, image):
    #description and url
    try:
        #atag
        atag = item.a
    except AttributeError:
        atag = 'N/A'
    
    try:
        description = atag.find('div', 's-item__title').span.text
    except AttributeError:
        description = 'N/A'

    try:
        url =  atag.get('href')
    except AttributeError:

        url = 'N/A'

    try:
        #price
        price_grand_parent = item.find('div', {'class': 's-item__details clearfix'})
        price_parent = price_grand_parent.find('div', {'class':'s-item__detail s-item__detail--primary'})
        price = price_parent.find('span', {'class':'s-item__price'}).text
    except AttributeError:
        price = 'N/A'

    try:
        #raiting
        rating = item.find('div', {'class': 's-item__reviews'}).span.text
    except AttributeError:
        rating = 'N/A'

    try:
        #image
        image = image.get('src')
    except AttributeError:
        image = 'N/A'

    return {'description': description, 'image': image, 'price': price, 'rating': rating, 'url': url, 'type': 'ebay'}

def extract_ali_expres_record(item):

    #description and url
    try:
        description = item.find('h1', '_18_85').text
        # print(description)
    except AttributeError:
        description = 'N/A'

    try:
        price = item.find('div', 'mGXnE _37W_B').text
    except AttributeError:
        price = 'N/A'
    
    try:
        rating = item.find('span', 'eXPaM').text
    except AttributeError:
        rating = 'N/a'

    try:
        url = item.get('href').replace('//','')
    except AttributeError:
        url = 'N/A'
    
    try:
        image = item.find('img', '_1RtJV product-img').get('src').replace('//','')
    except AttributeError:
        image = 'N/A'
    
    return {'description': description, 'image': image, 'price': price, 'rating': rating, 'url': url, 'type': 'aliexpres'}


app.run(port=4500, debug=True, threaded=False, host='0.0.0.0')