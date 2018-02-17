import React from 'react';
import logo from './logo.png';
import './Logo.less';

const Logo = () => (
  <div className="logo">
    <h1 className="logo__text logo__text--hidden">Andrew Kirichencko Site</h1>
    <img src={logo} alt="Andrew Kirichencko Site" />
  </div>
);

export default Logo;
