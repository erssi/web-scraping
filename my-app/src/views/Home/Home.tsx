import { Button, Card, Select, Spin } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import './Home.scss';
import SearchButton from '../../components/SearchButton';
import ShoppingItem from '../../components/ShoppingItem/ShoppingItem';
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

  const onSearchItem = async () => {
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
      onSearchItem();
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
          className='home__select'
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
      <div className='home__search'>
        <div className='home__search-fixed'>
          <div className='home__search--box'>
            {renderSelect()}{' '}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <p className='u__mt--lg'>
                {dropdownValue === 'Shopping'
                  ? 'Shopping Item :'
                  : ' Job Title :'}
              </p>
              <SearchButton onChange={onChange} onKeyPress={onKeyPress} />
            </div>
            {dropdownValue === 'Jobs' && (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span className='u__mt--lg'>Location: </span>{' '}
                <SearchButton onChange={onHandleLocation} />
              </div>
            )}
            <Button
              className='home__search--btn u__mt--lg'
              onClick={onSearchItem}
            >
              Search
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
          <div className='home__container'>
            {dropdownValue === 'Shopping' && (
              <>
                {items && (
                  <>
                    <div className='home__container--item'>
                      {items?.amazon?.map(item => (
                        <ShoppingItem
                          {...item}
                          shopType='amazon'
                          key={item.id}
                        />
                      ))}{' '}
                    </div>
                    <div className='home__container--item'>
                      {items?.ebay?.map(item => (
                        <ShoppingItem {...item} shopType='ebay' key={item.id} />
                      ))}{' '}
                    </div>
                  </>
                )}
              </>
            )}

            {dropdownValue === 'Jobs' && (
              <>
                <div className='home__search-items'>
                  {jobs?.flexjobs?.map((job: any) => (
                    <Card className='home__search-items--left'>
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
