import { Button, Checkbox, Form, Input } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { openNotification } from '../Home';
import './SignIn.scss';
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from '../../store/auth/authSlice';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values: any) => {
    console.log(values);

    try {
      const response = await fetch(`http://localhost:3001/auth/login`, {
        body: JSON.stringify(values),
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      navigate('/');
      localStorage.setItem('accessToken', data.accessToken);
      dispatch(setToken(data.accessToken));

      const authMe = await fetch(`http://localhost:3001/auth/me`, {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.accessToken}`,
        },
      });
      const dataAuthMe = await authMe.json();
      dispatch(setUserData(dataAuthMe));

      openNotification('Succes', 'Succesfuly Loged in');
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='sign-in'>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input type={'email'} />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name='remember'
          valuePropName='checked'
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
        <div className={'u__mt--2xl login__form--paragraph'}>
          Don't have an account?
          <Button
            children={'Sign Up'}
            className={'u__p'}
            type={'link'}
            title={'Sign Up'}
            onClick={() => navigate('/sign-up')}
          />
        </div>
      </Form>
    </div>
  );
};
