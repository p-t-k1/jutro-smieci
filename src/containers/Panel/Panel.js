import React  from 'react';
import Item from "../../shared/Item/Item";
import './Panel.css'
import jwt_decode from 'jwt-decode';

function Panel() {

    let companyName = jwt_decode(localStorage.getItem('smieci-token')).nazwa;

  return (
      <>
        <div className="Panel-header">Panel administracyjny dla firmy: {companyName}</div>
        <div className="Panel">
            <Item title="Wprowadzone lokalizacje" icon="location" desc="Przejrzyj lub dodaj nową lokalizację" nav="panel/lokalizacje"/>
            <Item title="Wprowadzone harmonogramy" icon="calendar" desc="Przeglądaj harmonogramy wywozu lub dodaj nowy" nav="panel/harmonogram"/>
            <Item title="Przesłane zgłoszenia" icon="mail" desc="Przeglądaj zgłoszenia i problemy użytkowników" nav="panel/zgloszenia"/>
        </div>
      </>
  );
}

export default Panel;
