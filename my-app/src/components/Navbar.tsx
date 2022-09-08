import { Button, Dropdown, Layout, Menu, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.scss";
import { onLogout, setToken } from "../store/auth/authSlice";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
interface Props {
  children: React.ReactNode;
}

const { Header, Content } = Layout;

const Navbar = ({ children }: Props): JSX.Element => {
  const [loggedIn, setloggedIn] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: any) => {
    return state.auth.token;
  });
  const authUser = useSelector((state: any) => {
    return state.auth.user;
  });
  const onLogoutUser = () => {
    dispatch(setToken(null));
    dispatch(onLogout());
    localStorage.removeItem("accessToken");
    setloggedIn(false);
  };

  useEffect(() => {
    if (accessToken) {
      setloggedIn(true);
    }
  }, [accessToken, location]);
  const menu = (
    <Menu
      items={[
        {
          label: <Link to={"/my-profile"}>Profile</Link>,
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: (
            <Link onClick={onLogoutUser} to={"/"}>
              Logout
            </Link>
          ),
          key: "2",
        },
      ]}
    />
  );

  const navbarItems = (
    <Menu
      className="navbar__header--menu"
      theme="dark"
      activeKey={location.pathname}
    >
      <Menu.Item key={"/"}>
        <Link to={"/"}>Home</Link>
      </Menu.Item>

      <Menu.Item key={"/contact"}>
        <Link to={"/contact"}>Contact Us</Link>
      </Menu.Item>
      {!loggedIn && (
        <Menu.Item key={"/sign-in"}>
          <Link to={"/sign-in"}>Sign In</Link>
        </Menu.Item>
      )}
      {loggedIn && (
        <Dropdown overlay={menu} className="navbar__dropdown">
          <Button>
            <Space>
              {authUser?.name}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      )}
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header className="navbar__header">
        <div className="logo">
          <span>Finder</span>
        </div>
        {navbarItems}
      </Header>
      <Content style={{ padding: "0" }}>{children}</Content>
    </Layout>
  );
};

export default Navbar;
