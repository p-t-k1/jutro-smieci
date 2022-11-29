import React, {useState} from 'react';
import './Header.css';
import { MenuOutline } from 'react-ionicons'
import styled from "styled-components";
import {Link} from "react-router-dom";
import logo from '../logo.png';

function Header() {

    const [showMenu, setShowMenu] = useState(false);

    const isAdmin = () => {
        const companyToken = localStorage.getItem('smieci-token');
        if(companyToken){
            return '/panel';
        }
        return '/';
    }

  return (
      <>
        <div className="Header">
            <MenuOutline
                className="MenuIcon"
                color={'#00000'}
                height="40px"
                width="40px"
                onClick={()=>setShowMenu(!showMenu)}
            />
            <StyledLink to={isAdmin}><p>Jutro śmieci</p><img src={logo} style={{marginLeft: "5px"}} height="40px" width="40px"/></StyledLink>
            <MenuOutline
                className="MenuIcon"
                color={'#fdb71e'}
                height="40px"
                width="40px"
            />
        </div>

        {showMenu &&
        <div className="Menu">
            <StyledLink to={"/"} onClick={()=>setShowMenu(false)}>Strona główna</StyledLink>
            <StyledLink to={"/wywoz"} onClick={()=>setShowMenu(false)}>Najbliższy wywóz</StyledLink>
            <StyledLink to={"/lokalizacja"} onClick={()=>setShowMenu(false)}>Twoja lokalizacja</StyledLink>
        </div>
        }

      </>
  );
}

export default Header;


const StyledLink = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: white;
    }
`;
