import re
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from time import sleep


def linkedin_scrape(search_term):

    browser = webdriver.Chrome('/Users/ersixhangoli/Downloads/chromedriver')
    browser.get('https://www.linkedin.com')

    username = browser.find_element_by_id('session_key')
    username.send_keys('ersi.xhangolli@cit.edu.al')
    password = browser.find_element_by_id('session_password')
    password.send_keys('Test123@')

    login_button = browser.find_element_by_class_name('sign-in-form__submit-button')
    login_button.click()

    browser.get('https://www.linkedin.com/jobs/search/?keywords=' + search_term)
    soup = BeautifulSoup(browser.page_source, 'html.parser')
    job = soup.find_all('div', {'class': 'base-card'})
    job_title = []

    for i in job:
        job_title.append(re.sub(r'\s{2,}','', i.text.replace("\n", "")))

    

    # print({'jobs': job_title})
     

    job2 = browser.find_elements_by_class_name("job-card-list__title")
    print(len(job2))
    # comp_name = []

    # for i in job2:
    #     comp_name.append(i.text)

    # print({'comp name length': len(comp_name)})
    # print({comp_name})

    # job3 = browser.find_element_by_class_name('job-card-container__metadata-item')
    # loc_name = []

    # for i in job3:
    #     loc_name.append(i.text)

    # print({'loc name length': len(loc_name)})
    # print({loc_name})

    # comp_name.append(' ')
    # comp_name.append(' ')

    # print(len(loc_name))

linkedin_scrape('developer')