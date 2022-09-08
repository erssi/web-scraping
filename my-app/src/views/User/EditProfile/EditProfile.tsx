import { Button, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiService } from '../../../services/apiService';
import { setUserData } from '../../../store/auth/authSlice';

interface Props {
  visible: boolean;
  onCancel: () => void;
}

const EditProfile = ({ visible, onCancel }: Props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const authUser = useSelector((state: any) => state?.auth?.user);

  const onFinish = async (values: any) => {
    try {
      const response: any = await ApiService.patch(
        `user/edit-profile/${authUser?.id}`,
        values
      );
      dispatch(setUserData(response));
      onCancel();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal footer={null} onCancel={onCancel} visible={visible}>
        <Form initialValues={{ ...authUser }} form={form} onFinish={onFinish}>
          <Form.Item label={'First Name'} name={'name'}>
            <Input type='text'></Input>
          </Form.Item>

          <Form.Item label={'Last Name'} name={'lastName'}>
            <Input type='text'></Input>
          </Form.Item>

          <Form.Item label={'City'} name={'city'}>
            <Input type='text'></Input>
          </Form.Item>

          <Form.Item label={'Address'} name={'address'}>
            <Input type='text'></Input>
          </Form.Item>

          <Button htmlType='submit' type='primary'>
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default EditProfile;
