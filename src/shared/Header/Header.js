import React, {useState} from 'react';
import './Header.css';
import { MenuOutline } from 'react-ionicons'
import styled from "styled-components";
import {Link} from "react-router-dom";

function Header() {

    const [showMenu, setShowMenu] = useState(false);

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
            <StyledLink to={"/"}><p>Jutro śmieci</p></StyledLink>
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
        </div>
        }

      </>
  );
}

export default Header;


const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: white;
    }
`;
