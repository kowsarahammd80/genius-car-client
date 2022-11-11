import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Sheard/Footer/Footer';
import Header from '../Sheard/Header/Header';

const Main = () => {
  return (
    <div>
       <Header></Header>
       <Outlet></Outlet>
       <Footer></Footer>
    </div>
  );
};

export default Main;