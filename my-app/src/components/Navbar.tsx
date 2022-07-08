import { Layout, Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss';

interface Props {
  children: React.ReactNode;
}

const { Header, Content, Footer } = Layout;

const Navbar = ({ children }: Props): JSX.Element => {
  const navbarItems = (
    <Menu className='navbar__header--menu' theme='dark' mode='horizontal'>
      <Menu.Item key={'/'}>
        <Link to={'/'}>Home</Link>
      </Menu.Item>
      <Menu.Item key={'/sign-in'}>
        <Link to={'/sign-in'}>Sign In</Link>
      </Menu.Item>
      <Menu.Item key={'/contact'}>
        <Link to={'/contact'}>Contact Us</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className='layout'>
      <Header className='navbar__header'>
        <div className='logo'>
          Ben<span>PijeDashesi</span>
        </div>
        {navbarItems}
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className='site-layout-content'>{children}</div>
      </Content>
    </Layout>
  );
};

export default Navbar;
