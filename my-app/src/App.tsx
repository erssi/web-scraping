import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './navigator/PrivateRoute';
import { ApiService } from './services/apiService';
import { setUserData } from './store/auth/authSlice';
import { SignIn } from './views/auth/SignIn';
import SignUp from './views/auth/SignUp';
import Contact from './views/Contact/Contact';
import NotFound from './views/Error/NotFound';
import Home from './views/Home/Home';
import MyProfile from './views/User/MyProfile';
const App = () => {
  const token = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await ApiService.get('auth/me');
      dispatch(setUserData(res));
    };
    if (token) {
      fetchUser();
    } else {
      <Navigate to={'/sign-in'} />;
    }
  }, [dispatch, token]);

  return (
    <>
      <Router>
        <Navbar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/my-profile' element={<PrivateRoute />}>
              <Route path='/my-profile' element={<MyProfile />} />
            </Route>
            {!token && (
              <>
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-in' element={<SignIn />} />
              </>
            )}

            <Route path='*' element={<NotFound />} />
          </Routes>
        </Navbar>
      </Router>
    </>
  );
};

export default App;
