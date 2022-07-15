import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { openNotification } from '../Home';
import { confirmPasswordValidator } from './confirmPasswordValidator';
import { formValidation } from './constant';

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    console.log(values);

    try {
      await fetch(`http://localhost:3001/auth/signup`, {
        body: JSON.stringify(values),
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });

      openNotification('Succes', 'Account Succesfuly Added');
    } catch (error) {
      console.log(error);
    }
  };
  const onValuesChange = async () => {
    try {
      form.validateFields(['email']);
      // const email = form.getFieldValue('email');

      setValidationError(false);
    } catch (err) {
      setValidationError(true);
      form.setFields([
        {
          name: 'email',
          errors: ['Account already exists with this email address'],
        },
      ]);
    }
  };

  return (
    <div className='sign-in'>
      <Form
        form={form}
        name={'register'}
        autoComplete='off'
        onFinish={onFinish}
      >
        <div className={`register`}>
          <div className={'register__form'}>
            <div className={`register__form--container`}>
              <div className={'register__form--title u__mb--s'}>
                Set up your Account
              </div>

              <div className={'register__form--step-two'}>
                <div className={'register__form--step-two--wrapper'}>
                  <Form.Item
                    name={'email'}
                    validateFirst={true}
                    rules={formValidation.email}
                    hasFeedback
                    label={'Email'}
                  >
                    <Input
                      placeholder={'Email address'}
                      onChange={onValuesChange}
                      type={'text'}
                    />
                  </Form.Item>
                  <Form.Item
                    name={'name'}
                    rules={formValidation.name}
                    validateFirst={true}
                    className={'u__mt--m'}
                    label={'Full name'}
                  >
                    <Input placeholder={'Full name'} type={'text'} />
                  </Form.Item>
                  <Form.Item
                    name={'password'}
                    rules={formValidation.password}
                    validateFirst={true}
                    label={'Password'}
                    className={'u__mt--m'}
                  >
                    <Input placeholder={'Password'} type={'password'} />
                  </Form.Item>
                  <Form.Item
                    name={'confirmPassword'}
                    rules={[
                      ...formValidation.confirmPassword,
                      confirmPasswordValidator(form),
                    ]}
                    validateFirst={true}
                    className={'u__mt--m'}
                    label={'Confirm Password'}
                  >
                    <Input placeholder={'Confirm password'} type={'password'} />
                  </Form.Item>
                </div>

                <Form.Item>
                  <Button
                    title={'Continue'}
                    children={'Register Account'}
                    type={'default'}
                    size={'large'}
                    htmlType={'submit'}
                    className={'register__continue-btn u__m'}
                    disabled={validationError}
                  />
                </Form.Item>
                <div className={'u__mt--2xl login__form--paragraph'}>
                  Already have an account?
                  <Button
                    children={'Login'}
                    className={'u__p'}
                    type={'link'}
                    title={' Sign In'}
                    onClick={() => navigate('/sign-in')}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
