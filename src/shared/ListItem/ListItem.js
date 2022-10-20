import React  from 'react';
import './ListItem.css'
import PropTypes from "prop-types";

function ListItem({day, month, nazwa, typ}) {

    const color = (typ) => {
        if( typ === 'plastik' ) return {borderLeft: '8px solid yellow'};
        if( typ === 'szklo' ) return {borderLeft: '8px solid green'};
        if( typ === 'papier' ) return {borderLeft: '8px solid blue'};
    }

  return (
    <div className="ListItem" style={color(typ)}>
        <div className="Date">
            <span>{day}<br />{month.substring(0,3).toUpperCase()}</span>
        </div>
        <div className="TrashDesc">
            {nazwa}
        </div>
    </div>
  );
}

ListItem.propTypes = {
    day: PropTypes.string,
    month: PropTypes.string,
    nazwa: PropTypes.string,
    typ: PropTypes.string,
};

export default ListItem;
