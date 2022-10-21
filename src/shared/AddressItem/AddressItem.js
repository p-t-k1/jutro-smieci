import React  from 'react';
import './AddressItem.css'
import PropTypes from "prop-types";

function AddressItem({ulica}) {


  return (
    <div className="AddressItem" >
        {ulica}
    </div>
  );
}

AddressItem.propTypes = {
    ulica : PropTypes.string
};

export default AddressItem;
