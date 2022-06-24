from flask import Flask
from bs4 import BeautifulSoup
from selenium import webdriver

app = Flask(__name__)

@app.route("/job-scrape", methods=['POST'])
def home():
    print(flex_jobs('data scientist', 'new york'))
    return "Hello World!"




def indeed(job_title, location):
    url = "https://www.indeed.com/jobs?q=" + job_title + "&l=" + location + "&from=searchOnHP&redirected=1&vjk=676599852a737304"
    browser = webdriver.Chrome('/Users/ersixhangoli/Downloads/chromedriver')
    
    browser.get(url)
    soup = BeautifulSoup(browser.page_source, 'html.parser')
    divs = soup.find_all('div', {'class': 'cardOutline'})


    jobs = []

    for item in divs:
        jobs.append(indeed_extract(item))
    return jobs

def flex_jobs(job_title, location):
    url = "https://www.flexjobs.com/search?search=" + job_title + "&location=" + location
    browser = webdriver.Chrome('/Users/ersixhangoli/Downloads/chromedriver')
    browser.get(url)
    soup = BeautifulSoup(browser.page_source, 'html.parser')

    divs = soup.find_all('li', {'class': 'm-0'})
    jobs = []

    for item in divs:
        jobs.append(flex_jobs_extract(item))

    return jobs

def indeed_extract(item):
    try:
        title = item.find('h2').text
    except AttributeError:
        title = 'N/A'

    try:
        company = item.find('span', {'class': 'companyName'}).text
    except AttributeError:
        company = 'N/A'

    try:
        location = item.find('div', {'class': 'companyLocation'}).text
    except AttributeError:
        location = 'N/A'

    try:
        date = item.find('span', {'class': 'date'}).text
    except AttributeError:
        date = 'N/A'

    try:
        link = "https://www.indeed.com" + item.a.get('href')
    except AttributeError:
        link = 'N/A'
    
    return {'title': title, 'company': company, 'location': location, 'date': date, 'link': link}



def flex_jobs_extract(item):
    try:
        title = item.a.text
    except AttributeError:
        title = 'N/A'

    try:
        date = item.find('div', {'class': 'job-age'}).text.strip()
    except AttributeError:
        date = 'N/A'

    try:
        location = item.span.text
    except AttributeError:
        location = 'N/A'

    try:
        link = "https://www.flexjobs.com" + item.a.get('href')
    except AttributeError:
        link = 'N/A'

    return {'title': title, 'date': date, 'location': location, 'link': link}



