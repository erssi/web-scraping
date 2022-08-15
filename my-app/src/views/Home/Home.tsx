import { Button, Card, Select, Spin } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Home.scss';
import SearchButton from '../../components/SearchButton';
import SearchShoppingItem from '../../components/SearchShoppingItem';
import { openNotification } from '../../components/ToastNotifcation/Notification';
import { ApiService } from '../../services/apiService';
import { JobsItem, ShopingItem } from '../../types/general';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setitems] = useState({
    amazon: [] as ShopingItem[],
    ebay: [] as ShopingItem[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { Option } = Select;
  const [dropdownValue, setDropdownValue] = useState('Shopping');
  const [jobs, setJobs] = useState({
    flexjobs: [] as JobsItem[],
    indeed: [] as JobsItem[],
  });
  const [location, setLocation] = useState('');
  const accessToken = useSelector((state: any) => state.auth.token);

  const benRakia = async () => {
    setIsLoading(true);
    try {
      if (dropdownValue === 'Shopping') {
        if (!searchQuery) {
          return openNotification('Error', 'Please enter a search query !');
        }
        let res: any = null;

        if (accessToken) {
          res = await ApiService.get(
            `shopping/search-login?search=${searchQuery}`
          );
        } else {
          res = await ApiService.get(`shopping/search?search=${searchQuery}`);
        }
        setitems(res);
      } else {
        if (!searchQuery || !location) {
          return openNotification(
            'Error',
            'Please enter a search query and location to search for jobs'
          );
        }
        let res: any = null;
        if (accessToken) {
          res = await ApiService.get(
            `job/search-login?jobTitle=${searchQuery}&location=${location}`
          );
        } else {
          res = await ApiService.get(
            `job/search?jobTitle=${searchQuery}&location=${location}`
          );
        }
        setJobs({ ...res });
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

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
    setDropdownValue(value);

    setitems({ amazon: [], ebay: [] });
    setJobs({ flexjobs: [], indeed: [] });
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
    <div className='home'>
      <div className='home-search'>
        <div className='home-search-fixed'>
          <h1>Ben Pijedashesi</h1>
          <div className='home-search__box'>
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
              <span style={{ whiteSpace: 'nowrap', margin: '0 5px' }}>
                {dropdownValue === 'Shopping'
                  ? 'Shopping Item :'
                  : ' Job Title :'}
              </span>
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
      </div>{' '}
      <div className='home-container'>
        {isLoading ? (
          <div className='loader'>
            <Spin />
          </div>
        ) : (
          <div className='home-container__search-items'>
            {dropdownValue === 'Shopping' && (
              <>
                {items && (
                  <>
                    <div className='home-container__search-items--left'>
                      {items?.amazon?.map(item => (
                        <SearchShoppingItem
                          {...item}
                          shopType='amazon'
                          key={item.id}
                        />
                      ))}{' '}
                    </div>
                    <div className='home-container__search-items--right'>
                      {items?.ebay?.map(item => (
                        <SearchShoppingItem
                          {...item}
                          shopType='ebay'
                          key={item.id}
                        />
                      ))}{' '}
                    </div>
                  </>
                )}
              </>
            )}

            {dropdownValue === 'Jobs' && (
              <>
                <div className='home-container__search-items'>
                  {jobs?.flexjobs?.map((job: any) => (
                    <Card className='home-container__search-items--left'>
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
                </div>{' '}
                <div className='jobs'>
                  {jobs?.indeed?.map((job: any) => (
                    <Card className='home-container__search-items--right'>
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
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
