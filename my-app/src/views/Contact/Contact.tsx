import './Contact.scss';
import { Button, Form, Input, Typography } from 'antd';
import { openNotification } from '../../components/ToastNotifcation/Notification';
import { formContact } from '../../types/general';
const Contact = () => {
  const { Title, Text } = Typography;
  const onFinish = async (values: formContact) => {
    try {
      console.log(values);
    } catch (error: any) {
      openNotification('Error', error.message);
    }
  };

  return (
    <div className='contact'>
      <Title
        level={3}
        style={{
          marginBottom: 0,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        ✉️ Contact Us!
      </Title>
      <Text
        type='secondary'
        style={{
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        Let us know how we can help you.
      </Text>
      <Form
        name='basic'
        layout='vertical'
        onFinish={onFinish}
        style={{
          marginTop: 20,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
        }}
      >
        <Form.Item // Form Item (First Name)
          label='Name'
          name='name'
          tooltip='This is a required field'
          rules={[
            {
              required: true,
              message: 'Please enter your first name!',
            },
          ]}
        >
          <Input placeholder='First Name' />
        </Form.Item>

        <Form.Item // Form Item (Email)
          label='Email'
          name='email'
          tooltip='This is a required field'
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
              type: 'email',
            },
          ]}
        >
          <Input placeholder='Email' />
        </Form.Item>
        <Form.Item // Form Item (Message)
          label='Type your message here'
          name='message'
          tooltip='This is a required field'
          rules={[
            {
              required: true,
              message: 'Message is a required field!',
            },
          ]}
        >
          <Input.TextArea
            placeholder='Message ...'
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item // Form Item (Submit Button)
        >
          <Button htmlType='submit' type='primary'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Contact;
