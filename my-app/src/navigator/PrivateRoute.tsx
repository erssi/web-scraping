import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const accessToken = useSelector((state: any) => state.auth.token);

  if (!accessToken) {
    return <Spin />;
  }

  return accessToken ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
