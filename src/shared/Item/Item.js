import React  from 'react';
import './Item.css';
import {LocationOutline, TrashOutline, CalendarOutline} from "react-ionicons";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styled from 'styled-components';

function Item({title, icon, desc, nav}) {

    const renderIcon = (icon) => {
        if(icon === 'location') {
            return (
                <LocationOutline
                    color={'#00000'}
                    height="40px"
                    width="40px"
                />
            )
        }
        if(icon === 'trash') {
            return (
                <TrashOutline
                    color={'#00000'}
                    height="40px"
                    width="40px"
                />
            )
        }
        if(icon === 'calendar') {
            return (
                <CalendarOutline
                    color={'#00000'}
                    height="40px"
                    width="40px"
                    style={{marginLeft: "2px", marginRight: "3px"}}
                />
            )
        }
    }

  return (
    <StyledLink to={nav}>
        <div className="Item">
            <div className="Title">
                {renderIcon(icon)}
                <h2>{title}</h2>
            </div>
            <div className="Info">
                {desc}
            </div>
        </div>
    </StyledLink>
  );
}

Item.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    desc: PropTypes.string,
    nav: PropTypes.string,
};

export default Item;

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: black;
    }
`;
