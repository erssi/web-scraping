import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import './SignIn.scss';
import { useDispatch } from 'react-redux';
import { setToken, setUserData } from '../../store/auth/authSlice';
import { LocalStorageService } from '../../services/LocalStorageService';
import { ApiService } from '../../services/apiService';
import { openNotification } from '../../components/ToastNotifcation/Notification';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    try {
      const res: any = await ApiService.post('auth/login', values);
      LocalStorageService.setItem('accessToken', res?.accessToken);
      dispatch(setToken(res?.accessToken));
      const authMe = await ApiService.get('auth/me');
      dispatch(setUserData(authMe));
      openNotification('Succes', 'Succesfuly Logged in');
      navigate('/');
    } catch (error: any) {
      openNotification(`${error.status}`, `${error?.message}`);
    }
  };

  return (
    <div className='sign-in'>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
