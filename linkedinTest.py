from bs4 import BeautifulSoup
from selenium import webdriver

def indeed(job_title, location):
    url = "https://www.indeed.com/jobs?q=" + job_title + "&l=" + location + "&from=searchOnHP&redirected=1&vjk=676599852a737304"
    browser = webdriver.Chrome('/Users/ersixhangoli/Downloads/chromedriver')
    
    browser.get(url)
    soup = BeautifulSoup(browser.page_source, 'html.parser')
    divs = soup.find_all('div', {'class': 'cardOutline'})


    jobs = []

    for item in divs:
        jobs.append({
            'title': item.find('h2').text,
            'company': item.find('span', {'class': 'companyName'}).text,
            'location': item.find('div', {'class': 'companyLocation'}).text,
            'date': item.find('span', {'class': 'date'}).text,
            'link': 'https://www.indeed.com' + item.a.get('href')
        })
    return jobs


def glass_door(job_title, location):
           
    url = "https://www.glassdoor.com/Search/results.htm?keyword=" + job_title + "&locName=" + location
    browser = webdriver.Chrome('/Users/ersixhangoli/Downloads/chromedriver')
    browser.get(url)
    soup = BeautifulSoup(browser.page_source, 'html.parser')
    divs = soup.find_all('div', {'class': 'mt-std'})

    for item in divs:
        try:
            print('https://www.glassdoor.com' + item.a.get('href'))
        except AttributeError:
            print('no link')

# print(indeed("data scientist", "New York"))

glass_door("data scientist", "New York")
