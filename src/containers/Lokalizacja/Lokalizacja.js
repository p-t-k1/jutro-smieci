import React, {useEffect, useState} from 'react';
import './Lokalizacja.css'
import AddressItem from "../../shared/AddressItem/AddressItem";
import axios from "axios";
import config from "../../config";
import {useHistory} from "react-router-dom";

function Lokalizacja() {

    const history = useHistory();

    const [data, setData] = useState();
    const [miejscowosc, setMiejscowosc] = useState("");
    const [ulica, setUlica] = useState("");
    const [kodpocztowy, setKodpocztowy] = useState("");

    let filterList = (data) => {
        let filteredList = data.filter(element =>
            element.miejscowosc.toLowerCase().startsWith(miejscowosc.toLowerCase()) &&
            element.ulica.toLowerCase().startsWith(ulica.toLowerCase()) &&
            element.kodpocztowy.toLowerCase().startsWith(kodpocztowy.toLowerCase())
        )

        return filteredList;
    }

    const setArea = (data) => {
        localStorage.setItem('area', JSON.stringify(data));
        history.push("/", {data: data});
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: `${config.serverUrl}/api/areas/`,
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    alert('Problem z połączeniem internetowym');
                } else {
                    alert(error.response.data);
                }
            });
    }, []);

  return (
    <div className="Lokalizacja">
        <div className="Header-container">
            <span className="Header1">Ustaw swoją lokalizację</span><br />
            <span className="Header2">Wypełnij przynajmniej jedno pole</span>
        </div>

        <div className="Form">
            <span>Miejscowość</span>
            <input type="text" value={miejscowosc} onChange={() => setMiejscowosc(event.target.value)}/>

            <span>Ulica</span>
            <input type="text" value={ulica} onChange={() => setUlica(event.target.value)}/>

            <span>Kod pocztowy</span>
            <input type="text" value={kodpocztowy} onChange={() => setKodpocztowy(event.target.value)}/>
        </div>

        <div className="Results">
            <span>Znalezione adresy:</span>
            {
                data && filterList(data).map(element => {
                    return(
                        <AddressItem key={element._id} data={element} action={setArea}/>
                    )
                })
            }
            {
                data && filterList(data).length == 0 && <><br/><div className="Not-found">Nie znaleziono żadnej lokalizacji</div></>
            }
        </div>

    </div>
  );
}

export default Lokalizacja;
