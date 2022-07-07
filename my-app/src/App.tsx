import { Button, Card, notification, Select, Spin } from 'antd';
// import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './App.scss';
import SearchButton from './components/SearchButton';
import SearchShoppingItem from './components/SearchShoppingItem';
// import { searchService } from './services/SearchService';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setitems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { Option } = Select;
  const [dropdownValue, setDropdownValue] = useState('Shopping');
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState('');

  const openNotification = (message: string, description: string) => {
    notification.open({
      message: message,
      description: description,

      // onClick: () => {
      //   console.log('Notification Clicked!');
      // },
    });
  };
  const benRakia = async () => {
    setIsLoading(true);

    if (!searchQuery || !location) {
      openNotification(
        'Error',
        'Please enter a search query and location to search for jobs'
      );
    }

    if (dropdownValue === 'Shopping') {
      await fetch(
        `http://localhost:3001/shopping/search?search=${searchQuery}`,
        {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
        .then(async res => {
          const a = await res.json();
          return setitems(a.amazon.concat(a.ebay));
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      await fetch(
        `http://localhost:3001/shopping/search-login?search=${searchQuery}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer' + localStorage.getItem('token'),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
        .then(async res => {
          const a = await res.json();
          return setitems(a.amazon.concat(a.ebay));
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      await fetch(
        `http://localhost:3001/job/search?jobTitle=${searchQuery}&location=${location}`,
        {
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
        .then(async res => {
          const a = await res.json();
          return setJobs(a.indeed.concat(a.flexjobs));
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      await fetch(
        `http://localhost:3001/job/search-login?search=${searchQuery}&location=${location}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer' + localStorage.getItem('token'),
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
        .then(async res => {
          const a = await res.json();
          return setJobs(a.indeed.concat(a.flexjobs));
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  console.log(jobs);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const onHandleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLocation(e.target.value);
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      benRakia();
    }
  };

  const handleChange = (value: string) => {
    console.log(value);
    setDropdownValue(value);

    setitems([]);
    setJobs([]);
  };
  const renderSelect = () => {
    return (
      <>
        {' '}
        <Select
          defaultValue='Shopping'
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value='Shopping'>Shopping</Option>
          <Option value='Jobs'>Jobs</Option>
        </Select>
      </>
    );
  };

  return (
    <div className='App'>
      <div className='search'>
        {' '}
        <h1>Ben Pijedashesi</h1>
        <div className='search-box'>
          {renderSelect()}{' '}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {dropdownValue === 'Jobs' && (
              <span style={{ whiteSpace: 'nowrap', margin: '0 5px' }}>
                Job Title:{' '}
              </span>
            )}{' '}
            <SearchButton onChange={onChange} onKeyPress={onKeyPress} />
          </div>
          {dropdownValue === 'Jobs' && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <span>Location: </span>{' '}
              <SearchButton onChange={onHandleLocation} />
            </div>
          )}
          <Button className='search-box__btn' onClick={benRakia}>
            Serach
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className='loader'>
          <Spin />
        </div>
      ) : (
        <div className='search-container'>
          {dropdownValue === 'Shopping' && (
            <>
              {' '}
              <div className='search-container__left'>
                {items.map((item: any) => (
                  <SearchShoppingItem {...item} shopType='amazon' />
                ))}{' '}
              </div>
              <div className='search-container__right'>
                {items.map((item: any) => (
                  <SearchShoppingItem {...item} shopType='ebay' />
                ))}{' '}
              </div>
            </>
          )}

          {dropdownValue === 'Jobs' && (
            <div className='jobs'>
              {jobs.map((job: any) => (
                <Card className='search-shopping__card'>
                  <h1>{job.title}</h1>
                  {job.company && <h3>{job.company}</h3>}
                  <span>{job.date} </span>
                  <br />
                  <span>Location : {job.location}</span>
                  <br />
                  <a target={'_'} href={job.link}>
                    Visit
                  </a>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
