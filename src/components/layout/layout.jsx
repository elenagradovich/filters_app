import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../header/header';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />{/*Placeholder for content*/}
    </>
  )
}

export default Layout;
