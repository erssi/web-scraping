from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route("/indeed-scrape", methods=['POST'])
def indeed():
    try:
        request_data = request.get_json()
        indeedJobs = indeed(request_data["jobTitle"], request_data["location"])
        return indeedJobs
    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/flex-jobs-scrape", methods=['POST'])
def flexJobs():
    request_data = request.get_json()
    flexJobs = flex_jobs(request_data["jobTitle"], request_data["location"])
    return flexJobs




def indeed(job_title, location):
    url = "https://www.indeed.com/jobs?q=" + job_title + "&l=" + location + "&from=searchOnHP&redirected=1&vjk=676599852a737304"
    browser = requests.get(url)
    
    soup = BeautifulSoup(browser.text, 'html.parser')
    divs = soup.find_all('div', {'class': 'cardOutline'})


    jobs = []

    for item in divs:
        record = indeed_extract(item)
        if record:
            jobs.append(record)
    return jsonify(jobs)

def flex_jobs(job_title, location):
    url = "https://www.flexjobs.com/search?search=" + job_title + "&location=" + location

    browser = requests.get(url)
    soup = BeautifulSoup(browser.text, 'html.parser')

    divs = soup.find_all('li', {'class': 'm-0'})
    jobs = []

    for item in divs:
        record = flex_jobs_extract(item)
        if record:
            jobs.append(record)
    return jsonify(jobs)

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



app.run(port=4000, debug=True, threaded=False, host= '0.0.0.0')
