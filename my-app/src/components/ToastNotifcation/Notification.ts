import { notification } from 'antd';

export const openNotification = (message: string, description: string) => {
  notification.open({
    message: message,
    description: description,

    // onClick: () => {
    //   console.log('Notification Clicked!');
    // },
  });
};
