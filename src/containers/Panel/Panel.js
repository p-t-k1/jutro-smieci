import React, {useEffect, useState} from 'react';
import Item from "../../shared/Item/Item";
import './Panel.css'
import jwt_decode from 'jwt-decode';
import axios from "axios";
import config from "../../config";

function Panel() {

    let companyName = jwt_decode(localStorage.getItem('smieci-token')).nazwa;
    const token = JSON.parse(localStorage.getItem('smieci-token'));
    const [amount, setAmount] = useState("a");

    const getMessagesAmount = () => {
        axios({
            method: 'get',
            url: `${config.serverUrl}/api/messages/getCompanyMessagesAmount`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => {
                setAmount(response.data.amount);
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    alert('Problem z połączeniem internetowym');
                } else {
                    alert(error.response.data);
                }
            });
    }

    useEffect( () => {
        getMessagesAmount();
    },[])

  return (
      <>
        <div className="Panel-header">Panel administracyjny dla firmy: {companyName}</div>
        <div className="Panel">
            <Item title="Wprowadzone lokalizacje" icon="location" desc="Przejrzyj lub dodaj nową lokalizację" nav="panel/lokalizacje"/>
            <Item title="Wprowadzone harmonogramy" icon="calendar" desc="Przeglądaj harmonogramy wywozu lub dodaj nowy" nav="panel/harmonogram"/>
            <Item title="Przesłane zgłoszenia" icon="mail" desc="Przeglądaj zgłoszenia i problemy użytkowników" nav="panel/zgloszenia" amount={amount}/>
        </div>
      </>
  );
}

export default Panel;
