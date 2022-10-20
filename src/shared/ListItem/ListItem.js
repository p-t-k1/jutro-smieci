import React  from 'react';
import './ListItem.css'
import PropTypes from "prop-types";

function ListItem({day, month, nazwa, typ}) {

    const color = () => {
        return '8px solid orange'
    }

  return (
    <div className="ListItem" style={{borderLeft: `8px solid ${color}`}}>
        <div className="Date">
            <span>{day}<br />{month.substring(0,3).toUpperCase()}</span>
        </div>
        <div className="TrashDesc">
            {nazwa}{typ}
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
