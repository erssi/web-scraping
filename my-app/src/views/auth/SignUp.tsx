import { Button, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmPasswordValidator } from './confirmPasswordValidator';
import { formValidation } from './constant';

const SignUp = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState<boolean>(false);

  const onFinish = (values: any) => {
    console.log(values);
  };
  const onValuesChange = async () => {
    try {
      form.validateFields(['email']);
      const email = form.getFieldValue('email');

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
    <Form form={form} name={'register'} autoComplete='off' onFinish={onFinish}>
      <Row className={`register`}>
        <Col className={'register__form'} span={24} md={14}>
          <div className={`register__form--container`}>
            <div className={'register__form--title u__mb--s'}>
              Set up your Account
            </div>
            <div className={'register__form--subtitle'}>
              Fill in your information and create your PurpoSolver account
            </div>
            <div className={'register__form--step-two'}>
              <div className={'register__form--step-two--wrapper'}>
                <Form.Item
                  name={'email'}
                  validateFirst={true}
                  rules={formValidation.email}
                  hasFeedback
                >
                  <Input
                    // label={'Email address'}
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
                >
                  <Input
                    // label={'Full name'}
                    placeholder={'Full name'}
                    type={'text'}
                  />
                </Form.Item>
                <Form.Item
                  name={'password'}
                  rules={formValidation.password}
                  validateFirst={true}
                  className={'u__mt--m'}
                >
                  <Input
                    // label={'Password'}
                    placeholder={'Password'}
                    type={'password'}
                  />
                </Form.Item>
                <Form.Item
                  name={'confirmPassword'}
                  rules={[
                    ...formValidation.confirmPassword,
                    confirmPasswordValidator(form),
                  ]}
                  validateFirst={true}
                  className={'u__mt--m'}
                >
                  <Input placeholder={'Confirm password'} type={'password'} />
                </Form.Item>
              </div>
              <Form.Item
                name={'termsAndAgreements'}
                valuePropName='checked'
                // rules={formValidation.termsAndAgreements}
                validateFirst={true}
                className={'u__mt--m'}
              ></Form.Item>
              <Form.Item>
                <Button
                  title={'Continue'}
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
        </Col>
      </Row>
    </Form>
  );
};

export default SignUp;
