import React, { useEffect, useState } from 'react';
import './MyProfile.scss';
import { useSelector } from 'react-redux';
import { Button, Rate } from 'antd';
import { ApiService } from '../../services/apiService';
import { EditFilled } from '@ant-design/icons';
import KitImage from '../../components/KitImage/KitImage';

const MyProfile = () => {
  const authUser = useSelector((state: any) => state.auth.user);
  const [savedShopping, setSavedShopping] = useState([] as any[]);
  const [savedJobs, setSavedJobs] = useState([] as any[]);
  const [isUploadCover, setIsUploadCover] = useState(false);
  const [isUploadProfile, setIsUploadProfile] = useState(false);
  const [coverImg, setCoverImg] = useState();
  const [profileImg, setProfileImg] = useState();
  const [coverModal, setCoverModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const fetchFeed = async () => {
    try {
      const response: any = await ApiService.get(`favorites`);
      setSavedShopping(response?.shopping);
      setSavedJobs(response?.jobs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const date = (date: any) => {
    const data = new Date(date);
    const result = data.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });

    return result.replace(',', ' ');
  };

  const onUpload = async (item: any, type: string) => {
    try {
      let formData = new FormData();
      formData.append(type, item?.target?.files[0], item.target.files[0].name);

      const response: any = await ApiService.post(`user/${type}`, formData);

      if (type === 'cover') {
        setIsUploadCover(false);
        return setCoverImg(response?.cover);
      } else {
        setIsUploadProfile(false);
        return setProfileImg(response?.profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='my-profile'>
      <div className='my-profile__card'>
        <KitImage
          preview={coverModal}
          setIsVisible={setCoverModal}
          src={`http://localhost:3001/image/${coverImg || authUser?.cover}`}
        ></KitImage>

        <KitImage
          preview={profileModal}
          setIsVisible={setProfileModal}
          src={`http://localhost:3001/image/${profileImg || authUser?.profile}`}
        ></KitImage>
        <div className='my-profile__card--cover--relative'>
          <div
            className='my-profile__card--cover'
            onClick={() => {
              if (coverImg || authUser?.cover) {
                setCoverModal(true);
              }
            }}
            style={
              authUser?.cover || coverImg
                ? {
                    background: `url('http://localhost:3001/image/${
                      coverImg || authUser?.cover
                    }')`,
                    cursor: 'pointer',
                  }
                : {
                    background: `#e2e2e2`,
                  }
            }
          ></div>
          <div className=''>
            <div className='my-profile__card--cover--edit'>
              <Button
                onClick={() => setIsUploadCover(!isUploadCover)}
                type='primary'
              >
                <EditFilled />
              </Button>
              {isUploadCover && (
                <div className='edit'>
                  <input
                    type='file'
                    onChange={item => onUpload(item, 'cover')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='my-profile__card--header'>
          <div className='my-profile__card--cover--relative'>
            <div
              className='my-profile__card--profile-img'
              onClick={() => {
                if (authUser?.profile || profileImg) {
                  setProfileModal(true);
                }
              }}
              style={
                authUser?.profile || profileImg
                  ? {
                      background: `url('http://localhost:3001/image/${
                        profileImg || authUser?.profile
                      }')`,
                    }
                  : {
                      background: `#e2e2e2`,
                    }
              }
            ></div>
            <div className='my-profile__card--cover--edit'>
              <Button
                onClick={() => setIsUploadProfile(!isUploadProfile)}
                type='primary'
              >
                <EditFilled />
              </Button>
              {isUploadProfile && (
                <div className='edit'>
                  <input
                    type='file'
                    onChange={item => onUpload(item, 'profile')}
                  />
                </div>
              )}
            </div>
          </div>
          <div className='my-profile__card--header--name'>
            <h3>{authUser?.name + ' ' + authUser?.lastName}</h3>
            <span>{authUser?.city}</span>
          </div>{' '}
          <div className='my-profile__card--header--email'>
            <h3>{authUser?.email}</h3>
            <span>Email</span>
          </div>
        </div>
        <button className='my-profile__card--header--btn'>Settings</button>
      </div>

      <div className='my-profile__content'>
        {savedJobs?.length !== 0 && (
          <div className='my-profile__content--left'>
            {savedJobs?.map(post => (
              <div className='my-profile__content--right--post ' key={post?.id}>
                <div className='my-profile__content--right--post--content'>
                  <h2>Job title : {post?.title}</h2>
                  <span> {post?.date?.replace(`New!\n`, '')}</span>

                  <h4>{post?.location}</h4>
                  <br />
                  <a href={post?.link} target='_'>
                    See full link{' '}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
        {savedShopping?.length !== 0 && (
          <div className='my-profile__content--right'>
            {savedShopping?.map(post => (
              <div className='my-profile__content--right--post' key={post?.id}>
                <img
                  className='my-profile__content--right--post--img'
                  src={post?.image}
                  width={150}
                  height={150}
                  alt=''
                ></img>
                <div className='my-profile__content--right--post--content'>
                  <h3>
                    <span> {date(post?.createdAt)}</span>
                  </h3>

                  <p>{post?.description}</p>
                  <p>
                    {' '}
                    {post?.rating !== 'N/A' && (
                      <Rate
                        allowHalf
                        disabled={true}
                        value={Number(post?.rating?.slice(0, 3))}
                      ></Rate>
                    )}
                  </p>

                  <br />
                  <a href={post?.url} target='_'>
                    See full link{' '}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
