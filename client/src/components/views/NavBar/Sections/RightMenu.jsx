/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge, Avatar } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { USER_SERVER } from '../../../../Config';
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

function RightMenu(props) {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        navigate("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div style={{ width: '250px', float: 'right' }}>
        <Menu mode={props.mode}>
          <Menu.Item key="mail">
            <a href="/login">Signin</a>
          </Menu.Item>
          <Menu.Item key="app">
            <a href="/register">Signup</a>
          </Menu.Item>
        </Menu>
      </div>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="history">
          <a href="/history">History</a>
        </Menu.Item>
        <Menu.Item key="upload">
          <a href="/products/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="cart">
          <a href="/users/cart">
            <Badge count={user.userData && user.userData.cart.length} style={{ marginTop: '15px' }} >
              {/* <Avatar shape={<ShoppingCartOutlined />} size="large" /> */}
              <ShoppingCartOutlined 
                style={{ fontSize: '27px', marginTop: '15px' }} 
              />
            </Badge>
          </a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default RightMenu;

