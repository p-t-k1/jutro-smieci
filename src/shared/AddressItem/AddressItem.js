import React  from 'react';
import './AddressItem.css'
import PropTypes from "prop-types";

function AddressItem({data, action}) {


  return (
    <div className="AddressItem" onClick={()=>action(data)} >
        <div className="first-row"> {data.ulica} {data.komentarz} </div>
        <div className="second-row"> {data.miejscowosc} {data.kodpocztowy} </div>
        <div className="third-row"> {data.firma.nazwa} </div>
    </div>
  );
}

AddressItem.propTypes = {
    data : PropTypes.object,
    action : PropTypes.func,
};

export default AddressItem;
