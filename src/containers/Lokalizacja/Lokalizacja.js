import React  from 'react';
import './Lokalizacja.css'
import AddressItem from "../../shared/AddressItem/AddressItem";

function Lokalizacja() {

    const lokalizacje = [
        {miejscowosc: "Dąbrowa Tarnowska", ulica: "LeśnaLeśnaLeśnaLeśnaLeśnaLeśnaLeśnaLeśnaLeśna", kodpocztowy: "33-200"},
        {miejscowosc: "Tarnów", ulica: "Nowa", kodpocztowy: "33-100"},
    ]

  return (
    <div className="Lokalizacja">
        <div className="Header-container">
            <span className="Header1">Ustaw swoją lokalizację</span><br />
            <span className="Header2">Wypełnij przynajmniej jedno pole</span>
        </div>

        <div className="Form">
            <span>Miejscowość</span>
            <input type="text"/>

            <span>Ulica</span>
            <input type="text"/>

            <span>Kod pocztowy</span>
            <input type="text"/>
        </div>

        <div className="Results">
            <span>Znalezione adresy:</span>
            {
                lokalizacje.map(element => {
                    return(
                        <AddressItem key="u" ulica={element.ulica}/>
                    )
                })
            }
        </div>

    </div>
  );
}

export default Lokalizacja;
