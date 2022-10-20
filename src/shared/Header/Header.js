import React  from 'react';
import './Header.css';
import { MenuOutline } from 'react-ionicons'

function Header() {

  return (
    <div className="Header">
        <MenuOutline
            className="Menu"
            color={'#00000'}
            height="40px"
            width="40px"
        />
        <p>Jutro śmieci</p>
        <MenuOutline
            className="Menu"
            color={'#fdb71e'}
            height="40px"
            width="40px"
        />
    </div>
  );
}

export default Header;
